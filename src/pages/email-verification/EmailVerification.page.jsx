import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { messageNotifications } from 'store';
import { validateEmailToken } from 'store/Actions/AuthActions';
// import {Link} from 'react-router-dom'
import Data from '../../db.json';
import { useTranslation } from "react-i18next";

function EmailVerification() {
  const { t } = useTranslation("/EmailVerification/ns");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  //= ===EXTRACTING REQUIRED PARAMS FROM URL====//
  const { userId } = useParams();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const code = query.get('code');
  

  const emailVerificationHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(validateEmailToken(userId, code))
      setIsLoading(false);
      toast.success(t("EmailVerify"), {
        ...messageNotifications,
      });
      navigate('/client/sign-in');
    } catch (error) {
      toast.error(t("FailEmailVerify"), { ...messageNotifications });
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex  items-center justify-content-center">
      <div className="col " style={{ maxWidth: '536px' }}>
        <div className="flex items-center justify-center mb-5">
          <img src="/icon/logo.svg" alt="" className="h-20 w-20" />
        </div>
        <div className="bg-custom-secondary  col mx-4 md:mx-auto  rounded-lg p-4 md:p-5">
          <div className="text-center">
            <h2 className="text-md text-2xl text-white font-normal">
              {Data.pages.emailVerification.title}
            </h2>
            <p className="custom-text-light">
              {Data.pages.emailVerification.subTitle}
            </p>
            <button
              type="submit"
              onClick={emailVerificationHandler}
              className="bg-blue-500 hover:bg-blue-700 ease-in duration-200 mt-4 w-full h-12 rounded-md text-white font-light"
            >
              {isLoading
                ? t("Verifying")
                : Data.pages.emailVerification.verifyBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
