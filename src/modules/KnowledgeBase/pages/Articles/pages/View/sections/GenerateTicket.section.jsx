import { Spin } from 'antd'
import { EditorState, convertToRaw } from 'draft-js'
import { convertToHTML } from 'draft-convert'
import { Button, ConfigurationEditor, Input } from 'components'
import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { Ticket as TicketIcon } from 'icons'
import {
  getUsers,
  getClients,
  createTicket,
  getCurrentOnlineUsers,
} from 'store'
import { useQuery } from 'components/TicketDetails/sections/Details/Details.section'

const validationSchema = Yup.object().shape({
  ticketTitle: Yup.string().required('Ticket title is required'),
  description: Yup.string().required('Ticket description is required'),
  departmentId: Yup.string().required('Department is required'),
})

export const GenerateTicket = ({ isAdmin }) => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const query = useQuery()
  const clientId = query.get('client')
  const { loading, users, onlineUsers } = useSelector(
    (state) => state?.users
  )
  const { departments } = useSelector((state) => state?.departments)
  const departmentLoading = useSelector((state) => state?.departments?.loading)
  const { user } = useSelector((state) => state?.auth)

  useEffect(() => {
    dispatch(getClients())
    dispatch(getUsers())
    dispatch(getCurrentOnlineUsers())
  }, [])

  let departmentsData = [{ value: '', label: 'Select Department' }]
  departments?.forEach((departments) => {
    departmentsData.push({
      value: departments?.id,
      label: departments?.name,
    })
  })

  return (
    <div className="bg-[#1E1E2D] mt-[32px] p-[32px] rounded-[8px] ">
      <div className="flex">
        <div className="w-[80px] flex items-center">
          <div className="w-[80px] h-[80px] rounded bg-[#1C3238] tick p-[20px]">
            <TicketIcon />
          </div>
        </div>
        <div className="ml-[20px] flex items-center">
          <h3 className={'text-[24px] text-[#fff]'}>Notified Users</h3>

          <div className="mt-[8px] text-[#474761] flex items-center gap-[12px]"></div>
        </div>
      </div>
      <Spin spinning={loading || departmentLoading}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            assignTo: '',
            status: 0,
            priority: 1,
            ticketTitle: '',
            description: '',
            bodyHolder: EditorState.createEmpty(),
            departmentId: '',
            clientId: clientId ? clientId : '',
            incomingFromClient: false,
          }}
          enableReinitialize
          onSubmit={async (values) => {
            setIsLoading(true)
            const final = {
              assignedTo: user?.id,
              ticketStatus: Number(values?.status),
              ticketPriority: Number(values?.priority),
              ticketTitle: values?.ticketTitle,
              clientId: user?.id,
              description: values?.description,
              ticketRelatedTo: isAdmin ? 1 : 0,
              ticketRelatedToId: user?.id,
              departmentId: values?.departmentId,
              incomingFromClient: true,
            }
            await dispatch(createTicket({ data: final }))
            setIsLoading(false)
            navigate('/client/dashboard/support/tickets/list')
          }}
        >
          {({ values, errors, touched, setFieldValue, setFieldTouched }) => {
            let usersData = [{ label: 'Auto Assign', value: '' }]
            if (values?.departmentId) {
              usersData = []
              users
                ?.filter((user) =>
                  user?.departmentIds?.includes(values?.departmentId)
                )
                ?.forEach((user) => {
                  const isOnline = onlineUsers?.find(
                    (admin) => admin?.userId === user?.id
                  )
                    ? true
                    : false
                  usersData.push({
                    value: user?.id,
                    label: user?.fullName
                      ? `${user?.fullName}${isOnline ? '  (Online)' : ''}`
                      : 'N/A',
                    isActive: isOnline ? true : false,
                  })
                })
            } else {
              usersData = [
                { label: 'Please select department first', value: '' },
              ]
            }
            return (
              <Form>
                <div className="mt-[40px] flex gap-[16px] mb-[20px]">
                  <Input
                    options={departmentsData}
                    type="select"
                    name="departmentId"
                    label="Select Department..."
                  />

                  <Input
                    options={[
                      { label: 'Low', value: 0 },
                      { label: 'Normal', value: 1 },
                      { label: 'High', value: 2 },
                    ]}
                    type="select"
                    name="priority"
                    label="Priority"
                  />
                </div>

                <div className="mb-[20px]">
                  <Input
                    type="text"
                    name="ticketTitle"
                    placeholder="Enter Subject..."
                    label="Subject"
                  />
                </div>

                <div className="mb-[20px]">
                  <div className="flex items-center justify-between pt-4 pr-5">
                    <label className="ml-2 text-white text-[14px]">
                      Description
                    </label>
                  </div>
                  <ConfigurationEditor
                    editorState={values.bodyHolder}
                    placeholder="Enter Short Description..."
                    onBlur={() => setFieldTouched('description', true)}
                    onEditorStateChange={(state) => {
                      setFieldValue('bodyHolder', state)
                      const currentContentAsHTML = convertToHTML({
                        entityToHTML: (entity, originalText) => {
                          if (entity.type === 'IMAGE') {
                            return `<img src="${entity.data.src}" />`
                          }
                          if (entity.type === 'LINK') {
                            return ` <a href="${entity.data.url}">${originalText}</a> `
                          }
                          return originalText
                        },
                      })(state.getCurrentContent())
                      if (
                        convertToRaw(state.getCurrentContent()).blocks
                          .length === 1 &&
                        convertToRaw(state.getCurrentContent()).blocks[0]
                          .text === ''
                      ) {
                        setFieldValue('description', '')
                      } else {
                        setFieldValue('description', currentContentAsHTML)
                      }
                    }}
                  />
                  {touched['description'] && errors['description'] && (
                    <div className="error whitespace-nowrap ml-[32px] mb-[16px] w-[20%]">
                      {errors['description']}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-[12px]">
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isLoading}
                    className="w-[fit_content] h-[55px] mr-[20px]"
                  >
                    {isLoading ? 'Starting...' : 'Start Ticket'}
                  </Button>

                  <p className="text-[#474761]">
                    All attachments should be included as links and can not be
                    uploaded to the ticket.
                  </p>
                </div>
              </Form>
            )
          }}
        </Formik>
      </Spin>
    </div>
  )
}
