import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { editTicket, addTicketComments } from 'store';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({});

export const FollowUp = ({ show, setShow }) => {
  const { users } = useSelector((state) => state?.users);
  const { departments } = useSelector((state) => state?.departments);

  const { ticket, detailsLoading, loading } = useSelector(
    (state) => state?.tickets
  );

  const initialValues = {
    followUpOn: ticket?.followUpOn,
    assignedTo: ticket?.assignedTo,
    departmentId: ticket?.departmentId,
    ticketPriority: ticket?.ticketPriority,
    pinTicket: ticket?.pinTicket,
  };

  const fields = [
    {
      type: 'date',
      name: 'followUpOn',
      placeholder: 'Select a date to follow up',
      title: 'Follow Up Date',
    },
    {
      type: 'select',
      name: 'assignedTo',
      placeholder: 'Select Admin',
      options: users?.map((user) => ({
        label: user?.fullName ? user?.fullName : user?.email,
        value: user?.id,
      })),
      title: 'Admin',
    },
    {
      type: 'select',
      name: 'departmentId',
      placeholder: 'Select Department',
      options: departments?.map((dept) => ({
        label: dept?.name,
        value: dept?.id,
      })),
      title: 'Department',
    },
    {
      type: 'select',
      name: 'ticketPriority',
      placeholder: 'Select Priority',
      options: [
        { name: 'Low', value: 0 },
        { name: 'Normal', value: 1 },
        { name: 'High', value: 2 },
      ]?.map((priority) => ({
        label: priority?.name,
        value: priority?.value,
      })),
      title: 'Priority',
    },
    {
      type: 'switch',
      name: 'pinTicket',
      title: 'Pin Ticket',
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
      heading="Follow Up"
      submitText="Follow Up"
      show={show}
      setShow={setShow}
      loading={detailsLoading || loading}
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={async (values) => {
        const finalTicketValues = {
          ...ticket,
          followUpOn: moment(values?.followUpOn)?.toISOString(),
          departmentId: values?.departmentId,
          ticketPriority: Number(values?.ticketPriority),
          pinTicket: values?.pinTicket,
          followUpComment: values?.comment ? values?.comment : null,
        };
        await dispatch(editTicket({ data: finalTicketValues }));
        if (values?.comment) {
          await dispatch(
            addTicketComments({
              ticketId: ticket?.id,
              commentText: values?.comment,
              isSticky: false,
              isDraft: false,
              ticketCommentAction: 2,
              ticketCommentType: 1,
            })
          );
        }
        setShow(false);
      }}
    />
  );
};
