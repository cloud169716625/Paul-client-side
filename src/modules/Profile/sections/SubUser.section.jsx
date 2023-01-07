import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { getSubUsersById } from "store";
import UserName from "layout/components/navbar/UserProfileCard/UserName";

export const SubUser = () => {
  const { t } = useTranslation("/Users/ns");
  const dispatch = useDispatch();
  const [imgError, setImgError] = useState(false);
  const { user } = useSelector((state) => state?.auth);
  const { loadingSubusers, subusers } = useSelector((state) => state?.users);

  useEffect(() => {
    if (user.id) {
      dispatch(getSubUsersById(user.id))
    }
  }, [dispatch, user])

  const fileredSubusers = subusers?.filter(
    (user) => user?.isDeleted === false
  );

  return (
    <div className="bg-[#1E1E2D] rounded-lg profile-details__user-card px-8">
      <Spin spinning={loadingSubusers}>
        <div className="flex items-center justify-between mb-8">
          <h6 className="text-white text-[16px]">{t("Sub Users")}</h6>
        </div>
        <div className="flex flex-col gap-4">
          {fileredSubusers?.length ? (
            fileredSubusers.map(({ fullName, email, base64Image, id }, index) => {
              return (
                <div className="flex flex-col gap-1" key={index}>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      {base64Image && !imgError ? (
                        <div className="bg-[#171723] flex items-center justify-center w-[47px] h-[47px] rounded-lg p-[4px]">
                          <img
                            className="w-full h-full rounded-lg"
                            src={base64Image}
                            alt="user"
                            onError={() => setImgError(true)}
                          />
                        </div>
                      ) : (
                        <div className="bg-[#171723] flex items-center justify-center w-[47px] h-[47px] rounded-lg p-[4px] text-[#0BB783] text-[18px] font-bold">
                          <UserName isLoggedIn={true} user={{ fullName }} />
                        </div>
                      )}
                      <div className="">
                        <div className="text-sm text-white">{fullName}</div>
                        <div className="text-[#92928F] text-sm">{email}</div>
                      </div>
                    </div>
                  </div>
                  <div className="h-0 w-full border-t-[1px] border-dashed border-[#323248] mt-2" />
                </div>
              );
            })
          ) : (
            <h4 className="text-white mt-[16px] text-center w-full">
              No Sub Users Assigned!
            </h4>
          )}
        </div>
      </Spin>
    </div>
  );
};
