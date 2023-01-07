import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmail } from 'store';
import * as Yup from 'yup';

const fields = [
  {
    name: 'email',
    title: 'Enter New Email Address',
    type: 'email',
    placeholder: 'Enter New Email Address',
  },
  {
    name: 'confirmPassword',
    title: 'Confirm Password',
    type: 'password',
    placeholder: '••••••••••••••••',
  },
];

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  confirmPassword: Yup.string().required('Password is required'),
});

export const UpdateEmail = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  const initialValues = {
    email: user?.email,
    confirmPassword: '',
  };

  return (
    <Modal
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      loading={isLoading}
      handleSubmit={async ({ email, confirmPassword }) => {
        const finalValues = {
          email,
          password: confirmPassword,
        };
        await dispatch(updateEmail(finalValues));
        setShow(false);
      }}
      show={show}
      setShow={setShow}
      heading="Update Email"
      submitText="Update Email"
    />
  );
};
