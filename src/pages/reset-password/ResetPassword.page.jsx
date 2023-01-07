import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { messageNotifications } from 'store';
import { passwordReset } from 'store/Actions/AuthActions';
import { useTranslation } from "react-i18next";
import Logo from "components/Logo.component";

const initialValues = {
  password: '',
  confirmPassword: '',
};

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required.')
    .min(6, 'Password must be atleast 6 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required.')
    .min(6, 'Password must be atleast 6 characters')
    .oneOf(
      [Yup.ref('password'), null],
      'Confirm Password must matches with Password'
    ),
});

const fields = [
  { name: 'password', label: 'Password', placeholder: '**********' },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: '**********',
  },
];

function ResetPassword() {
  const { t } = useTranslation("/ResetPassword/ns");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const token = query.get('resetToken');

  return (
    <div className="h-screen w-full flex items-center justify-content-center">
      <div className="col" style={{ maxWidth: '536px' }}>
        <div className="flex items-center justify-center mb-5">
          <Logo />
        </div>
        <div className="col mx-4 md:mx-auto bg-custom-secondary rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-md text-2xl text-white font-normal">
              {t("title")}
            </h2>
            <p className="custom-text-light">
              {t("subTitle")}
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={ResetPasswordSchema}
            onSubmit={async (values) => {
              const userEmail = localStorage.getItem('userEmail__client');
              setIsLoading(true);
              try {
                await dispatch(
                  passwordReset(
                    userEmail,
                    values.password,
                    values.confirmPassword,
                    token
                  )
                );
                setIsLoading(false);
                navigate('/client/sign-in');
                toast.success(t("PasswordChangeSuccess"), {
                  ...messageNotifications,
                });
              } catch (err) {
                setIsLoading(false);
                toast.error(t("FailResetPassword"), {
                  ...messageNotifications,
                });
              }
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {fields.map((field) => {
                  return (
                    <div className="mt-4 md:mb-8" key={field?.name}>
                      <label
                        htmlFor={field?.name}
                        className="form-label text-white font-light text-sm"
                      >
                        {field?.label}
                      </label>
                      <Field
                        type="password"
                        className="w-full h-14 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 px-3 placeholder:text-sm placeholder:font-light focus:outline-none"
                        id={field?.name}
                        placeholder={field?.placeholder}
                        name={field?.name}
                      />
                      {errors[field?.name] && touched[field?.name] ? (
                        <div className="text-red-600 text-sm">
                          {errors[field?.name]}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                <div className="flex mt-4 md:mt-5">
                  <button
                    type="button"
                    onClick={() => navigate('/client/sign-in')}
                    className="bg-blue-900/[.3] w-full mb-2 rounded-md h-12 text-blue-500 hover:bg-blue-900/[.1] ease-in duration-200"
                  >
                    {t("cancelBtn")}
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 w-full h-12 rounded-md text-white font-light ml-2 ease-in duration-200"
                  >
                    {isLoading
                      ? 'Resetting...'
                      : t("submitBtn")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
