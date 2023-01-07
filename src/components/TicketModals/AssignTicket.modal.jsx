import { Modal } from "components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentOnlineUsers } from "store";
import { addTicketComments } from "store";
import { editTicket } from "store";

export const AssignTicket = ({ show, setShow, id }) => {
  const { users, onlineUsers } = useSelector((state) => state?.users);
  const { departments } = useSelector((state) => state?.departments);
  const { ticket } = useSelector((state) => state?.tickets);
  const [departmentId, setDepartmentId] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentOnlineUsers());
  }, []);

  let usersData = [];
  if (departmentId) {
    usersData = [{ label: "Auto Assign", value: "" }];
    users
      ?.filter((user) => user?.departmentIds?.includes(departmentId))
      ?.forEach((user) => {
        const isOnline = onlineUsers?.find(
          (admin) => admin?.userId === user?.id
        )
          ? true
          : false;
        usersData.push({
          value: user?.id,
          label: user?.fullName
            ? `${user?.fullName}${isOnline ? "   (Online)" : ""}`
            : "N/A",
          isActive: isOnline ? true : false,
        });
      });
  } else {
    usersData = [{ label: "Please select department first", value: "" }];
  }

  let departmentsData = [{ value: "", label: "Select Department" }];
  departments?.forEach((departments) => {
    departmentsData.push({
      value: departments?.id,
      label: departments?.name,
    });
  });
  const ticketStatus = [
    "Active",
    "Waiting",
    "Closed",
    "Closed and Locked",
  ]?.map((el, idx) => ({
    label: el,
    value: idx,
  }));

  const fields = [
    {
      type: "select",
      name: "department",
      // placeholder: "Select Department",
      options: departmentsData,
      action: setDepartmentId,
      title: "Department",
    },
    {
      type: "select",
      name: "assignedTo",
      // placeholder: "Please select department first",
      options: usersData?.sort((a, b) =>
        a?.isActive === b?.isActive ? 0 : a?.isActive ? -1 : 1
      ),
      title: "Admin",
    },
    {
      type: "select",
      name: "ticketPriority",
      placeholder: "Select Priority",
      options: ["Low", "Normal", "High"].map((el, idx) => ({
        label: el,
        value: idx,
      })),
      title: "Priority",
    },
    {
      name: "ticketStatus",
      title: "Status",
      type: "select",
      options: ticketStatus,
    },
    {
      type: "textarea",
      name: "comment",
      title: "Comment",
      placeholder: "Enter Comment Here...",
    },
  ];

  const initialValues = {
    assignedTo: ticket?.assignedTo,
    ticketStatus: ticket?.ticketStatus,
    ticketPriority: ticket?.ticketPriority,
    comment: "",
  };

  return (
    <Modal
      heading="Assign Ticket"
      submitText="Transfer Ticket"
      show={show}
      setShow={setShow}
      fields={fields}
      initialValues={initialValues}
      // loading={detailsLoading || loading || usersLoading}
      handleSubmit={async (values) => {
        const finalTicketValues = {
          ...ticket,
          ticketStatus: Number(values?.ticketStatus),
          ticketPriority: Number(values?.ticketPriority),
          assignedTo: values?.assignedTo,
          assignedToFullName: values?.assignedTo
            ? ticket?.assignedToFullName
            : "",
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
              ticketCommentAction: 1,
              ticketCommentType: 1,
            })
          );
        }
        setShow(false);
      }}
    />
  );
};
