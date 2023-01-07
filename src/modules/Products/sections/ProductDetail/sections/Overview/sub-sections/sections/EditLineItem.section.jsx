import { Modal } from 'components';
import * as Yup from 'yup';

const fields = [
  {
    type: 'input',
    name: 'lineItem',
    placeholder: 'Enter Line Item Name',
    title: 'Line Item Name',
  },
  {
    type: 'number',
    name: 'price',
    placeholder: 'Enter Price',
    title: 'Price',
  },
];

const validationSchema = Yup.object().shape({
  lineItem: Yup.string().required('This field is required!'),
  price: Yup.number().required('This field is required!'),
});

export const EditLineItem = ({ show, setShow, editValue, handleEdit }) => {
  const initialValues = {
    id: editValue?.id,
    lineItem: editValue?.lineItem,
    price: editValue?.price,
  };
  return (
    <Modal
      heading="Edit Line Item"
      submitText="Edit Line Item"
      show={show}
      setShow={setShow}
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={async (values) => {
        handleEdit(editValue?.id, values);
        setShow(false);
      }}
    />
  );
};
