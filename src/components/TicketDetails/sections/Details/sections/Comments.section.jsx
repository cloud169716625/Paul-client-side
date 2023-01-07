import { NavLink } from "react-router-dom";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, List, Button, Popconfirm } from "antd";
import * as Yup from "yup";
import moment from "moment";
import { getTicketById, addTicketComments } from "store";
import { Button as CustomButton, Input } from "components";
import { genrateFirstLetterName, getTimeDiff } from "lib";
import { updateTicketComments } from "store";
import { setTicketCommentLoading } from "store";
import { deleteComment } from "store";

const initialValues = {
  commentText: "",
};
const validationSchema = Yup.object().shape({
  commentText: Yup.string().required("Comment text is required"),
});

export const Comments = () => {
  const { commentLoading } = useSelector((state) => state?.ticketComments);
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.appSettings);
  const { ticket } = useSelector((state) => state?.tickets);
  const { users, clients } = useSelector((state) => state?.users);
  const commentSource = ticket?.ticketComments?.filter(
    (comment) => comment?.ticketCommentType === 1 && !comment?.isDraft
  );
  const finalComments = commentSource?.sort(
    (a, b) => Number(b?.isSticky) - Number(a?.isSticky)
  );
  return (
    <>
      <div className={`form ticket-form mt-[20px]`}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values) => {}}
        >
          {({ values }) => (
            <Form>
              <div
                className={`relative mb-[32px] items-end ${
                  ticket?.ticketStatus > 0 || ticket?.assignedTo === ""
                    ? "pointer-events-none opacity-30"
                    : ""
                }`}
              >
                <Input
                  key={"commentText"}
                  name={"commentText"}
                  label={""}
                  placeholder={"Share Your Comments"}
                  type={"textarea"}
                  rows={"7"}
                />
                <div className="absolute bottom-5 right-5 gap-[12px]">
                  <Dropdown
                    overlay={
                      <>
                        <Button
                          htmlType="submit"
                          onClick={async () => {
                            const newValues = {
                              commentText: values?.commentText,
                              ticketId: ticket?.id,
                              isSticky: false,
                              isDraft: false,
                              ticketCommentType: 1,
                            };
                            await dispatch(addTicketComments(newValues));
                            await dispatch(getTicketById(ticket?.id));
                          }}
                          loading={commentLoading}
                        >
                          Send
                        </Button>
                        <Button
                          htmlType="submit"
                          onClick={async () => {
                            const newValues = {
                              commentText: values?.commentText,
                              ticketId: ticket?.id,
                              isSticky: false,
                              isDraft: true,
                              ticketCommentType: 1,
                            };
                            await dispatch(addTicketComments(newValues));
                            await dispatch(getTicketById(ticket?.id));
                          }}
                          loading={commentLoading}
                        >
                          Save
                        </Button>
                      </>
                    }
                    overlayClassName="custom-table__table-dropdown-overlay"
                    className="custom-table__table-dropdown"
                    destroyPopupOnHide
                    placement="bottomRight"
                    trigger={["click", "contextMenu"]}
                  >
                    <CustomButton
                      loading={commentLoading}
                      className="px-[16px] py-[5px] text-[14px] h-[36px]"
                    >
                      Send
                    </CustomButton>
                  </Dropdown>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className={"ticket-list-wrap custom-table__table"}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50", "100", "200"],
          }}
          dataSource={finalComments}
          footer={""}
          renderItem={(item) => (
            <List.Item key={item.id} actions={""} extra={""}>
              <div
                id={item.id}
                className={`${
                  clients?.find((client) => client?.id === item.userId)
                    ? " border-[#FFA800]/50"
                    : " border-[#0BB783]/30"
                } p-[20px] border-[1px] rounded-[8px] mt-[20px]`}
              >
                <div className={"w-full relative"}>
                  <div className="flex">
                    <div className="image w-[47px] rounded-[5px] overflow-hidden">
                      {item?.userImagePath ? (
                        <img
                          src={item?.userImagePath}
                          alt={item?.userFullName}
                        />
                      ) : (
                        <div className="bg-[#171723] text-[#0BB783]  px-[8px] py-[4px] uppercase w-[40px] h-[40px] rounded-[4px] flex justify-center items-center">
                          {genrateFirstLetterName(item.userFullName)}
                        </div>
                      )}
                    </div>
                    <div className="meta ml-[16px]">
                      <div className="flex align-center">
                        <span className="text-[#fff] text-[16px]">
                          {item?.userFullName}
                        </span>
                        <span
                          className={`${
                            users?.find((user) => user?.id === item.createdBy)
                              ? "bg-[#2F264F] text-[#8950FC]"
                              : "bg-[#392F28] text-[#FFA800]"
                          } rounded-[4px] text-[14px] px-[8px] py-[4px] ml-3`}
                        >
                          {users?.find((user) => user?.id === item.createdBy)
                            ? "Admin"
                            : "Client"}
                        </span>
                        <span
                          className={`bg-[#1C3238]/50 text-[#0BB783]/70 rounded-[4px] text-[14px] px-[8px] py-[4px] ml-3`}
                        >
                          {item?.ticketCommentAction === 0
                            ? "GENERAL COMMENT"
                            : item?.ticketCommentAction === 1
                            ? "TRANSFER COMMENT"
                            : item?.ticketCommentAction === 2
                            ? "FOLLOW-UP COMMENT"
                            : item?.ticketCommentAction === 3
                            ? "PRIORITY COMMENT"
                            : ""}
                        </span>
                        {/* {item.createdBy === ticket.createdBy && (
                              <span className="bg-[#3A2434] p-[4px] text-[#F64E60] rounded-[4px] text-[14px] px-[8px] py-[4px] ml-2">
                                AUTHOR
                              </span>
                            )} */}
                        <div className="flex items-center  ml-3">
                          <p className="text-[14px] text-[#474761]">
                            -{" "}
                            {moment(item?.createdOn)?.format(
                              settings?.dateFormat
                            )}{" "}
                            -
                          </p>
                          <p className="text-[14px] text-[#6D6D80] bg-[#323248] px-2 rounded-sm mx-2">
                            {`${getTimeDiff(item?.createdOn)} ago`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {ticket?.ticketStatus === 0 && (
                    <div className="flex items-center gap-[12px] text-[16px] absolute right-5 top-1">
                      <Popconfirm
                        okButtonProps={{
                          className: "bg-[#40a9ff]",
                        }}
                        title="Are you sure you want to delete this comment?"
                        onConfirm={async () => {
                          await dispatch(deleteComment({ id: item?.id }));
                          dispatch(setTicketCommentLoading(true));
                          await dispatch(getTicketById(ticket?.id, true));
                          dispatch(setTicketCommentLoading(false));
                        }}
                      >
                        <div
                          className={
                            "text-[#474761] cursor-pointer hover:text-[#40a9ff]"
                          }
                        >
                          Delete
                        </div>
                      </Popconfirm>
                      <NavLink
                        to="#"
                        onClick={async () => {
                          await dispatch(
                            updateTicketComments({
                              data: {
                                ...item,
                                isSticky: !item?.isSticky,
                              },
                            })
                          );
                          dispatch(setTicketCommentLoading(true));
                          await dispatch(getTicketById(ticket?.id, true));
                          dispatch(setTicketCommentLoading(false));
                        }}
                        className={
                          item?.isSticky ? "text-[#40a9ff]" : "text-[#474761]"
                        }
                      >
                        {item?.isSticky ? "Unpin" : "Pin"}
                      </NavLink>
                    </div>
                  )}
                </div>
                <div className="text-[16px] text-[#92928F] mt-[20px] leading-7">
                  {item?.commentText}
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
