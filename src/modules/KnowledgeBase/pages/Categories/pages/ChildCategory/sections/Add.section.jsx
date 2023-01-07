import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { createArticleCategory } from 'store';
import * as Yup from 'yup';

const initialValues = {
  name: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required!'),
});

export const Add = ({ show, setShow }) => {
  const { articleCategories, loading } = useSelector(
    (state) => state?.articleCategories
  );

  const parentCategories = articleCategories?.filter(
    (category) =>
      category.parentCategoryId === '00000000-0000-0000-0000-000000000000'
  );

  const fields = [
    {
      type: 'input',
      name: 'name',
      placeholder: 'Enter Category Name',
      title: 'Category Name',
    },
    {
      type: 'select',
      name: 'parentCategoryId',
      placeholder: 'Select Parent Category',
      title: 'Parent Category',
      options: parentCategories?.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    },
  ];

  const dispatch = useDispatch();
  return (
    <Modal
      heading="Add Child Category"
      submitText="Add Category"
      show={show}
      loading={loading}
      setShow={setShow}
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={async (values) => {
        const newValues = {
          ...values,
          categoryType: 1,
        };
        await dispatch(createArticleCategory(newValues));
        setShow(false);
      }}
    />
  );
};
