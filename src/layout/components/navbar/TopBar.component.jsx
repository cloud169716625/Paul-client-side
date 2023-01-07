import React, { Fragment } from 'react'
import UserTop from './UserTop.component'
import Logo from './Logo.component'
import { Link, useLocation } from 'react-router-dom'
import { Dropdown, Spin } from 'antd'
import { useSidebarData } from '../SideBar/data'
import { Badge } from 'react-bootstrap'

export function TopBar({
  hide = false,
  hideSide,
  toggleSide,
  toggleNotification,
}) {
  const { pathname } = useLocation()
  const sidebarData = useSidebarData()

  let active = null
  if (sidebarData?.length > 0) {
    active = sidebarData?.find((sideItem) => {
      const { name, path } = sideItem
      if (name === 'Dashboard') {
        return path === pathname
      } else {
        return pathname.includes(path)
      }
    })
  }
  return (
    <Spin spinning={sidebarData?.length === 0}>
      <div className="flex items-center justify-between w-full h-20 bg-custom-secondary ">
        <Logo hide={hide} hideSide={hideSide} toggleSide={toggleSide} />
        <div
          className={`flex items-center ${
            active?.subLinks?.length ? 'justify-between' : 'justify-end'
          }`}
          style={{
            width: hideSide ? 'calc(100% - 84px)' : 'calc(100% - 300px)',
          }}
        >
          {active?.subLinks?.length ? (
            <div
              className={`flex items-center gap-[12px] ml-[40px] ${
                active?.subLinks?.length > 5 ? 'overflow-x-auto' : ''
              }`}
            >
              {active?.subLinks.map((link) => {
                const innerLinks = (
                  <div key={link.path} className="bg-[#1e1e2d] flex flex-col">
                    {link?.subLinks?.map((link) => (
                      <Link
                        to={link?.path}
                        key={link?.path}
                        className={`${
                          pathname.includes(link?.path)
                            ? 'bg-[#1b1b2b] text-[#3699FF]'
                            : 'text-[#92928F]'
                        } py-2 mb-1 px-4 hover:bg-[#1b1b2b] hover:text-[#3699FF]`}
                      >
                        {link?.name}
                      </Link>
                    ))}
                  </div>
                )
                if (!link?.showTop) {
                  return <></>
                } else {
                  return (
                    <Fragment key={link?.path}>
                      {link?.subLinks?.length ? (
                        <Dropdown overlay={innerLinks}>
                          <Link
                            to={link?.path}
                            key={link?.path}
                            className={`${
                              pathname.includes(link?.path)
                                ? 'bg-[#1b1b2b] text-[#3699FF]'
                                : 'text-[#92928F]'
                            } rounded-lg py-2 px-4 hover:bg-[#1b1b2b] hover:text-[#3699FF] flex items-center gap-[12px]`}
                          >
                            <span>{link?.name}</span>
                            <Badge pill bg="primary">
                              {link?.count}
                            </Badge>
                          </Link>
                        </Dropdown>
                      ) : (
                        <Link
                          to={link?.path}
                          key={link?.path}
                          className={`${
                            pathname.includes(link?.path)
                              ? 'bg-[#1b1b2b] text-[#3699FF]'
                              : 'text-[#92928F]'
                          } rounded-lg py-2 px-4 hover:bg-[#1b1b2b] hover:text-[#3699FF] flex items-center gap-[12px]`}
                        >
                          <span>{link?.name}</span>
                          <Badge pill bg="primary">
                            {link?.count}
                          </Badge>
                        </Link>
                      )}
                    </Fragment>
                  )
                }
              })}
            </div>
          ) : (
            <></>
          )}
          <UserTop toggleNotification={(v) => toggleNotification(v)} />
        </div>
      </div>
    </Spin>
  )
}
