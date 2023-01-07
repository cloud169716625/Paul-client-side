import { Modal } from 'components';
import { createServerImage } from 'lib';
import { useDispatch, useSelector } from 'react-redux';
import { updateArticleCategory } from 'store';
import * as Yup from 'yup';

const fields = [
  {
    type: 'input',
    name: 'name',
    placeholder: 'Enter Category Name',
    title: 'Category Name',
  },
  {
    type: 'file',
    name: 'categoryIcon',
    title: 'Icon',
    subText: 'Browse',
  },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required!'),
});

export const EditCategory = ({ show, setShow, id }) => {
  const dispatch = useDispatch();
  const { articleCategory, loading } = useSelector(
    (state) => state?.articleCategories
  );

  const initialValues = {
    name: articleCategory?.name,
    categoryIcon: articleCategory?.categoryIcon,
  };

  return (
    <Modal
      heading="Edit Parent Category"
      submitText="Edit Category"
      show={show}
      loading={loading}
      setShow={setShow}
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={async (values) => {
        let newValues = null;
        if (values?.image) {
          const img = await createServerImage(values?.image);
          newValues = {
            categoryIcon: img,
            name: values.name,
            categoryType: 1,
          };
        } else {
          newValues = {
            categoryIcon: values?.categoryIcon,
            name: values.name,
            categoryType: 1,
          };
        }
        await dispatch(updateArticleCategory({ id, data: newValues }));
        setShow(false);
      }}
    />
  );
};
