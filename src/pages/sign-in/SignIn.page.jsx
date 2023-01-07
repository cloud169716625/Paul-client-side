import { Alert } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";

import { defaultTenant } from "lib/constants";
import {
  getUserProfile,
  SaveTokenInLocalStorage,
} from "store/Actions/AuthActions";
import { messageNotifications } from "store";
import {
  ChangeMfaStatus,
  initAuthenticationFail,
  initAuthenticationPending,
  initAuthenticationSuccess,
} from "store/Slices/authSlice";
import { accountSuspended, closeLockScreen } from "store/Slices/settingSlice";
import Data from "../../db.json";
import Recaptcha from "pages/Google-Recaptcha/Recaptcha";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { getIPData, getDeviceName } from "lib";
import Logo from "components/Logo.component";

import "./SignIn.css";

const initialValues = {
  email: "",
  password: "",
};

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required.")
    .email("Please enter a valid email!"),
  password: Yup.string()
    .min(6, "Password must be atleast 6 characters")
    .required("Password is required"),
});

const fields = [
  { name: "email", label: "Email Address", placeholder: "paul@fakemail.com" },
  { name: "password", label: "Password", placeholder: "******" },
];

function SignIn() {
  const { t } = useTranslation("/SignIn/ns");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [cookies] = useCookies();
  const isTrustDevice = cookies.client_days ? true : false;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refRecaptcha = useRef(null);
  let has2faEnabled = false;
  const login = (email, password, TrustDevice) => {
    return async (dispatch) => {
      dispatch(initAuthenticationPending());
      const { ip, location } = await getIPData();
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/tokens`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            TrustDevice,
          }),
          headers: new Headers({
            "Content-type": "application/json",
            "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
            tenant: defaultTenant,
            "X-Forwarded-For": ip,
            location,
            devicename: getDeviceName(),
          }),
        }
      );
      if (!response.ok) {
        const error = await response.json();

        dispatch(initAuthenticationFail(error));
        if (error.exception === "User Not Found.") {
          setError(t("UserNotFound"));
        }
        if (error.exception.includes(t("UserNotActive"))) {
          has2faEnabled = true;

          dispatch(accountSuspended());
          navigate("/client/account-suspended");

          toast.error(t("AccountSuspended"), {
            ...messageNotifications,
          });
        }
        if (error.exception.includes(t("CredentialInvalid"))) {
          has2faEnabled = true;
          toast.error(t("InvalidCredential"), {
            ...messageNotifications,
          });
        }
      }
      const res = await response.json();

      if (res.messages[0]) {
        has2faEnabled = true;
        navigate("/client/one-time-password");
        localStorage.setItem("userId__client", res.messages[1]);
        localStorage.setItem("userEmail__client", res.messages[2]);
        if (res.messages[4] === "true") {
          dispatch(ChangeMfaStatus());
          toast.success(t("6DigitCode"), {
            ...messageNotifications,
          });
        } else {
          toast.success(t("VerifyOtp"), {
            ...messageNotifications,
          });
        }
      }
      localStorage.removeItem("Client__Account-Suspended");
      dispatch(initAuthenticationSuccess(res.data));
      dispatch(closeLockScreen());
      dispatch(getUserProfile(res.data.token));
      SaveTokenInLocalStorage(dispatch, res.data);
    };
  };

  return (
    <div className="sign-in-page-wrapper">
      <div className="flex h-screen">
        <div className="flex justify-center w-screen pt-5">
          <div className="col" style={{ maxWidth: "536px" }}>
            <div className="flex items-center justify-center mb-5">
              <Logo />
            </div>
            <div
              className="p-4 mx-4 rounded-lg col md:mx-auto bg-custom-secondary md:p-5"
              style={{ maxWidth: "536px" }}
            >
              <div className="text-center">
                {error && <Alert variant="danger">{error}</Alert>}
                <h2 className="mb-2 text-2xl font-normal text-white text-md">
                  {Data.pages.login.title}
                </h2>
                <p className="custom-text-light">
                  {t("NewHere")}{" "}
                  <span className="text-blue-400">
                    <Link to="/client/sign-up">{t("ClickHere")}</Link>{" "}
                  </span>
                  {t("CreateAccount")}
                </p>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={SignInSchema}
                onSubmit={async (values, { resetForm }) => {
                  setIsLoading(true);
                  try {
                    setError("");
                    await dispatch(
                      login(values.email, values.password, isTrustDevice)
                    );
                    resetForm();
                    toast.success(t("LoginSuccess"), {
                      ...messageNotifications,
                    });
                    setIsLoading(false);
                  } catch (err) {
                    setIsLoading(false);
                    if (!has2faEnabled) {
                      toast.error(t("LoginFail"), {
                        ...messageNotifications,
                      });
                    }
                  }
                }}
              >
                {({ touched, errors }) => {
                  return (
                    <Form>
                      {fields?.map((field) => {
                        return (
                          <div className="mt-4 mb-3" key={field.name}>
                            <div className="flex justify-between">
                              <label
                                htmlFor={field?.name}
                                className="text-sm font-light text-white form-label"
                              >
                                {field?.label}
                              </label>
                              {field.name === "password" && (
                                <Link
                                  to="/client/forgot-password"
                                  className="text-sm font-light text-blue-400 cursor-pointer"
                                >
                                  {Data.pages.login.forgotPassword}
                                </Link>
                              )}
                            </div>
                            <Field
                              type={
                                field?.name === "password" ? "password" : "text"
                              }
                              className="w-full h-12 px-3 text-gray-400 rounded-md bg-custom-main placeholder:text-gray-400 placeholder:text-sm placeholder:font-light focus:outline-none"
                              id={field?.name}
                              placeholder={field?.placeholder}
                              name={field?.name}
                            />
                            {errors[field?.name] && touched[field?.name] && (
                              <span className="text-sm text-red-600">
                                {errors[field?.name]}
                              </span>
                            )}
                          </div>
                        );
                      })}
                      <div className="mt-4 md:mt-5 ">
                        <Recaptcha refRecaptcha={refRecaptcha} />
                        <button
                          type="submit"
                          className="w-full mb-2 text-white duration-200 ease-in bg-blue-500 rounded-md hover:bg-blue-700 h-14"
                        >
                          {isLoading
                            ? t("LoginIn")
                            : Data.pages.login.loginButton}
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
