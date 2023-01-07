import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  id: Yup.string().required('ID is required'),
});

export const Unsuspend = ({ show, setShow, record }) => {
  const initialValues = {
    id: record?.id,
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.products);

  return (
    <Modal
      heading="Un-Suspend Product"
      customBody={
        <div className="mb-[32px]">
          Are you sure you wish to un-suspend this product?
        </div>
      }
      initialValues={initialValues}
      validationSchema={validationSchema}
      loading={loading}
      submitText="Un-Suspend Product"
      handleSubmit={async (values) => {
        setShow(false);
      }}
      show={show}
      setShow={setShow}
    />
  );
};