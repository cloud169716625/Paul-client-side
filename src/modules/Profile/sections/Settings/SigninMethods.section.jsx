import { Button } from 'components';
import { getError, enableDisable2FA } from 'lib';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import { logout } from 'store/Slices/authSlice';
import { ResetPassword, UpdateEmail } from './sections';
import { ChooseAuthMethod } from './sections/ChooseAuthMethod.section';
import { Shield as ShieldIcon } from 'icons';

const LineItem = ({ title, desc, children, className }) => {
  return (
    <div className="pb-[20px] flex items-center justify-between">
      <div>
        <p className="text-white text-[14px]">{title}</p>
        <p className="text-[#92928F] text-[14px]">{desc}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export const SigninMethods = () => {
  const { t } = useTranslation("/AccountSettings/ns");
  // States to manage the modals
  const [updateEmail, setUpdateEmail] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [chooseAuth, setChooseAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, hasMFA } = useSelector((state) => state?.auth);
  const { settings } = useSelector((state) => state?.appSettings);
  const dispatch = useDispatch();

  // Render
  return (
    <>
      {!user ? (
        <></>
      ) : (
        <div className="bg-[#1E1E2D] rounded-[8px] mt-[20px]">
          {/* Heading */}
          <h3 className="text-white text-[16px] p-[32px]">Sign-In Methods</h3>
          {/* Divider */}
          <hr
            className="w-full border-t-[2px] border-t-[#474761] border-dashed"
            style={{ height: '0px' }}
          />
          {/* Fields */}
          <div className="p-[32px]">
            {/* Email Edit Section */}
            <LineItem
              title={t('email')}
              desc={user.email || "Paul.Elliott@fakemail.com"}
            >
              <Button type="secondary" onClick={() => setUpdateEmail(true)}>
                Change Email
              </Button>
            </LineItem>
            {/* Divider */}
            <hr
              className="w-full border-t-[2px] border-t-[#474761] border-dashed mb-[20px]"
              style={{ height: '0px' }}
            />
            {/* Password Edit Section */}
            <LineItem
              title={t('password')}
              desc="••••••••••••••••"
            >
              <Button type="secondary" onClick={() => setResetPassword(true)}>
                {t('resetPassword')}
              </Button>
            </LineItem>
            {/* MFA Section */}
            {settings?.enableAdminMFA ? (
              <div className="p-[20px] bg-[#212E48] border-1 border-[#3699FF] border-dashed rounded-[8px] flex items-center justify-between gap-2">
                <div className="flex items-center gap-[20px]">
                  {/* TODO: Add Icon After Discussion With Designer */}
                  <div className="h-[51px] min-w-[51px] bg-[#3699FF33] rounded-[8px] flex items-center justify-center">
                    <ShieldIcon />
                  </div>
                  <div>
                    <p className="text-white text-[14px]">
                      Secure Your Account
                    </p>
                    <p className="text-[#92928F] text-[14px]">
                      Two-factor authentication adds an extra layer of security
                      to your account. To log in, in addition you'll need to
                      provide a 6 digit code
                    </p>
                  </div>
                </div>
                <div>
                  <Button
                    onClick={async () => {
                      if (hasMFA) {
                        setLoading(true);
                        try {
                          await enableDisable2FA({
                            userId: user.id,
                            flag: false,
                          });
                          toast.success('MFA Disabled, Please login again.');
                          dispatch(logout());
                        } catch (error) {
                          toast.error(getError(error));
                        } finally {
                          setLoading(false);
                        }
                      } else {
                        setChooseAuth(true);
                      }
                    }}
                    loading={loading}
                    type={hasMFA ? 'secondary' : 'primary'}
                    className={hasMFA ? 'bg-slate-500' : ''}
                  >
                    {hasMFA ? 'Disable' : 'Enable'}
                  </Button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* Modals */}
          <UpdateEmail show={updateEmail} setShow={setUpdateEmail} />
          <ResetPassword show={resetPassword} setShow={setResetPassword} />
          <ChooseAuthMethod show={chooseAuth} setShow={setChooseAuth} />
        </div>
      )}
    </>
  );
};
