import { getName } from "lib";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button } from "components";
import { EditProfile } from "./EditProfile.section";
// import { EditUser } from '../../sections';

export const UserProfileCard = () => {
  const [showName, setShowName] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const { user, isLoading } = useSelector((state) => state.auth);
  const { t } = useTranslation("AccountSettings/ns");

  const userInfo = {
    name: user?.fullName,
    img: user?.base64Image,
    designation: "Client",
    details: [
      { title: t("fullName"), value: user?.fullName },
      { title: t("accountID"), value: user?.id },
      { title: t("billingEmail"), value: user?.email },
      {
        title: t("billingAddress"),
        value:
          user?.address1 && user?.address2
            ? `${user?.address1} ${user?.address2}`
            : "101 Collin Street, Melbourne 3000, Australia",
      },
      { title: t("language"), value: "English" },
      {
        title: "Upcoming Invoice",
        value: '',
      },
    ],
  };

  return (
    <>
      <EditProfile show={showEdit} setShow={setShowEdit} user={user} t={t} />
      {isLoading ? (
        <></>
      ) : (
        <div className="bg-[#1E1E2D] rounded-lg profile-details__user-card">
          {/* IMAGE + NAME */}
          <div className="profile-details__user-card-img">
            <div className="profile-details__user-card-img-box h-[120px] w-[120px] flex items-center justify-center">
              {userInfo?.img && userInfo?.img?.length && !showName ? (
                <img
                  src={user && user.imageUrl}
                  alt={user && user.userName}
                  onLoad={() => setShowName(false)}
                  onError={() => setShowName(true)}
                  className="w-full h-full"
                />
              ) : (
                <div className="text-[36px] text-white">
                  {user && showName && getName({ user })}
                </div>
              )}
            </div>
            {/* NAME */}
            <div className="profile-details__user-card-name">
              <h6 className="text-xl text-[#fff]">{userInfo?.name}</h6>
            </div>
            {/* DESIGNATION */}
            <div className="profile-details__user-card-designation">
              <p className="text-[#474761] text-base">
                {userInfo?.designation}
              </p>
            </div>
          </div>
          {/* USER PROFILE DETAILS */}
          <div className="px-8 profile-details__user-card-details">
            {/* FIRST ROW WITH EDIT BUTTON */}
            <div className="flex items-center justify-between">
              <h6 className="text-white text-[16px] mb-0">{t("details")}</h6>
              <Button type="secondary" onClick={() => setShowEdit(true)} className="h-[36px] pt-1 pb-1">
                {t('update')}
              </Button>
            </div>
            <div className="h-0 w-full border-t-[1px] border-dashed border-[#323248] mt-4 mb-4" />
            {/* INFO ROW */}
            <div className="flex flex-col gap-4 profile-details__user-card-details-detail">
              {userInfo?.details?.map(({ title, value }) => {
                return (
                  <div className="flex flex-col gap-1" key={title}>
                    <div className="text-sm text-white">{title}</div>
                    <div className="text-[#92928F] text-sm">{value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
