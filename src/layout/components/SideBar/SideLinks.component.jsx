import React, { useState } from "react";
import { string } from "prop-types";
import { Link, NavLink, useLocation } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useDispatch } from "react-redux";
import { setSupport } from "store/Slices/ticketSlice";
import { Switch } from "antd";

function SideLinks({
  name,
  path,
  icon,
  hideSide,
  hideInSide,
  count,
  subLinks,
  badgeClass,
}) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);
  const isActive =
    name === "Dashboard" ? pathname === path : pathname.includes(path);
  return (
    <>
      {!hideInSide ? (
        <li>
          <Link
            to={path}
            onClick={() =>
              (name = "Support"
                ? dispatch(setSupport(true))
                : dispatch(setSupport(false)))
            }
            className={`${
              isActive ? "bg-[#1B1B28] text-white" : ""
            } pt-3 pb-2 flex text-gray-500 no-underline hover:text-white hover:bg-black/[.2] ease-in duration-100 px-4`}
          >
            {icon(isActive ? "#3699ff" : "#494b74")}
            <div className="flex items-center gap-[12px]">
              <span
                className={`${hideSide ? "hidden" : "inline"} transition-all`}
              >
                &nbsp; {name}
              </span>
              <Badge pill bg="primary" className={badgeClass}>
                {count}
              </Badge>
            </div>
          </Link>
          {!hideSide && subLinks?.length && (
            <ul
              className={`sublinks text-gray-500 ${
                isActive ? "bg-[#1B1B28]" : ""
              }`}
            >
              {subLinks?.map((link) => {
                if (!link?.show || !link?.showSide) return null;

                if (link?.name === 'Cancelled' && !checked) return null;

                if (link?.name === "Show Cancelled Services") {
                  return (
                    <li key={link?.name}>
                      <div className="flex items-center gap-[12px]">
                        <span
                          className={`${
                            hideSide ? "hidden" : "inline"
                          } transition-all`}
                        >
                          {link?.name}
                        </span>
                        <Switch checked={checked} onChange={() => setChecked(!checked)}/>
                      </div>
                    </li>
                  )
                }

                return (
                  <li key={link.name}>
                    <NavLink
                      onClick={() =>
                        (name = "My Tickets"
                          ? dispatch(setSupport(true))
                          : dispatch(setSupport(false)))
                      }
                      to={link?.path}
                      className={({ isActive }) =>
                        (isActive ? `text-[#3699FF] ` : "text-gray-500 ") +
                        ` flex items-center w-full pl-1 no-underline hover:bg-[#1b1b2b] hover:text-[#3699FF] ease-in duration-100 py-2`
                      }
                    >
                      <span>{">"}</span>
                      <div className="flex items-center gap-[12px]">
                        <span
                          className={`${
                            hideSide ? "hidden" : "inline"
                          } transition-all`}
                        >
                          &nbsp; {link?.name}
                        </span>
                        <span className={`pt-[6px] px-[8px] badge rounded-pill ${link?.badgeClass}`}>
                          {link?.count}
                        </span>
                      </div>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      ) : (
        <></>
      )}
    </>
  );
}

SideLinks.propTypes = {
  name: string.isRequired,
  path: string.isRequired,
};

// SideLinks.defaultProps = {
//   name: 'Link',
//   path: '/',
// };

export default SideLinks;
