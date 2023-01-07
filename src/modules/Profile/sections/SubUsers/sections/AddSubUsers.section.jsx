import * as Yup from 'yup';
import { Modal } from 'components';
import { useState } from 'react';
import { AddPermissions } from './AddPermissions.section';
import { useSelector } from 'react-redux';

const validationSchema1 = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email().required('Email Address is required'),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Please use 8 or more characters with a mix of letters, numbers & symbols"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  brandId: Yup.string().required('Brand is required'),
  companyName: Yup.string().required('Company Name is required'),
  address1: Yup.string().required('Address 1 is required'),
  city: Yup.string().required('City is required'),
  state_Region: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
  zipCode: Yup.string().required('Zip Code is required'),
});

export const AddSubUsers = ({ show, setShow }) => {
  const [subUsersInit, setSubUsersInit] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);

  const { user } = useSelector((state) => state?.auth);
  const fields = [
    {
      name: 'fullName',
      type: 'input',
      title: 'Full Name',
      placeholder: 'Test Client',
    },
    {
      name: 'email',
      type: 'input',
      title: 'Email Address',
      placeholder: 'testclient@gmail.com',
    },
    {
      name: 'password',
      type: "password",
      title: 'Password',
      placeholder: "*******",
    },
    {
      name: 'confirmPassword',
      type: "password",
      title: 'Confirm Password',
      placeholder: "*******",
    },
    {
      name: 'brandId',
      type: 'input',
      title: 'Brand',
      disabled: true,
    },
    {
      name: 'companyName',
      type: 'input',
      title: 'Company Name',
      placeholder: 'Mind 2 Matter',
    },
    {
      name: 'address1',
      type: 'input',
      title: 'Address 1',
      placeholder: '8546 West Philmont Rd',
    },
    {
      name: 'address2',
      type: 'input',
      title: 'Address 2',
      placeholder: 'Brooklyn',
    },
    {
      name: 'city',
      type: 'input',
      title: 'City',
      placeholder: 'New York',
    },
    {
      name: 'state_Region',
      type: 'input',
      title: 'State',
      placeholder: 'NY',
    },
    {
      name: 'country',
      type: 'input',
      title: 'Country',
      placeholder: 'United State of America',
    },
    {
      name: 'zipCode',
      type: 'input',
      title: 'Zip Code',
      placeholder: '11216',
    },
  ];

  const initialValues1 = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    address1: "",
    address2: "",
    city: "",
    state_Region: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
    brandId: user?.brandId,
    status: true,
    parentID: user?.id,
    oldUserId: 0
  };

  return (
    <>
      <Modal
        show={show}
        setShow={setShow}
        fields={fields}
        initialValues={initialValues1}
        validationSchema={validationSchema1}
        heading="Add New Sub-User"
        submitText="Configure Permissions"
        handleSubmit={async (values) => {
          const newValues = {
            ...values,
            // validTill: values.validTill.toISOString(),
          };
          setShow(false);
          setSubUsersInit(newValues);
          setShowPermissions(true);
        }}
      />
      <AddPermissions
        show={showPermissions}
        setShow={setShowPermissions}
        subUsersInit={subUsersInit}
      />
    </>
  );
};
