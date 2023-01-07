import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubUser } from 'store';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  id: Yup.string().required('ID is required'),
});

export const Delete = ({ show, setShow, id }) => {
  const { loading } = useSelector((state) => state?.subUsers);
  const dispatch = useDispatch();
  return (
    <Modal
      heading="Delete Sub-User"
      customBody={
        <div className="mb-[32px]">
          Are you sure you wish to delete this Sub-User? This action is permanent
          and can not be undone.
        </div>
      }
      initialValues={{ id }}
      validationSchema={validationSchema}
      submitText="Delete Sub-User"
      loading={loading}
      handleSubmit={async (values) => {
        await dispatch(deleteSubUser(values?.id));
        setShow(false);
      }}
      show={show}
      setShow={setShow}
    />
  );
};