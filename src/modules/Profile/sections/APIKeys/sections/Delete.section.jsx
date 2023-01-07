import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAPIKey } from 'store';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  id: Yup.string().required('ID is required'),
});

export const Delete = ({ show, setShow, id }) => {
  const { loading } = useSelector((state) => state?.apiKeys);
  const dispatch = useDispatch();
  return (
    <Modal
      heading="Delete API Key"
      customBody={
        <div className="mb-[32px]">
          Are you sure you wish to delete this API Key? This action is permanent
          and can not be undone.
        </div>
      }
      initialValues={{ id }}
      validationSchema={validationSchema}
      submitText="Delete API Key"
      loading={loading}
      handleSubmit={async (values) => {
        await dispatch(deleteAPIKey(values?.id));
        setShow(false);
      }}
      show={show}
      setShow={setShow}
    />
  );
};