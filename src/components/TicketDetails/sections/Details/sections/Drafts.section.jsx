import { useDispatch, useSelector } from 'react-redux'
import { List, Popconfirm } from 'antd'
import { genrateFirstLetterName } from 'lib'
import { Button as CustomButton } from 'components'
import { deleteComment } from 'store'
import { getTicketById } from 'store'
import { updateTicketComments } from 'store'
import { setTicketCommentLoading } from 'store'

export const Drafts = () => {
  const { ticket } = useSelector((state) => state?.tickets)
  const { commentLoading } = useSelector((state) => state?.ticketComments)

  const dispatch = useDispatch()

  return (
    <>
      <div className={'ticket-list-wrap custom-table__table'}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50', '100', '200'],
          }}
          dataSource={ticket?.ticketComments?.filter(
            (comment) => comment?.isDraft === true
          )}
          footer={''}
          renderItem={(item) => (
            <List.Item key={item.id} actions={''} extra={''}>
              <div
                id={item.id}
                className="p-[20px] border-[1px] rounded-[8px] border-[#323248]"
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
                      </div>
                      {/* <div className="text-[#474761] text-[14px]">1 Hour</div> */}
                    </div>
                  </div>
                  {ticket?.ticketStatus === 0 && ticket?.assignedTo !== '' && (
                    <div className="flex items-center gap-[12px] text-[16px] absolute right-5 top-1">
                      {/* <CustomButton
                        className="px-[16px] py-[5px] text-[14px] h-[36px]"
                        onClick={() => setActive('Communication')}
                      >
                        View
                      </CustomButton> */}
                      <CustomButton
                        className="px-[16px] py-[5px] text-[14px] h-[36px]"
                        loading={commentLoading}
                        onClick={async () => {
                          await dispatch(
                            updateTicketComments({
                              data: {
                                ...item,
                                isDraft: false,
                              },
                            })
                          )
                          dispatch(setTicketCommentLoading(true))
                          await dispatch(getTicketById(ticket?.id, false))
                          dispatch(setTicketCommentLoading(false))
                        }}
                      >
                        Send
                      </CustomButton>
                      <CustomButton
                        className="px-[16px] py-[5px] text-[14px] h-[36px]"
                        loading={commentLoading}
                        onClick={async () => {
                          await dispatch(
                            updateTicketComments({
                              data: {
                                ...item,
                                isDraft: false,
                                isSticky: true,
                              },
                            })
                          )
                          dispatch(setTicketCommentLoading(true))
                          await dispatch(getTicketById(ticket?.id, false))
                          dispatch(setTicketCommentLoading(false))
                        }}
                      >
                        Send and Pin
                      </CustomButton>
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
                        <CustomButton
                          loading={commentLoading}
                          className="px-[16px] py-[5px] text-[14px] h-[36px]"
                        >
                          Delete
                        </CustomButton>
                      </Popconfirm>
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
  )
}
