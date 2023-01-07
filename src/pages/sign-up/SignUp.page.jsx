import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { messageNotifications } from "store";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { signup } from "store/Actions/AuthActions";
import Data from "../../db.json";
import Recaptcha from "pages/Google-Recaptcha/Recaptcha";
import { useTranslation } from "react-i18next";
import { useCountries } from "use-react-countries";
import { getBrand } from "store/Actions/BrandActions";
import Logo from "components/Logo.component";

const initialValues = {
  companyName: "",
  fullName: "",
  emailAddress: "",
  password: "",
  confirmPassword: "",
  address1: "",
  address2: "",
  city: "",
  stateProv: "",
  zipCode: "",
  ipAddress: "",
};

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required!"),
  fullName: Yup.string().required("Full Name is required!"),
  emailAddress: Yup.string()
    .required("Email is required!")
    .email("Please enter a valid Email!"),
  password: Yup.string()
    .required("password is required.")
    .min(6, "Password must be atleast 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required.")
    .min(6, "Password must be atleast 6 characters")
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm Password must matches with Password"
    ),
  address1: Yup.string().required("Address is required!"),
  city: Yup.string().required("City is required!"),
  stateProv: Yup.string().required("State is required!"),
  country: Yup.string().required("Country is required!"),
  zipCode: Yup.string().required("Zip code is required!"),
});

function SignUp() {
  const { t } = useTranslation("/SignUp/ns");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { countries } = useCountries();
  const [isLoading, setIsLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const refRecaptcha = useRef(null);
  const fields = [
    { name: "fullName", label: "Full Name", placeholder: "Paul Eliot" },
    {
      name: "emailAddress",
      label: "Email Address",
      placeholder: "paul@fakemail.com",
    },
    { name: "password", label: "Password", placeholder: "******" },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "******",
    },
    { name: "companyName", label: "Company Name", placeholder: "PE Inc." },
    {
      name: "address1",
      label: "Address 1",
      placeholder: "6546 West Philmont Rd",
    },
    {
      name: "address2",
      label: "Address 2",
      placeholder: "Brooklyn",
    },
    {
      twoFields: [
        { name: "city", label: "City", placeholder: "New York" },
        { name: "stateProv", label: "State/Region", placeholder: "NY" },
      ],
    },
    {
      twoFields: [
        {
          type: "select",
          name: "country",
          label: "Country",
          placeholder: "Select country",
          options: countries
            ?.sort()
            .sort((a, b) =>
              a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            )
            .map((country) => ({
              label: country?.name,
              value: country?.name,
            })),
        },
        { name: "zipCode", label: "ZIP Code", placeholder: "11216" },
      ],
    },
  ];
  //creating function to load ip address from the API
  const getData = async () => {
    try {
      const res = await fetch(`https://api.ipify.org?format=json`, {
        method: "GET",
      });
      const data = await res.json();
      setIpAddress(data.ip);
    } catch (error) {}
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const brandId = query.get("brandId");
  const currBrandId = localStorage.getItem("brandId");

  useEffect(() => {
    if (brandId && brandId !== currBrandId) {
      dispatch(getBrand(brandId));
    }
  }, [brandId, currBrandId, dispatch]);

  return (
    <div className="w-screen mx-auto my-5 " style={{ maxWidth: "536px" }}>
      <div className="mx-4 mb-5 col md:mx-auto">
        <Logo />
      </div>
      <div className="p-4 rounded-lg bg-custom-secondary md:p-5">
        <div className="text-center">
          <h2 className="text-2xl font-normal text-white text-md">
            {t("CreateAccount")}
          </h2>
          <p className="mb-4 custom-text-light">{t("FillForm")}</p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            setIsLoading(true);
            try {
              await dispatch(
                signup(
                  values.fullName,
                  values.emailAddress,
                  values.emailAddress,
                  values.password,
                  values.confirmPassword,
                  values.companyName,
                  values.address1,
                  values.address2,
                  values.city,
                  values.stateProv,
                  values.zipCode,
                  values.country,
                  brandId,
                  ipAddress,
                  "0"
                )
              );
              setIsLoading(false);
              resetForm();
              navigate("/client/sign-in");
              toast.success(t("AccountCreate"), {
                ...messageNotifications,
              });
            } catch (error) {
              setIsLoading(false);
              toast.error(t("AccountCreateFail"), {
                ...messageNotifications,
              });
            }
          }}
        >
          {({ errors, touched, setFieldValue, value }) => {
            return (
              <Form>
                {fields.map((field, i) => {
                  return (
                    <div key={`row${i}`}>
                      {field?.twoFields ? (
                        <div className="flex justify-between mb-8">
                          {field?.twoFields?.map((halfField, idx) => {
                            return halfField.type === "select" ? (
                              <div className="w-full" key={halfField.name}>
                                <label
                                  htmlFor={halfField?.name}
                                  className="text-sm font-light text-white form-label"
                                >
                                  {halfField?.label}
                                </label>
                                <select
                                  value={value}
                                  placeholder={halfField.placeholder}
                                  onChange={(e) => {
                                    setFieldValue(
                                      halfField.name,
                                      e.target.value
                                    );
                                  }}
                                  className="form-select appearance-none block w-full px-[16px] h-[48px] text-base font-normal text-[#92928f] bg-[#171723] bg-clip-padding bg-no-repeat border-none rounded-[8px] transition ease-in-out m-0 focus:bg-[#171723] focus:border-none focus:outline-none"
                                >
                                  {halfField.options?.map((option) => (
                                    <option
                                      value={option?.value}
                                      key={option?.value}
                                      className={
                                        option?.isActive ? "isActive" : ""
                                      }
                                    >
                                      {option?.label}
                                    </option>
                                  ))}
                                </select>
                                {errors[field?.name] &&
                                  touched[field?.name] && (
                                    <span className="text-sm text-red-600">
                                      {errors[field?.name]}
                                    </span>
                                  )}
                              </div>
                            ) : (
                              <div
                                className={idx === 0 ? "mr-2" : "ml-2"}
                                key={halfField.name}
                              >
                                <label
                                  htmlFor={halfField?.name}
                                  className="text-sm font-light text-white form-label"
                                >
                                  {halfField?.label}
                                </label>
                                <Field
                                  type={
                                    halfField?.name === "password" ||
                                    halfField?.name === "confirmPassword"
                                      ? "password"
                                      : "text"
                                  }
                                  className="w-full h-12 px-3 text-gray-400 rounded-md bg-custom-main placeholder:text-gray-400 placeholder:text-sm placeholder:font-light focus:outline-none"
                                  id={halfField?.name}
                                  placeholder={halfField?.placeholder}
                                  name={halfField?.name}
                                />
                                {errors[halfField?.name] &&
                                  touched[halfField?.name] && (
                                    <span className="text-sm text-red-600">
                                      {errors[halfField?.name]}
                                    </span>
                                  )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="mt-4 mb-3">
                          <label
                            htmlFor={field?.name}
                            className="text-sm font-light text-white form-label"
                          >
                            {field?.label}
                          </label>
                          <Field
                            type={
                              field?.name === "password" ||
                              field?.name === "confirmPassword"
                                ? "password"
                                : "text"
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
                      )}
                    </div>
                  );
                })}
                <Recaptcha refRecaptcha={refRecaptcha} />
                <button
                  type="submit"
                  className="mt-3 bg-blue-500 hover:bg-blue-700 text-white w-full mb-2 rounded-md h-14 hover:bg-sky-600/[.8] ease-in duration-200"
                >
                  {isLoading
                    ? t("Creating")
                    : Data.pages.register.createAccountBtn}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default SignUp;
