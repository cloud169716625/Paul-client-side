import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { element, bool } from 'prop-types'
import { useMediaQuery } from 'react-responsive'
import { SideBar, TopBar } from './components'
import { Button } from 'antd'
import classes from './Dashboard.layout.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useSidebarData } from './components/SideBar/data'
import { GetMFAUri, loginAsAdmin } from '../store/Actions/AuthActions'
import { useCallback } from 'react'

export function DashboardLayout({ children, hide }) {
  const [active, setActive] = useState('')
  const [activeSub, setActiveSub] = useState('')
  const [activeInnerSub, setActiveInnerSub] = useState('')
  const [activeDeepInnerSub, setActiveDeepInnerSub] = useState('')
  const { user, adminSession } = useSelector((state) => state.auth)

  const Roles = user && user.userRolesResponse
  const isAdmin =
    adminSession ||
    (Roles.userRoles && Roles.userRoles[0] && Roles.userRoles[0].enabled)

  const { pathname } = useLocation()

  const lessThanDesktop = useMediaQuery({
    query: '(max-width: 900px)',
  })

  const sidebarData = useSidebarData()
  const sidebarLinksLength = sidebarData?.length
  const [hideSide, setHideSide] = useState(!!lessThanDesktop)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetMFAUri(user && user.id))
  }, [user, dispatch])

  useEffect(() => {
    const activeLink = sidebarData.filter((sideItem) => {
      const { name, path } = sideItem
      if (name === 'Dashboard') {
        return path === pathname
      } else {
        return pathname.includes(path)
      }
    })

    setActive(activeLink[0])

    // Set Sublink
    if (activeLink?.length && activeLink[0]?.subLinks?.length) {
      const activeSubLink = activeLink[0].subLinks.filter((subItem) => {
        const { path } = subItem
        return pathname.includes(path)
      })
      setActiveSub(activeSubLink[0])

      if (activeSubLink?.length && activeSubLink[0]?.subLinks?.length) {
        const activeInnerSubLink = activeSubLink[0]?.subLinks?.filter(
          ({ path }) => {
            const trimmedPathname = path.substring(0, path.lastIndexOf('/'))
            return pathname.includes(trimmedPathname)
          }
        )
        setActiveInnerSub(activeInnerSubLink[0])
        // Set Deep Inner Sub Link
        if (
          activeInnerSubLink?.length &&
          activeInnerSubLink[0]?.subLinks?.length
        ) {
          const activeDeepInnerSubLink =
            activeInnerSubLink[0]?.subLinks?.filter(({ path }) => {
              const trimmedPathname = path.substring(0, path.lastIndexOf('/'))
              return pathname.includes(trimmedPathname)
            })
          setActiveDeepInnerSub(activeDeepInnerSubLink[0])
        } else {
          setActiveDeepInnerSub('')
        }
      } else {
        setActiveInnerSub('')
      }
    }
  }, [pathname, user, sidebarLinksLength])

  const toggleSide = () => {
    setHideSide((state) => !state)
  }

  const handleLoginAsAdmin = useCallback(() => {
    if (adminSession && adminSession.adminId) {
      dispatch(loginAsAdmin(adminSession.adminId))
    }
  }, [dispatch, adminSession])

  return (
    <div className="w-full md:min-h-screen">
      {isAdmin && (
        <div className={classes.notifications__bar}>
          <div className="flex items-center">
            Logged in as client: {adminSession && adminSession.fullName}
          </div>
          <div>
            <Button
              className="text-[14px] bg-white text-[#0BB783] rounded py-1 h-[36px]"
              onClick={handleLoginAsAdmin}
            >
              Logout & Return to Admin Panel
            </Button>
          </div>
        </div>
      )}
      <TopBar hide={hide} hideSide={hideSide} toggleSide={toggleSide} />
      <div className="flex">
        {!hide && (
          <div className="col-auto">
            <SideBar hideSide={hideSide} />
          </div>
        )}
        <div className="flex flex-col col">
          <div className="bg-[#1A1A27] px-[20px] py-[20px] md:px-[60px] flex items-center gap-3">
            <h6 className="text-white text-[20px]">{active?.name}</h6>
            {activeSub?.name && !active?.hideBread ? (
              <>
                <div className="h-5 w-[1px] bg-[#323248]" />
                <h6 className="text-white text-[12px]">
                  <Link
                    to={activeSub?.path}
                    className={activeSub?.name ? 'text-[#92928f]' : ''}
                  >{`${activeSub?.name} ${
                    activeInnerSub?.name ? '-' : ''
                  } `}</Link>
                  {activeInnerSub?.name && !activeDeepInnerSub ? (
                    <span>{`${activeInnerSub?.name} ${
                      activeDeepInnerSub ? '-' : ''
                    } `}</span>
                  ) : activeInnerSub?.name && activeDeepInnerSub ? (
                    <Link
                      to={activeInnerSub?.path}
                      className={activeInnerSub?.name ? 'text-[#92928f]' : ''}
                    >{`${activeInnerSub?.name} ${
                      activeInnerSub?.name ? '-' : ''
                    } `}</Link>
                  ) : (
                    ''
                  )}

                  {activeDeepInnerSub?.name ? (
                    <span>{`${activeDeepInnerSub?.name}`}</span>
                  ) : (
                    ''
                  )}
                </h6>
              </>
            ) : null}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

DashboardLayout.propTypes = {
  children: element.isRequired,
  hide: bool,
}

DashboardLayout.defaultProps = {
  hide: false,
}
