import { Modal } from 'components';
import { createServerImage } from 'lib';
import { useDispatch, useSelector } from 'react-redux';
import { createArticleCategory } from 'store';
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

const initialValues = {
  name: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required!'),
});

export const AddCategory = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.articleCategories);
  return (
    <Modal
      heading="Add Parent Category"
      submitText="Add Category"
      show={show}
      loading={loading}
      setShow={setShow}
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={async (values) => {
        const img = await createServerImage(values?.image);
        const newValues = {
          categoryIcon: img,
          name: values.name,
          categoryType: 1,
        };
        await dispatch(createArticleCategory(newValues));
        setShow(false);
      }}
    />
  );
};
