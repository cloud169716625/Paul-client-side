import { Modal } from "components";
import { deepEqual } from "lib";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "store";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
});

export const EditProfile = ({ t, show, setShow, user }) => {
  const initialValues = {
    fullName: user?.fullName,
    email: user?.email,
    address1: user?.address1,
    address2: user?.address2,
    language: user?.language,
  };

  const { isLoading } = useSelector((state) => state?.auth);

  const dispatch = useDispatch();

  const fields = [
    {
      type: "input",
      name: "fullName",
      placeholder: "Paul.Elliott",
      title: t("fullName"),
    },
    {
      type: "input",
      name: "email",
      placeholder: "Paul.Elliott",
      title: t("billingEmail"),
    },
    {
      type: "input",
      name: "address1",
      placeholder: "6546 West Philmont Rd",
      title: t("address1"),
    },
    {
      type: "input",
      name: "address2",
      placeholder: "Brooklyn",
      title: t("address2"),
    },
  ];

  return (
    <Modal
      show={show}
      setShow={setShow}
      heading="Update Profile"
      submitText={t("saveChanges")}
      initialValues={initialValues}
      validationSchema={validationSchema}
      loading={isLoading}
      fields={fields}
      handleSubmit={async (values) => {
        if (deepEqual(values, initialValues)) {
          toast.warn("Nothing is changed!");
        } else {
          await dispatch(updateUser(user?.id, values));
        }
        setShow(false);
      }}
    />
  );
};
