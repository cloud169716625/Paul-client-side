import { message } from 'antd'
import { Priority } from 'components'
import { AssignTicket, FollowUp, Status } from 'components/TicketModals'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTicket } from 'store'
import {
  getUsersByDepartmentID,
  getTicketById,
  getTickets,
  editTicket,
} from 'store'
import './index.scss'

export const TicketMenu = ({ visible, options, record, x, y }) => {
  const [showPriority, setShowPriority] = useState(false)
  const [assign, setAssign] = useState(false)
  const [followup, setFollowUp] = useState(false)
  const [status, setStatus] = useState(false)

  const dispatch = useDispatch()

  const defaultOptions = [
    {
      label: 'Transfer',
      onClick: async (record) => {
        setAssign(true)
        await dispatch(getTicketById(record?.id))
        await dispatch(getUsersByDepartmentID({ id: record?.departmentId }))
      },
    },
    {
      label: 'Status',
      onClick: async (record) => {
        setStatus(true)
        await dispatch(getTicketById(record?.id))
      },
    },
    {
      label: 'Follow-Up',
      onClick: async (record) => {
        setFollowUp(true)
        await dispatch(getTicketById(record?.id))
      },
    },
    {
      label: 'Priority',
      onClick: async (record) => {
        setShowPriority(true)
        await dispatch(getTicketById(record?.id))
      },
    },
    {
      label: 'Pin',
      onClick: async (record) => {
        await dispatch(editTicket({ data: { ...record, pinTicket: true } }))
        await dispatch(getTickets())
        message.success('Ticket Pinned')
      },
    },
    {
      label: 'Delete',
      onClick: async (record) => {
        await dispatch(deleteTicket(record?.id))
      },
    },
  ]

  const finalOptions = options?.length ? options : defaultOptions
  return (
    <>
      <Priority show={showPriority} setShow={setShowPriority} id={record?.id} />
      <FollowUp show={followup} setShow={setFollowUp} id={record?.id} />
      <AssignTicket show={assign} setShow={setAssign} id={record?.id} />
      <Status show={status} setShow={setStatus} id={record?.id} />
      <ul
        className={`popup ${visible ? '' : 'hidden'}`}
        style={{ left: `${x}px`, top: `${y}px` }}
      >
        {finalOptions?.map((option) => {
          return (
            <li onClick={() => option?.onClick(record)} key={option?.label}>
              {option?.label}
            </li>
          )
        })}
      </ul>
    </>
  )
}
