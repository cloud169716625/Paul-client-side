import { useParams } from 'react-router-dom'
import { Reply as ReplyIcon } from 'icons'
import { Formik, Form, Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { List, Button, Popconfirm } from 'antd'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import {
  getTicketById,
  addTicketReplies,
} from 'store'
import { Button as CustomButton, Input } from 'components'
import { genrateFirstLetterName, getTimeDiff } from 'lib'
import { deleteComment } from 'store'
import { setTicketCommentLoading } from 'store'
import { updateTicketComments } from 'store'
import { getCurrentOnlineUsers } from 'store'
import moment from 'moment'
import { deleteTicketReplies } from 'store'

const initialValues = {
  commentText: '',
}

const initialRepliesValues = {
  commentText: '',
}

const validationSchema = Yup.object().shape({
  commentText: Yup.string().required('Comment text is required'),
})

const validationSchemaReplies = Yup.object().shape({
  commentText: Yup.string().required('Comment text is required'),
})

export const Communication = () => {
  const { settings } = useSelector((state) => state.appSettings)
  const [selected, setSelected] = useState([])
  const user = useSelector((state) => state.auth.user)
  const { users } = useSelector((state) => state?.users)
  const { commentLoading } = useSelector((state) => state?.ticketComments)
  const { repliesLoading } = useSelector((state) => state?.ticketReplies)
  const isSelected = (id) => selected.indexOf(id) !== -1
  const { id } = useParams()
  const dispatch = useDispatch()
  const { ticket } = useSelector((state) => state?.tickets)

  useEffect(() => {
    dispatch(getCurrentOnlineUsers())
  }, [])

  const commentSource = ticket?.ticketComments?.filter(
    (comment) => !comment?.isDraft
  )

  const finalComments = commentSource
    ?.sort((a, b) => (moment(a?.createdOn) < moment(b?.createdOn) ? -1 : 1))
    .sort((a, b) => Number(b?.isSticky) - Number(a?.isSticky))

  // Ticket Data
  const ticketData = [
    { title: 'Ticket Number', value: ticket?.ticketNumber },
    {
      title: 'Opened By',
      value: ticket?.createdByName,
    },
    { title: 'Product / Service', value: ticket?.product },
    { title: 'Department', value: ticket?.department?.name },
  ]

  const handleReplyInput = (id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  return (
    <>
      <div className="mt-[40px] mb-[40px] grid grid-cols-[1fr_1fr] gap-[32px] w-2/3">
        {ticketData?.map((data) => {
          return (
            <div className="flex items-center gap-[12px] justify-between border-[#323248] border-[1px] rounded border-dashed px-[20px] py-[16px]">
              <div className="text-[16px] text-[#474761] whitespace-nowrap">
                {data?.title}:
              </div>
              <div className={'text-[14px]'}>
                {data?.value ? data?.value : 'N/A'}
              </div>
            </div>
          )
        })}
      </div>

      <div className={`form ticket-form `}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => {
            dispatch(addTicketReplies({
              commentText: values?.commentText,
            }))
          }}
        >
          {({ values }) => (
            <Form>
              <div
                className={`relative mb-[32px] items-end ${
                  ticket?.ticketStatus > 0 || ticket?.assignedTo === ''
                    ? 'pointer-events-none opacity-30'
                    : ''
                }`}
              >
                <Input
                  key="commentText"
                  name="commentText"
                  label=""
                  placeholder="Enter Message"
                  type="textarea"
                  rows={7}
                />
                <div className="absolute bottom-5 right-5 flex items-center gap-[12px]">
                  <CustomButton
                    loading={commentLoading}
                    htmlType="submit"
                    className="px-[16px] py-[5px] text-[14px] h-[36px]"
                  >
                    Send
                  </CustomButton>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className={'ticket-list-wrap custom-table__table'}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50', '100', '200'],
          }}
          dataSource={finalComments}
          footer={''}
          renderItem={(item) => (
            <List.Item key={item.id} actions={''} extra={''}>
              <div
                id={item.id}
                className={`${
                  item?.ticketCommentType === 1 &&
                  users?.find((user) => user?.id === item.createdBy)
                    ? 'border-[#0BB783]/30'
                    : item?.ticketCommentType === 1 &&
                      users?.find((user) => user?.id !== item.createdBy)
                    ? 'border-[#FFA800]/50'
                    : users?.find((user) => user?.id === item.createdBy)
                    ? ' border-[#8950FC]/50'
                    : ' border-[#FFA800]/50'
                } p-[20px] border-[1px] rounded-[8px]`}
              >
                <div className={'w-full relative'}>
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
                              ? 'bg-[#2F264F] text-[#8950FC]'
                              : 'bg-[#392F28] text-[#FFA800]'
                          } rounded-[4px] text-[14px] px-[8px] py-[4px] ml-3`}
                        >
                          {users?.find((user) => user?.id === item.createdBy)
                            ? 'Admin'
                            : 'Client'}
                        </span>
                        {item?.ticketCommentType === 1 && (
                          <span
                            className={`bg-[#1C3238]/50 text-[#0BB783]/70 rounded-[4px] text-[14px] px-[8px] py-[4px] ml-3`}
                          >
                            {item?.ticketCommentAction === 0
                              ? 'GENERAL COMMENT'
                              : item?.ticketCommentAction === 1
                              ? 'TRANSFER COMMENT'
                              : item?.ticketCommentAction === 2
                              ? 'FOLLOW-UP COMMENT'
                              : item?.ticketCommentAction === 3
                              ? 'PRIORITY COMMENT'
                              : ''}
                          </span>
                        )}

                        <div className="flex items-center ml-3">
                          <p className="text-[14px] text-[#474761]">
                            -{' '}
                            {moment(item?.createdOn)?.format(
                              settings?.dateFormat
                            )}{' '}
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
                      {item?.ticketCommentType !== 1 && (
                        <span
                          onClick={() => handleReplyInput(item.id)}
                          className={
                            'text-[#474761] cursor-pointer hover:text-[#40a9ff]'
                          }
                        >
                          Reply
                        </span>
                      )}
                      {item?.createdBy === user?.id ? (
                        <Popconfirm
                          okButtonProps={{
                            className: 'bg-[#40a9ff]',
                          }}
                          title="Are you sure you want to delete this comment?"
                          onConfirm={async () => {
                            await dispatch(deleteComment({ id: item?.id }))
                            dispatch(setTicketCommentLoading(true))
                            await dispatch(getTicketById(ticket?.id, true))
                            dispatch(setTicketCommentLoading(false))
                          }}
                        >
                          <div
                            className={
                              'text-[#474761] cursor-pointer hover:text-[#F64E60]'
                            }
                          >
                            Delete
                          </div>
                        </Popconfirm>
                      ) : (
                        <></>
                      )}

                      <span
                        to="#"
                        onClick={async () => {
                          await dispatch(
                            updateTicketComments({
                              data: {
                                ...item,
                                isSticky: !item?.isSticky,
                              },
                            })
                          )
                          dispatch(setTicketCommentLoading(true))
                          await dispatch(getTicketById(ticket?.id, true))
                          dispatch(setTicketCommentLoading(false))
                        }}
                        className={`cursor-pointer ${
                          item?.isSticky ? ' text-[#40a9ff]' : ' text-[#474761]'
                        }`}
                      >
                        {item?.isSticky ? 'Unpin' : 'Pin'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-[16px] text-[#92928F] mt-[20px] leading-7">
                  {item?.commentText}
                </div>
                {isSelected(item.id) && (
                  <div className={'reply-box mt-[20px] relative'}>
                    <Formik
                      initialValues={initialRepliesValues}
                      validationSchema={validationSchemaReplies}
                      enableReinitialize
                      onSubmit={async (values) => {
                        const newValues = {
                          commentText: values?.commentText,
                          ticketCommentId: item.id,
                        }
                        ;(async () => {
                          await dispatch(addTicketReplies(newValues))
                          await dispatch(getTicketById(id))
                          setSelected([])
                        })()
                      }}
                    >
                      {({ errors, touched }) => {
                        return (
                          <Form>
                            <div
                              className={`relative  ${
                                ticket?.ticketStatus > 0 ||
                                ticket?.assignedTo === ''
                                  ? 'pointer-events-none opacity-30'
                                  : ''
                              }`}
                            >
                              <Field
                                className="modal__form-el-field"
                                key="commentText"
                                type="text"
                                name="commentText"
                                placeholder="Write Something"
                              />
                              <Button
                                htmlType="submit"
                                loading={repliesLoading}
                                className="absolute bottom-5 right-4 py-[0px] px-[0px] bg-none bg-transparent"
                              >
                                <ReplyIcon />
                              </Button>
                            </div>
                            {touched['commentText'] &&
                              errors['commentText'] && (
                                <div className="error mt-[8px]">
                                  {errors['commentText']}
                                </div>
                              )}
                          </Form>
                        )
                      }}
                    </Formik>
                  </div>
                )}
              </div>
              <div className="ml-[40px]">
                {item?.ticketCommentReplies?.map((data, i) => (
                  <div
                    key={i}
                    id={data?.id}
                    className={`${
                      users?.find((user) => user?.id === item.createdBy)
                        ? ' border-[#8950FC]/70'
                        : ' border-[#FFA800]/70'
                    } p-[20px] border-[1px] rounded-[8px] mt-[20px]`}
                  >
                    <div className={'w-full relative'}>
                      <div className="flex">
                        <div className="image w-[47px] rounded-[5px] overflow-hidden">
                          {data?.userImagePath ? (
                            <img
                              src={item?.userImagePath}
                              alt={data?.userFullName}
                            />
                          ) : (
                            <div className="bg-[#171723] text-[#0BB783] px-[8px] py-[4px] uppercase w-[40px] h-[40px] rounded-[4px] flex justify-center items-center">
                              {genrateFirstLetterName(data?.userFullName)}
                            </div>
                          )}
                        </div>
                        <div className="meta ml-[16px]">
                          <div className="flex align-center">
                            <span className="text-[#fff] text-[16px]">
                              {data?.userFullName}
                            </span>
                            <span
                              className={`${
                                users?.find(
                                  (user) => user?.id === item.createdBy
                                )
                                  ? 'bg-[#2F264F] text-[#8950FC]'
                                  : 'bg-[#392F28] text-[#FFA800]'
                              } rounded-[4px] text-[14px] px-[8px] py-[4px] ml-3`}
                            >
                              {users?.find(
                                (user) => user?.id === data.createdBy
                              )
                                ? 'Admin'
                                : 'Client'}
                            </span>
                            {/* {data.createdBy === ticket.createdBy && (
                              <span className="bg-[#3A2434] p-[4px] text-[#F64E60] rounded-[4px] text-[14px] px-[8px] py-[4px] ml-2">
                                AUTHOR
                              </span>
                            )} */}
                            <div className="flex items-center ml-3">
                              <p className="text-[14px] text-[#474761]">
                                -{' '}
                                {moment(data?.createdOn)?.format(
                                  settings?.dateFormat
                                )}{' '}
                                -
                              </p>
                              <p className="text-[14px] text-[#6D6D80] bg-[#323248] px-2 rounded-sm mx-2">
                                {`${getTimeDiff(data?.createdOn)} ago`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {ticket?.ticketStatus === 0 && (
                        <div className="flex items-center gap-[12px] text-[16px] absolute right-5 top-1">
                          {data?.ticketCommentType !== 1 && (
                            <span
                              onClick={() => handleReplyInput(data.id)}
                              className={
                                'text-[#474761] cursor-pointer hover:text-[#40a9ff]'
                              }
                            >
                              Reply
                            </span>
                          )}
                          {data?.createdBy === user?.id ? (
                            <Popconfirm
                              okButtonProps={{
                                className: 'bg-[#40a9ff]',
                              }}
                              title="Are you sure you want to delete this reply?"
                              onConfirm={async () => {
                                await dispatch(deleteTicketReplies(data?.id))
                                dispatch(setTicketCommentLoading(true))
                                await dispatch(getTicketById(ticket?.id, true))
                                dispatch(setTicketCommentLoading(false))
                              }}
                            >
                              <span
                                className={
                                  'text-[#474761] cursor-pointer hover:text-[#F64E60]'
                                }
                              >
                                Delete
                              </span>
                            </Popconfirm>
                          ) : (
                            <></>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-[16px] text-[#92928F] mt-[20px] leading-7">
                      {data?.commentText}
                    </div>
                    {isSelected(data.id) && (
                      <div className={'reply-box mt-[20px] relative'}>
                        <Formik
                          initialValues={initialRepliesValues}
                          validationSchema={validationSchemaReplies}
                          enableReinitialize
                          onSubmit={async (values) => {
                            const newValues = {
                              commentText: values?.commentText,
                              ticketCommentId: item.id,
                              ticketCommentParentReplyId: data.id,
                            }
                            ;(async () => {
                              await dispatch(addTicketReplies(newValues))
                              await dispatch(getTicketById(id))
                              setSelected([])
                            })()
                          }}
                        >
                          {({ errors, touched, values }) => {
                            return (
                              <Form>
                                <Field
                                  className="modal__form-el-field"
                                  key="commentText"
                                  type="text"
                                  name="commentText"
                                  placeholder="Write Something"
                                />
                                {touched['commentText'] &&
                                  errors['commentText'] && (
                                    <div className="error mt-[8px]">
                                      {errors['commentText']}
                                    </div>
                                  )}
                                <Button
                                  htmlType="submit"
                                  loading={repliesLoading}
                                  className="absolute bottom-5 right-4 py-[0px] px-[0px] bg-none bg-transparent"
                                >
                                  <ReplyIcon />
                                </Button>
                              </Form>
                            )
                          }}
                        </Formik>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </List.Item>
          )}
        />
      </div>
    </>
  )
}
