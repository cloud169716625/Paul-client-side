import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { Input, Modal } from "components";
import { Info } from "icons";
import QRCode from "react-qr-code";
import { axios, getError, validateMFAConfig } from "lib";
import { logout } from "store/Slices/authSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialValues = {
  code: "",
};

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
});

export const AuthApps = ({ show, setShow }) => {
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState(null);
  const { authUri, user } = useSelector((state) => state?.auth);

  useEffect(() => {
    if (authUri) {
      const url = new URL(authUri);
      const params = new URLSearchParams(url?.search);
      setParams(params);
    }
  }, [authUri]);

  const dispatch = useDispatch();

  return (
    <Modal
      handleSubmit={async (values) => {
        setLoading(true);
        try {
          // Validate Code
          const res = await axios.post(validateMFAConfig().url, {
            userId: user.id,
            code: values.code,
            isRemember: false,
          });
          if (res?.status === 200) {
            toast.success("MFA Enabled Successfully");
            // Logout
            dispatch(logout());
          }
        } catch (e) {
          toast.error(getError(e));
          setLoading(false);
        }
        setShow(false);
      }}
      loading={loading}
      show={show}
      setShow={setShow}
      heading="Choose Authentication Method"
      submitText="Submit"
      validationSchema={validationSchema}
      initialValues={initialValues}
      customBody={
        <div className="pb-[32px]">
          {/* Heading */}
          <h6 className="mb-[12px] text-white text-[16px] text-center">
            Authenticator Apps
          </h6>
          {/* Desc */}
          <p className="text-[#92928F] text-[14px] text-center mb-[32px]">
            Get codes from an app like Google Authenticator, Microsoft
            Authenticator etc.
          </p>
          {/* QR Image */}
          <div className="mb-[32px] flex items-center justify-center">
            <QRCode
              value={params?.get("secret")}
              title="Scan QR Code to Enable MFA"
              width={200}
              height={200}
              className="rounded-[8px]"
            />
          </div>
          {/* Additional Info */}
          <div className="rounded-[8px] p-[20px] bg-[#392F28] border-dashed border-1 border-[#FFA800] gap-[20px] flex flex-col items-center">
            {/* Info Icon Box */}
            <div className="rounded-[8px] bg-[#FFA80033] w-[79px] h-[79px] flex items-center justify-center">
              <Info fill="#ffa800" />
            </div>
            {/* Description */}
            <p className="text-[#92928F] text-[14px] text-center">
              If you having trouble using the QR code, select manual entry on
              your app, and enter your username and the code:
            </p>
            <p className="text-white text-[16px] text-center font-medium">
              {params?.get("secret")}
            </p>
            {/* Input */}
          </div>
          <div className="mt-[32px]">
            <Input name="code" placeholder="Enter Authentication Code..." />
          </div>
        </div>
      }
    />
  );
};
