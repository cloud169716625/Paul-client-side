import { Table } from 'components'
import moment from 'moment'
import { Spin } from 'antd'
import { checkModule } from 'lib/checkModule'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles.scss'
import { useEffect } from 'react'
import { setTicketCommentLoading } from 'store'

export const TicketHistory = () => {
  const { userModules } = useSelector((state) => state?.modules)
  const { permissions } = checkModule({
    module: 'Support',
    modules: userModules,
  })
  const { settings } = useSelector((state) => state.appSettings)
  const { ticket, ticketHistory } = useSelector((state) => state?.tickets)
  const { commentLoading } = useSelector((state) => state?.ticketComments)

  const dispatch = useDispatch()
  useEffect(() => {
    if (ticket?.id) {
      ;(async () => {
        dispatch(setTicketCommentLoading(true))
        dispatch(setTicketCommentLoading(false))
      })()
    }
  }, [ticket])

  const columns = [
    {
      title: 'Event Date',
      dataIndex: 'createdOn',
      key: 'createdOn',
      render: (text) => moment(text).format(settings?.dateFormat),
    },
    {
      title: 'User',
      dataIndex: 'actionByName',
      key: 'actionByName',
    },
    {
      title: 'Ticket Priority',
      dataIndex: 'ticketPriority',
      key: 'ticketPriority',
      render: (text) => {
        // [ 0 = Low, 1 = Normal, 2 = High ]
        let priority = ''
        ;['Low', 'Normal', 'High']?.forEach((el, idx) => {
          if (idx === text) {
            priority = el
          }
        })
        return priority
      },
    },
    {
      title: 'Ticket Status',
      dataIndex: 'ticketStatus',
      key: 'ticketStatus',
      render: (text) => {
        // [ 0 = Active, 1 = Waiting, 2 = Closed, 3 = ClosedAndLocked, 4 = Disabled, 5 = FollowUp ]
        let status = ''
        ;[
          'Active',
          'Waiting',
          'Closed',
          'ClosedAndLocked',
          'Disabled',
          'FollowUp',
        ]?.forEach((el, idx) => {
          if (idx === text) {
            status = el
          }
        })
        return status
      },
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedToFullName',
      key: 'assignedToFullName',
    },
    {
      title: 'Follow-Up',
      dataIndex: 'followUpOn',
      key: 'followUpOn',
      render: (text) =>
        text ? moment(text).format(settings?.dateFormat) : 'N/A',
    },
  ]

  return (
    <div className={`bg-[#1E1E2D] rounded-[8px] mt-[32px]`}>
      {commentLoading ? (
        <div className="w-full flex items-center justify-center min-h-[400px]">
          <Spin spinning />
        </div>
      ) : (
        <div className="ticket-history-table">
          <Table
            columns={columns}
            data={ticketHistory}
            fieldToFilter="id"
            permissions={permissions}
            hideActions={true}
            customFilterSort={<></>}
            rowKey={(record) => record?.id}
          />
        </div>
      )}
    </div>
  )
}
