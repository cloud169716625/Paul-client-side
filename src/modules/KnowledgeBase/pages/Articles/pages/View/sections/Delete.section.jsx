import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteArticle } from 'store';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  id: Yup.string().required('Id is required'),
});

export const Delete = ({ show, setShow, id }) => {
  const initialValues = {
    id,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state?.articles);

  return (
    <Modal
      heading="Delete Article"
      submitText="Delete Article"
      show={show}
      setShow={setShow}
      customBody={
        <div className="mb-[32px]">
          Are you sure you wish to delete this article? This action is permanent
          and can not be undone.
        </div>
      }
      loading={loading}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={async ({ id }) => {
        await dispatch(deleteArticle({ id }));
        setShow(false);
        navigate('/client/dashboard/knowledge-base/articles');
      }}
    />
  );
};
