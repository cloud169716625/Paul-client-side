import { useDispatch, useSelector } from 'react-redux';
import {
  CheckCircleOutlined,
  FieldTimeOutlined,
  PushpinOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import { Table } from 'components';
// import { Ticket as TicketIcon } from 'icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkModule } from 'lib/checkModule';
import './styles.scss';
import {
  getTicketsByAdminID,
  getTickets,
  getTicketsByDepartmentId,
} from 'store';
import { getUsers } from 'store';
import { getClients } from 'store';
import { Spin } from 'antd';
import Popup from './Components/Menu.component';

export const RelatedList = () => {
  const location = useLocation();
  const { allTickets, departmentTickets, loading } = useSelector(
    (state) => state?.tickets
  );
  const userTickets = useSelector((state) => state?.tickets?.tickets);
  const { clients, users } = useSelector((state) => state?.users);
  const { departments } = useSelector((state) => state?.departments);
  const usersLoading = useSelector((state) => state?.users?.loading);
  const departmentsLoading = useSelector(
    (state) => state?.departments?.loading
  );

  const tickets = location?.pathname?.includes('show-all')
    ? allTickets
    : location?.pathname.includes('by-department')
    ? departmentTickets
    : userTickets;

  const currentRoute = ({ deptId = '', id = '' }) =>
    location?.pathname?.includes('show-all')
      ? `/admin/dashboard/support/tickets/show-all/list/details/${id}`
      : location?.pathname.includes('by-department')
      ? `/admin/dashboard/support/tickets/by-departments/${deptId}/details/${id}`
      : `/admin/dashboard/support/tickets/list/details/${id}`;

  const { userModules } = useSelector((state) => state?.modules);

  const { permissions } = checkModule({
    module: 'Support',
    modules: userModules,
  });

  // Setting data properly
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([]);
    if (tickets.length) {
      const dataToSet = tickets
        ?.filter(function (el) {
          return el.ticketStatus === 0;
        })
        .map((b) => {
          return {
            ...b,
            key: b?.id,
          };
        });
      setData(dataToSet);
    }
  }, [tickets]);

  const navigate = useNavigate();

  const columns = [
    {
      title: 'Status | Follow Up | High Priority | Pinned',
      dataIndex: 'actions',
      key: 'actions',
      // render: (key) => {
      //   if (key === 0) {
      //     return 'Active';
      //   } else if (key === 1) {
      //     return 'Closed';
      //   } else if (key === '2') {
      //     return 'Disabled';
      //   }
      // },
      render: (text, record) => {
        return (
          <div className="flex items-center gap-[12px]">
            <div className="action-icon">
              <CheckCircleOutlined />
            </div>
            <div className="action-icon action-icon-active">
              <FieldTimeOutlined />
            </div>
            <div className="action-icon">
              <RiseOutlined />
            </div>
            <div className="action-icon">
              <PushpinOutlined />
            </div>
          </div>
        );
      },
    },
    {
      title: 'Subject',
      dataIndex: 'ticketTitle',
      key: 'ticketTitle',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (text) => {
        const client = clients?.find((client) => client?.id === text);
        const admin = users?.find((user) => user?.id === text);
        return client?.fullName
          ? client.fullName
          : admin?.fullName
          ? admin.fullName
          : 'N/A';
      },
    },
    {
      title: 'Department',
      dataIndex: 'departmentId',
      key: 'departmentId',
      render: (text) => {
        const department = departments?.find((dept) => dept?.id === text);
        return department?.name ? department?.name : 'N/A';
      },
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      render: (text) => {
        const admin = users?.find((user) => user?.id === text);
        return admin?.fullName ? admin.fullName : 'N/A';
      },
    },
    {
      title: 'Follow-Up',
      dataIndex: '',
      key: '',
    },
    {
      title: 'No. of Messages',
      dataIndex: '',
      key: '',
    },
    {
      title: 'Idle Time',
      dataIndex: '',
      key: '',
    },
  ];

  const { user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    (async () => {
      if (location?.pathname.includes('show-all')) {
        await dispatch(getTickets());
      } else if (location?.pathname?.includes('by-department')) {
        getTicketsByDepartmentId({ id: location?.state?.departmentId });
      } else {
        await dispatch(getTicketsByAdminID({ id: user?.id }));
      }
      await dispatch(getUsers());
      await dispatch(getClients());
    })();
  }, [dispatch]);
  return (
    <div className={`p-[40px] bg-[#1E1E2D] rounded-[8px]`}>
      {loading || departmentsLoading || usersLoading ? (
        <div className="w-full flex items-center justify-center min-h-[400px]">
          <Spin spinning />
        </div>
      ) : (
        <div>
          <Table
            columns={columns}
            data={data}
            fieldToFilter="id"
            permissions={permissions}
            hideActions={true}
            customFilterSort={<></>}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  navigate(
                    currentRoute({
                      deptId: record?.departmentId,
                      id: record?.id,
                    })
                  );
                }, // click row
                onDoubleClick: (event) => {}, // double click row
                onContextMenu: (event) => {
                  event.preventDefault();
                  if (!visible) {
                    document.addEventListener(
                      `click`,
                      function onClickOutside() {
                        setVisible(false);
                        document.removeEventListener(`click`, onClickOutside);
                      }
                    );
                  }
                  setVisible(true);
                  setPopup({
                    record,
                    x: event.clientX,
                    y: event.clientY,
                  });
                }, // right button click row
                onMouseEnter: (event) => {}, // mouse enter row
                onMouseLeave: (event) => {}, // mouse leave row
              };
            }}
            // headingTitle={}
            // t={t}
          />
          {visible ? <Popup {...popup} /> : null}
        </div>
      )}
    </div>
  );
};
