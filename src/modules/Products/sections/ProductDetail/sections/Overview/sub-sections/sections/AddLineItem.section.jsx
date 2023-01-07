import { useState, useEffect } from 'react';
import { Modal } from 'components';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';

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

const initialValues = {
  lineItem: '',
  price: 0,
};

const validationSchema = Yup.object().shape({
  lineItem: Yup.string().required('This field is required!'),
  price: Yup.number().required('This field is required!'),
});

export const AddLineItem = ({ show, setShow, handleAdd }) => {
  const [id, setId] = useState('');

  useEffect(() => {
    if (show) {
      const newId = nanoid();
      setId(newId);
    }
  }, [show]);

  return (
    <Modal
      heading="Add Line Item"
      submitText="Add Line Item"
      show={show}
      setShow={setShow}
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={async (values) => {
        handleAdd({ id, ...values, isNew: true });
        setShow(false);
      }}
    />
  );
};
