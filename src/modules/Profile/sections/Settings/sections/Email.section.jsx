import * as Yup from 'yup';

import { Input, Modal } from 'components';
import { useState } from 'react';
import { getError, validateOTPConfig, axios } from 'lib';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from 'store/Slices/authSlice';

const initialValues = {
  otp: '',
};

const validationSchema = Yup.object().shape({
  otp: Yup.string().required('OTP is required'),
});

export const Email = ({ show, setShow }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  return (
    <Modal
      handleSubmit={async (values) => {
        setLoading(true);
        try {
          // Validate Code
          const { url } = validateOTPConfig();
          const res = await axios.post(url, {
            userId: user.id,
            code: values.otp,
            isRemember: false,
          });
          if (res?.status === 200) {
            toast.success('2FA Enabled Successfully');
            // Logout
            dispatch(logout());
          }
        } catch (e) {
          toast.error(getError(e));
          setLoading(false);
        }
        setShow(false);
      }}
      show={show}
      setShow={setShow}
      heading="Choose Authentication Method"
      submitText="Submit"
      validationSchema={validationSchema}
      initialValues={initialValues}
      loading={loading}
      customBody={
        <div className="pb-[32px]">
          {/* Heading */}
          <h6 className="mb-[12px] text-white text-[16px] text-center">
            One Time Password (OTP)
          </h6>
          {/* Desc */}
          <p className="text-[#92928F] text-[14px] text-center mb-[32px]">
            Please enter the OTP sent to your email to enable 2 Factor
            Authentication on your account.
          </p>
          {/* Input */}
          <div className="mt-[32px]">
            <Input name="otp" placeholder="Enter OTP..." />
          </div>
        </div>
      }
    />
  );
};
