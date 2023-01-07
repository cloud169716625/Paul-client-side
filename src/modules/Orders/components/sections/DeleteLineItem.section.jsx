import { Modal } from 'components';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  id: Yup.string().required('Id is required'),
});

export const DeleteItem = ({ show, setShow, id, handleDelete }) => {
  const initialValues = {
    id,
  };

  return (
    <Modal
      heading="Delete Line Item"
      submitText="Delete Line Item"
      show={show}
      setShow={setShow}
      customBody={
        <div className="mb-[32px]">
          Are you sure you wish to delete this Item? This action is permanent
          and can not be undone.
        </div>
      }
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={async ({ id }) => {
        handleDelete(id);
        setShow(false);
      }}
    />
  );
};
