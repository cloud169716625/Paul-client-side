import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  id: Yup.string().required('ID is required'),
});

export const Renew = ({ show, setShow, record }) => {
  const initialValues = {
    id: record?.id,
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.products);

  return (
    <Modal
      heading="Renew Product"
      customBody={
        <div className="mb-[32px]">
          Are you sure you wish to renew this product? This action is permanent
          and can not be undone.
        </div>
      }
      initialValues={initialValues}
      validationSchema={validationSchema}
      loading={loading}
      submitText="Renew Product"
      handleSubmit={async (values) => {
        setShow(false);
      }}
      show={show}
      setShow={setShow}
    />
  );
};