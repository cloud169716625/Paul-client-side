// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Formik, Form, Field } from "formik";
// import { useCookies } from "react-cookie";
// import * as Yup from "yup";
// import { messageNotifications } from "store";
// import {
//   confirmOtp,
//   disableConfirmOtp,
//   trustedDays,
//   ValidateMFA,
// } from "store/Actions/AuthActions";
// import Data from "../../db.json";
// import "./OneTimePassword.css";
// const initialValues = {
//   otp: "",
// };

// const validationSchema = Yup.object().shape({
//   otp: Yup.string().required("Please enter OTP recieved on your email."),
// });

// function OneTimePassword() {
//   const days = useSelector((state) => state.settings.settings);
//   const [isLoading, setIsLoading] = useState(false);
//   const [ischecked, setIsChecked] = useState(false);
//   const dispatch = useDispatch();
//   const [cookies, setCookie] = useCookies();
//   const navigate = useNavigate();
//   useEffect(() => {
//     dispatch(trustedDays());
//   }, [dispatch]);

//   const trustDevicehandler = (e) => {
//     setIsChecked(e.target.checked);
//   };

//   return (
//     <div className="h-screen w-full flex items-center justify-content-center">
//       <div className="col" style={{ maxWidth: "536px" }}>
//         <div className="flex items-center justify-center mb-5">
//           <Link to="/">
//             <img src="/icon/logo.svg" alt="" className="h-20 w-20" />
//           </Link>
//         </div>
//         <div className="col mx-4 md:mx-auto bg-custom-secondary rounded-lg p-8">
//           <div className="text-center">
//             <h2 className="text-md text-2xl text-white font-normal">
//               {Data.pages.otp.header}
//             </h2>
//             <p className="custom-text-light">{Data.pages.otp.subTitle}</p>
//           </div>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={async (values, { resetForm }) => {
//               const userId = localStorage.getItem("userId__client");
//               setIsLoading(true);
//               try {
//                 await dispatch(
//                   ischecked
//                     ? disableConfirmOtp(
//                         userId,
//                         values?.otp,
//                         ischecked
//                       )
//                     : ValidateMFA(userId, values?.otp)
//                 );
//                 if (ischecked && days && days.trustDeviceinDays) {
//                   setCookie("client_days", days.trustDeviceinDays, {
//                     maxAge: days.trustDeviceinDays * 24 * 60 * 60,
//                   });
//                 }
//                 toast.success("Otp verified Successfully", {
//                   ...messageNotifications,
//                 });
//                 setIsLoading(false);
//                 resetForm();
//               } catch (err) {
//                 toast.error("Failed to Verify OTP", {
//                   ...messageNotifications,
//                 });
//                 setIsLoading(false);
//               }
//             }}
//           >
//             {({ errors, touched }) => {
//               return (
//                 <Form>
//                   <div className="mt-4 md:mb-8">
//                     <label
//                       htmlFor="otp"
//                       className="form-label text-white font-light text-sm"
//                     >
//                       {Data.pages.otp.header}
//                     </label>
//                     <Field
//                       type="text"
//                       name="otp"
//                       id="otp"
//                       className="w-full h-12 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 placeholder:text-sm px-3  placeholder:font-light focus:outline-none "
//                       placeholder={Data.pages.otp.placeholder}
//                     />
//                     {errors.otp && touched.otp ? (
//                       <div className="text-red-600 text-sm">{errors.otp}</div>
//                     ) : null}
//                   </div>

