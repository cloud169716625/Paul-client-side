import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { addTicketComments } from 'store';
import { editTicket } from 'store';

export const Priority = ({ show, setShow, id }) => {
  const { ticket, detailsLoading, loading } = useSelector(
    (state) => state?.tickets
  );

  const initialValues = {
    ticketPriority: ticket?.ticketPriority,
  };

  const fields = [
    {
      type: 'select',
      name: 'ticketPriority',
      placeholder: 'Select Priority',
      options: ['Low', 'Normal', 'High'].map((el, idx) => ({
        label: el,
        value: idx,
      })),
      title: 'Priority',
    },
    {
      type: 'textarea',
      name: 'comment',
      title: 'Comment',
      placeholder: 'Enter Comment Here...',
    },
  ];

  const dispatch = useDispatch();
  return (
    <Modal
      heading="Set Priority"
      submitText="Set Priority"
      show={show}
      setShow={setShow}
      loading={loading || detailsLoading}
      handleSubmit={async (values) => {
        const finalTicketValues = {
          ...ticket,
          ticketPriority: Number(values?.ticketPriority),
        };
        await dispatch(editTicket({ data: finalTicketValues }));

        if (values?.comment) {
          await dispatch(
            addTicketComments({
              ticketId: ticket?.id,
              commentText: values?.comment,
              isSticky: false,
              isDraft: false,
              ticketCommentAction: 3,
              ticketCommentType: 1,
            })
          );
        }
        setShow(false);
      }}
      fields={fields}
      initialValues={initialValues}
    />
  );
};
