import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from 'store';
import * as Yup from 'yup';

const fields = [
  {
    name: 'currentPassword',
    title: 'Current Password',
    type: 'password',
    placeholder: '••••••••••••••••',
  },
  {
    name: 'newPassword',
    title: 'New Password',
    type: 'password',
    placeholder: '••••••••••••••••',
  },
  {
    name: 'confirmNewPassword',
    title: 'Confirm New Password',
    type: 'password',
    placeholder: '••••••••••••••••',
  },
];

const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current Password is required'),
  newPassword: Yup.string()
    .notOneOf(
      [Yup.ref('currentPassword'), null],
      'New Password cannot be the same as current password'
    )
    .required('New Password is required'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm New Password is required'),
});

export const ResetPassword = ({ show, setShow }) => {
  const { isLoading } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  return (
    <Modal
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      loading={isLoading}
      handleSubmit={async (values) => {
        const finalValues = {
          currentPassword: values.currentPassword,
          password: values.newPassword,
          confirmPassword: values.confirmNewPassword,
        };
        await dispatch(changePassword(finalValues));
        setShow(false);
      }}
      show={show}
      setShow={setShow}
      heading="Update Password"
      submitText="Update Password"
      additionalBody={
        <p className="mb-[32px] text-[#92928F] text-[14px]">
          After changing your password, you will be logged out of all devices
          including this one.
        </p>
      }
    />
  );
};
