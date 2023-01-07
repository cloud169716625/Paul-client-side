import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { addTicketComments } from 'store';
import { editTicket } from 'store';

export const Status = ({ show, setShow, id }) => {
  const fields = [
    {
      type: 'select',
      name: 'ticketStatus',
      placeholder: 'Select Status',
      options: ['Active', 'Waiting', 'Closed', 'Closed and Locked']?.map(
        (el, idx) => ({
          label: el,
          value: idx,
        })
      ),
      title: 'Status',
    },
    {
      type: 'textarea',
      name: 'comment',
      title: 'Comment',
      placeholder: 'Enter Comment Here...',
    },
  ];

  const { ticket, detailsLoading, loading } = useSelector(
    (state) => state?.tickets
  );
  const initialValues = {
    ticketStatus: ticket?.ticketStatus,
    comment: '',
  };

  const dispatch = useDispatch();
  return (
    <Modal
      heading="Change Status"
      submitText="Change Status"
      show={show}
      setShow={setShow}
      fields={fields}
      loading={detailsLoading || loading}
      initialValues={initialValues}
      handleSubmit={async (values) => {
        const finalTicketValues = {
          ...ticket,
          ticketStatus: Number(values?.ticketStatus),
        };
        // Edit Ticket Assigned To
        await dispatch(editTicket({ data: finalTicketValues }));
        if (values?.comment) {
          await dispatch(
            addTicketComments({
              ticketId: ticket?.id,
              commentText: values?.comment,
              isSticky: false,
              isDraft: false,
              ticketCommentAction: 0,
              ticketCommentType: 1,
            })
          );
        }
        setShow(false);
      }}
    />
  );
};