//                   {days && days !== 0 && (
//                     <div className="trust-devices">
//                       <input type="checkbox" onChange={trustDevicehandler} />
//                       <label className="text-white font-light text-sm">
//                         Trust Device for {days && days.trustDeviceinDays} days
//                       </label>
//                     </div>
//                   )}
//                   <div className="flex mt-4 md:mt-5">
//                     <button
//                       type="button"
//                       onClick={() => navigate("/client/sign-in")}
//                       className="bg-blue-900/[.3] w-full mb-2 rounded-md h-12 text-blue-500 hover:bg-blue-900/[.1] ease-in duration-200"
//                     >
//                       {Data.pages.otp.cancelButton}
//                     </button>
//                     <button
//                       type="submit"
//                       className="bg-blue-500 hover:bg-blue-700 w-full h-12 rounded-md text-white font-light ml-2 ease-in duration-200"
//                     >
//                       {isLoading ? "Verifying..." : Data.pages.otp.submitButton}
//                     </button>
//                   </div>
//                 </Form>
//               );
//             }}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OneTimePassword;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import { useCookies } from "react-cookie";
import * as Yup from "yup";
import { messageNotifications } from "store";
import {
  confirmOtp,
  disableConfirmOtp,
  trustedDays,
  validateMFA,
} from "store/Actions/AuthActions";
import "./OneTimePassword.css";
import { useTranslation } from "react-i18next";
import Logo from "components/Logo.component";

const initialValues = {
  otp: "",
};

const validationSchema = Yup.object().shape({
  otp: Yup.string().required("Please enter OTP to Login."),
});

function OneTimePassword() {
  const { t } = useTranslation("/OneTimePassword/ns");
  const days = useSelector((state) => state.settings.settings);
  const hasMFA = useSelector((state) => state.auth.hasMFA);
  const [isLoading, setIsLoading] = useState(false);
  const [ischecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const [setCookie] = useCookies();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(trustedDays());
  }, [dispatch]);
  const trustDevicehandler = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="h-screen w-full flex items-center justify-content-center">
      <div className="col" style={{ maxWidth: "536px" }}>
        <div className="flex items-center justify-center mb-5">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="col mx-4 md:mx-auto bg-custom-secondary rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-md text-2xl text-white font-normal">
              {t("header")}
            </h2>
            <p className="custom-text-light">
              {hasMFA ? t("EnterOtp") : t("subTitle")}
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const userId = localStorage.getItem("userId__client");
              setIsLoading(true);
              try {
                await dispatch(
                  ischecked
                    ? disableConfirmOtp(userId, values?.otp, ischecked)
                    : hasMFA
                    ? validateMFA(userId, values?.otp, ischecked)
                    : confirmOtp(userId, values?.otp)
                );
                toast.success(t("OtpVerify"), {
                  ...messageNotifications,
                });
                if (ischecked && days && days.trustDeviceinDays) {
                  setCookie("client_days", days.trustDeviceinDays, {
                    maxAge: days.trustDeviceinDays * 24 * 60 * 60,
                  });
                }
                setIsLoading(false);
                resetForm();
              } catch (err) {
                toast.error(t("FailOtpVerify"), {
                  ...messageNotifications,
                });
                setIsLoading(false);
              }
            }}
          >
            {({ errors, touched }) => {
              return (
                <Form>
                  <div className="mt-4 md:mb-8">
                    <label
                      htmlFor="otp"
                      className="form-label text-white font-light text-sm"
                    >
                      {t("header")}
                    </label>
                    <Field
                      type="text"
                      name="otp"
                      id="otp"
                      className="w-full h-12 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 placeholder:text-sm px-3  placeholder:font-light focus:outline-none "
                      placeholder={t("placeholder")}
                    />
                    {errors.otp && touched.otp ? (
                      <div className="text-red-600 text-sm">{errors.otp}</div>
                    ) : null}
                  </div>

                  {days && days !== 0 && (
                    <div className="trust-devices">
                      <input type="checkbox" onChange={trustDevicehandler} />
                      <label className="text-white font-light text-sm">
                        {t("TrustDevice")} {days && days.trustDeviceinDays} {t("Days")}
                      </label>
                    </div>
                  )}
                  <div className="flex mt-4 md:mt-5">
                    <button
                      type="button"
                      onClick={() => navigate("/client/sign-in")}
                      className="bg-blue-900/[.3] w-full mb-2 rounded-md h-12 text-blue-500 hover:bg-blue-900/[.1] ease-in duration-200"
                    >
                      {t("cancelButton")}
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 w-full h-12 rounded-md text-white font-light ml-2 ease-in duration-200"
                    >
                      {isLoading ? t("Verifying") : t("submitButton")}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default OneTimePassword;
