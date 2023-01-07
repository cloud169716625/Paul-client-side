import React, { useRef, useState, useEffect } from 'react';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { loginAsAdmin } from 'store/Actions/AuthActions';
import { logout } from 'store/Slices/authSlice';
import UserName from './UserProfileCard/UserName';
import './UserTop.css';

function UserTop() {
  const [connection] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  const { user, isLoggedIn, adminSession } = useSelector((state) => state.auth);
  const [imgError, setImgError] = useState(false);
  const lessThanDesktop = useMediaQuery({
    query: '(max-width: 900px)',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOnline = window.navigator.onLine;
  const Roles = user && user.userRolesResponse;
  const isAdmin = adminSession || (Roles.userRoles && Roles.userRoles[0] && Roles.userRoles[0].enabled);

  useEffect(() => {
    if (connection) {
      connection.start();
    }
  }, [connection]);

  const links = [
    {
      name: 'Account Settings',
      onClick: () => {
        setDropdown((dropdownValue) => !dropdownValue);
        //navigate('/client/dashboard/account-settings');
        navigate('/client/dashboard/account-settings/general');
      },
    },
    {
      name: 'Notifications',
      onClick: () => {
        setDropdown((dropdownValue) => !dropdownValue);

      },
    },
    {
      name: 'Sign Out',
      onClick: () => {
        dispatch(logout());
        navigate('/client/sign-in');
      },
    },
    {
      name: 'Sign Out & Return to Admin Panel',
      onClick: () => {
        handleLoginAsAdmin()
      },
    },
  ];

  const handleLoginAsAdmin = useCallback(() => {
    if (adminSession && adminSession.adminId) {
      dispatch(loginAsAdmin(adminSession.adminId));
    }
  }, [dispatch, adminSession]);

  const dropDownRef = useRef(null);

  return (
    <div
      className="relative flex items-center mr-4 cursor-pointer"
      ref={dropDownRef}
    >
      <div
        className={`w-[278px] bg-[#1E1E2D] ${dropdown ? '' : 'hidden'
          } rounded-lg text-gray-300`}
        style={{
          position: 'absolute',
          top: '58px',
          right: 0,
          boxShadow: '0px 0px 40px #00000066',
          zIndex: 2,
          width: 370,
        }}
      >
        {/* Name and Email Box */}
        <div className="p-[20px] border-b-[1px] border-b-[#323248] cursor-auto">
          <div className="flex items-start justify-between">
            {/* Image + Status */}
            <div className="h-12 w-12 rounded-lg border-2 border-[#3699FF] p-1 userName">
              {user && user.base64Image && !imgError ? (
                // !showName
                <img
                  src={user?.base64Image}
                  alt={user.userName}
                  onError={() => setImgError(true)}
                  className="w-full h-full"
                />
              ) : (
                <>{user && <UserName isLoggedIn={isLoggedIn} user={user} />}</>
              )}
            </div>

          </div>
          <div className="mt-[20px]">

            <h3 className="text-white text-[16px] mb-2">{user?.fullName}</h3>
            <h3 className="text-[#92928F] text-[16px] mb-2">
              {user?.email}
            </h3>
          </div>
          <div className="row ">
            <div className="py-[4px]"></div>
            <div className="bg-[#1C3238] px-[8px] py-[4px] rounded-[4px] w-[51px] ml-3 justify-between">
              <p className="text-[#0BB783] text-[10px]">ACTIVE</p>
            </div>
            {isAdmin && (
              <div className="  bg-[#212E48] px-[8px] py-[4px] rounded-[4px] w-[119px] ml-3  justify-between">
                <p className="text-[#3699FF] text-[10px]">
                  LOGGED IN AS CLIENT
                </p>
              </div>
            )}
          </div>
        </div>
        <div>
          {links?.map(({ onClick, name, Icon, active }, index) => {
            if (name === "Sign Out & Return to Admin Panel" && !isAdmin)
              return null;

            return (
              <p
                className={`pt-[20px] px-[20px] ${
                  active ? "text-[#3699FF]" : "text-[#92928F]"
                } flex items-center justify-between hover:text-[#3699FF] transition-all text-[12px] last:pb-[20px]`}
                onClick={onClick}
                key={name}
              >
                <span>{name}</span>
                {Icon}
              </p>
            );
          })}
        </div>
      </div>
      <div
        className={`h-12 w-12 rounded-lg border-2 border-[#3699FF] p-1 userName ${isOnline ? 'isOnline' : 'isOffline'
          }`}
      >
        {user?.base64Image ? (
          <img
            src={user?.base64Image}
            alt={user.userName}
            className="w-full h-full"
          />
        ) : (
          <>{user && <UserName isLoggedIn={isLoggedIn} user={user} />}</>
        )}

      </div>

      {!lessThanDesktop && (
        <>
          <div
            className="mx-3 text-base"
            onClick={() => setDropdown((prevDropdown) => !prevDropdown)}
          >
            <h3 className="mb-0 text-base text-white">
              {user && user.fullName}
            </h3>
            <p className="mb-0 text-gray-400">{user && user.email}</p>
          </div>
          <div
            className="h-12 w-12 bg-[#323248] flex items-center justify-center rounded-lg relative"
            onClick={() => setDropdown((prevDropdown) => !prevDropdown)}
          >
            <img src="/icon/arrow-down.svg" alt="" />
          </div>
        </>
      )}
    </div>
  );
}

export default UserTop;