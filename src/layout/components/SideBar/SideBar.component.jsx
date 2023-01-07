import React, { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Spin } from "antd";

import SideLinks from "./SideLinks.component";
import { useSidebarData } from "./data";

import "./SideBar.styles.scss";
import { getDataCounts } from "store/Actions/count";
import { useDispatch } from "react-redux";

export function SideBar({ hideSide }) {
  const dispatch = useDispatch()
  const { pathname } = useLocation();

  let sidebarData = useSidebarData();
  useEffect(() => { }, [pathname]);
  useEffect(()=>{
    dispatch(getDataCounts());
  },[])
  return (
    <Spin spinning={sidebarData?.length === 0}>
      <div
        className={`sidebar bg-custom-secondary transition-all pt-[20px] ${
          hideSide ? "w-[95px]" : "w-[300px]"
        }`}
      >
        <div className="flex flex-col sidebar-content">
          <ul className="p-0">
            {sidebarData.map(
              ({
                name,
                path,
                hideInSide,
                icon,
                count,
                show,
                subLinks,
              }) => {
                return (
                  <Fragment key={path}>
                    {/* TODO: Remove or operator and module variable once all modules are included */}
                    {show ? (
                      <SideLinks
                        name={name}
                        path={path}
                        icon={icon}
                        count={count}
                        hideSide={hideSide}
                        hideInSide={hideInSide}
                        subLinks={subLinks}
                      />
                    ) : (
                      <></>
                    )}
                  </Fragment>
                );
              }
            )}
          </ul>
        </div>
      </div>
    </Spin>
  );
}
