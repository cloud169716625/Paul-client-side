import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { messageNotifications } from 'store';
import { forgotPassword } from 'store/Actions/AuthActions';
import Data from '../../db.json';
import Recaptcha from 'pages/Google-Recaptcha/Recaptcha';
import { useTranslation } from "react-i18next";

const initialValues = {
  email: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required!')
    .email('Please enter a valid email!'),
});

function ForgotPassword() {
  const { t } = useTranslation("/ForgotPassword/ns");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refRecaptcha = useRef(null);
  return (
    <div className="h-screen w-full flex items-center justify-content-center">
      <div className="col" style={{ maxWidth: '536px' }}>
        <div className="flex items-center justify-center mb-5">
          <img src="/icon/logo.svg" alt="" className="h-20 w-20" />
        </div>
        <div className="col mx-4 md:mx-auto bg-custom-secondary rounded-lg p-8 ">
          <div className="text-center">
            <h2 className="text-md text-2xl text-white font-normal">
              {Data.pages.forgotPassword.title}
            </h2>
            <p className="custom-text-light">
              {Data.pages.forgotPassword.subTitle}
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              setIsLoading(true);
              try {
                await dispatch(forgotPassword(values.email));
                localStorage.setItem('userEmail__client', values.email);
                toast.success(
                  t("ResetPasswordLink"),
                  {
                    ...messageNotifications,
                  }
                );
                resetForm()
                setIsLoading(false);
              } catch (err) {
                toast.error(t("FailResetPassword"), {
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
                      htmlFor="forgotPassword"
                      className="form-label text-white font-light text-sm"
                    >
                      {Data.pages.forgotPassword.emailAddress}
                    </label>
                    <Field
                      id="forgotPassword"
                      type="email"
                      name="email"
                      className="w-full h-12 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 focus:outline-none placeholder:text-sm px-3  placeholder:font-light"
                      placeholder={Data.pages.forgotPassword.placeholder}
                    />
                    {errors.email && touched.email ? (
                      <div className="text-red-600 text-sm">{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="flex mt-4 md:mt-5">
                    <button
                      type="button"
                      className="bg-blue-900/[.3] w-full mb-2 rounded-md h-12 text-blue-500 hover:bg-blue-900/[.1] ease-in duration-200"
                      onClick={() => navigate('/client/sign-in')}
                    >
                      {Data.pages.forgotPassword.cancelBtn}
                    </button>
                    <Recaptcha refRecaptcha={refRecaptcha}/>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 w-full h-12 rounded-md text-white font-light ml-2 ease-in duration-200"
                    >
                      {isLoading
                        ? t("Sending")
                        : Data.pages.forgotPassword.submitBtn}
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

export default ForgotPassword;
