import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteArticleCategory } from 'store';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  id: Yup.string().required('Id is required'),
});

export const Delete = ({ show, setShow }) => {
  const id = useSelector(
    (state) => state?.articleCategories?.articleCategory?.id
  );
  const initialValues = {
    id,
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.articleCategories);

  return (
    <Modal
      heading="Delete Article Category"
      submitText="Delete Category"
      show={show}
      setShow={setShow}
      customBody={
        <div className="mb-[32px]">
          Are you sure you wish to delete this article category? This action is
          permanent and can not be undone.
        </div>
      }
      loading={loading}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={async ({ id }) => {
        await dispatch(deleteArticleCategory({ id }));
        setShow(false);
      }}
    />
  );
};
