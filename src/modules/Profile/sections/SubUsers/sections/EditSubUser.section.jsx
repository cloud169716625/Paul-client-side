import * as Yup from 'yup';
import moment from 'moment';
import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { updateSubUser } from 'store';
import { deepEqual } from 'lib';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email().required('Email Address is required'),
  brandId: Yup.string().required('Brand is required'),
  companyName: Yup.string().required('Company Name is required'),
  address1: Yup.string().required('Address 1 is required'),
  city: Yup.string().required('City is required'),
  state_Region: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
  zipCode: Yup.string().required('Zip Code is required'),
});

export const EditSubUser = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const { loading, subUser } = useSelector((state) => state?.subUsers);
  // const { users } = useSelector((state) => state?.users);

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
  const initialValues = {
    fullName: subUser?.fullName,
    email: subUser?.email,
    companyName: subUser?.companyName,
    address1: subUser?.address1,
    address2: subUser?.address2,
    city: subUser?.city,
    state_Region: subUser?.state_Region,
    zipCode: subUser?.zipCode,
    country: subUser?.country,
    brandId: subUser?.brandId,
    parentID: subUser?.parentID,
    subUserModules: subUser?.userModules,
  };

  return (
    <>
      <Modal
        show={show}
        setShow={setShow}
        fields={fields}
        initialValues={initialValues}
        loading={loading}
        validationSchema={validationSchema}
        heading="Edit Sub-User"
        submitText="Update"
        handleSubmit={async (values) => {
          if (deepEqual(values, initialValues)) {
            toast.info('No changes made');
            setShow(false);
          } else {
            const newValues = {
              ...values,
              password: "Qwerty1234$",
              confirmPassword: "Qwerty1234$",
              // validTill: values.validTill.toISOString(),
            };
            await dispatch(updateSubUser(subUser?.id, newValues));
            // await dispatch(getAPIKeysByUID(user?.id));
            setShow(false);
          }
        }}
      />
    </>
  );
};