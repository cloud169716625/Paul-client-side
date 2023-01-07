import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { updateArticleFeedback } from 'store';
import * as Yup from 'yup';

const fields = [
  {
    type: 'input',
    name: 'note',
    placeholder: 'Enter a Note',
    title: 'Note',
  },
];

const initialValues = {
  note: '',
};

const validationSchema = Yup.object().shape({
  note: Yup.string().required('This field is required!'),
});

export const MarkAsReviewed = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { loading, articlesFeedback } = useSelector(
    (state) => state?.articlesFeedback
  );
  return (
    <Modal
      heading={
        !articlesFeedback?.isReviewed
          ? 'Mark as Reviewed'
          : 'Mark as not Reviewed'
      }
      submitText={
        !articlesFeedback?.isReviewed
          ? 'Mark as Reviewed'
          : 'Mark as not Reviewed'
      }
      show={show}
      loading={loading}
      setShow={setShow}
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={async (values) => {
        const isReviewed = articlesFeedback?.isReviewed ? false : true;
        await dispatch(
          updateArticleFeedback({
            id: articlesFeedback?.id,
            data: {
              ...articlesFeedback,
              note: values?.note,
              isReviewed,
            },
          })
        );
        setShow(false);
      }}
    />
  );
};
