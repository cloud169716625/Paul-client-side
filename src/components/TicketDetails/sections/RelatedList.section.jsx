import { useDispatch, useSelector } from 'react-redux'
import { Table, TicketMenu } from 'components'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { checkModule } from 'lib/checkModule'
import './styles.scss'
import { getLoggedInUserAssignTickets } from 'store'
import { getUsers } from 'store'
import { getClients } from 'store'
import { Button, Spin } from 'antd'
import { axios, getTicketsConfig } from 'lib'
import { TicketSearch } from 'modules/KnowledgeBase/pages/Articles/pages/View/sections/AdvancedSearch/AdvancedSearch'
import moment from 'moment/moment'

export const RelatedList = ({ queueList, isSearch, AdvancedSearchOptions }) => {
  const { allTickets, loading } = useSelector((state) => state?.tickets)
  const departmentsLoading = useSelector((state) => state?.departments?.loading)
  const { deptId } = useParams()
  const tickets = allTickets

  const currentRoute = ({ id = '' }) =>
    `/client/dashboard/support/tickets/details/${id}`

  const { userModules } = useSelector((state) => state?.modules)

  const { permissions } = checkModule({
    module: 'Support',
    modules: userModules,
  })

  // Setting data properly
  const [data, setData] = useState([])
  useEffect(() => {
    setData([])
    if (tickets?.length) {
      const dataToSet = tickets?.map((b) => {
        return {
          ...b,
          key: b?.id,
        }
      })
      const trueFirst = dataToSet
        ?.sort(
          (a, b) =>
            new Date(b?.lastModifiedOn).getTime() -
            new Date(a?.lastModifiedOn).getTime()
        )
        ?.sort((a, b) =>
          a?.pinTicket === b?.pinTicket ? 0 : a?.pinTicket ? -1 : 1
        )

      setData(trueFirst)
    }
  }, [tickets])

  const navigate = useNavigate()

  const columns = [
    {
      title: 'Ticket NO.',
      dataIndex: 'ticketNumber',
      key: 'ticketNumber',
      sorter: (a, b) => (a?.ticketNumber < b?.ticketNumber ? -1 : 1),
    },
    {
      title: 'Subject',
      dataIndex: 'ticketTitle',
      key: 'ticketTitle',
      sorter: (a, b) => (a?.ticketTitle < b?.ticketTitle ? -1 : 1),
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastModifiedOn',
      key: 'lastModifiedOn',
      sorter: (a, b) => (a?.lastModifiedOn < b?.lastModifiedOn ? -1 : 1),
      render: (lastModifiedOn) =>
        moment(lastModifiedOn).format('MM/DD/YYYY hh:mm:ss a'),
    },
    {
      title: 'Status',
      dataIndex: 'ticketStatus',
      key: 'ticketStatus',
      sorter: (a, b) => (a?.ticketStatus < b?.ticketStatus ? -1 : 1),
      render: (status) => {
        // 0: active, 1: waiting, 2: closed, 3: closed and locked
        if (status === 0) {
          return (
            <span className="py-[4px] px-[8px] rounded uppercase bg-[#212E48] text-[#3699FF]">
              active
            </span>
          )
        }

        if (status === 1) {
          return (
            <span className="py-[4px] px-[8px] rounded uppercase bg-[#2F264F] text-[#8950FC]">
              waiting
            </span>
          )
        }

        if (status === 2) {
          return (
            <span className="py-[4px] px-[8px] rounded uppercase bg-[#3A2434] text-[#F64E60]">
              closed
            </span>
          )
        }

        if (status === 3) {
          return (
            <span className="py-[4px] px-[8px] rounded uppercase bg-[#3A2434] text-[#F64E60]">
              closed and locked
            </span>
          )
        }
      },
    },
  ]
  const dispatch = useDispatch()

  const [visible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [popup] = useState(null)

  useEffect(() => {
    ;(async () => {
      await dispatch(getLoggedInUserAssignTickets())
      await dispatch(getUsers())
      await dispatch(getClients())
    })()
  }, [dispatch, deptId])

  useEffect(() => {
    ;(async () => {
      await dispatch(getUsers())
      await dispatch(getClients())
    })()
  }, [])

  const [values, setValues] = useState({
    ...AdvancedSearchOptions?.searchValues,
  })
  const [searchResults, setSearchResults] = useState('')

  useEffect(() => {
    ;(async () => {
      await dispatch(getLoggedInUserAssignTickets())
    })()
  }, [dispatch])

  useEffect(() => {
    if (!isSearch && data?.length) {
      navigate(`/client/dashboard/support/tickets/details/${data[0]?.id}`)
    } else if (!isSearch && data?.length < 1) {
      navigate(`/client/dashboard/support/tickets/list`)
    }
  }, [data])

  //Advanced Search
  const inputChangeHandler = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const searchTicketHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const defaultData = {
      keyword: values?.title ? values?.title : null,
      pageNumber: 0,
      pageSize: values?.numResult ? parseInt(values?.numResult) : 3,
      orderBy: [''],
      ticketStatus: values.status ? parseInt(values.status) : null,
      assignedTo: values?.admin ? values?.admin : null,
      ticketNo: values?.ticketNo ? parseInt(values?.ticketNo) : null,
      ticketPriority: values.priority ? parseInt(values.priority) : null,
      clientEmail: values?.email ? values?.email : null,
      clientId: values?.client ? values?.client : null,
      createdOn: values?.dateAdded ? values?.dateAdded : null,
      departmentId: values?.department ? values?.department : null,
    }
    const { url } = getTicketsConfig()
    const res = await axios.post(url, defaultData)
    setIsLoading(false)
    if (res.status === 200) {
      setSearchResults(res?.data?.data?.length)
      setData(res?.data?.data)
    }
  }

  return (
    <>
      <div className={`p-[40px] bg-[#1E1E2D] rounded-[8px] mt-2`}>
        {searchResults !== '' && (
          <div className="text-[#fff] text-md font-medium text-right">
            {searchResults === 0
              ? 'No tickets found for your search queries'
              : `
          Total tickets matching search queries found : ${searchResults}`}
          </div>
        )}

        {isSearch && (
          <TicketSearch
            AdvancedSearchOptions={AdvancedSearchOptions}
            values={values}
            setValues={setValues}
            OnChange={inputChangeHandler}
            onSubmit={searchTicketHandler}
            isLoading={isLoading}
          />
        )}
      </div>

      <div className={`p-[40px] bg-[#1E1E2D] rounded-[8px] mt-2`}>
        {isLoading || loading || departmentsLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Spin spinning={isLoading || loading || departmentsLoading} />
          </div>
        ) : (
          <div>
            <Table
              columns={columns}
              loading={isLoading || loading || departmentsLoading}
              data={data}
              fieldToFilter="id"
              permissions={permissions}
              additionalBtns={[{
                text: 'Start Ticket',
                onClick: () => {
                  navigate('/client/dashboard/support/tickets/generate-ticket');
                }
              }]}
              editAction={(record) => (
                <>
                  <Button
                    onClick={() => navigate(currentRoute({ id: record?.id }))}
                  >
                    View Details
                  </Button>
                </>
              )}
              onRow={(record) => {
                return {
                  onClick: () => {
                    navigate(currentRoute({ id: record?.id }))
                  },
                }
              }}
            />
            <TicketMenu {...popup} visible={visible} />
          </div>
        )}
      </div>
    </>
  )
}
