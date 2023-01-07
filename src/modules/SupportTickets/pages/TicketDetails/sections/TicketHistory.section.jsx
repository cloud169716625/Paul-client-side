import { Table } from 'components';
import moment from 'moment';
import { Spin } from 'antd';
import { checkModule } from 'lib/checkModule';
import { useSelector } from 'react-redux';
import './styles.scss';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
  (el) => {
    return {
      eventDate: moment().format('MM/DD/YYYY hh:mm:ss a'),
      user: `Sam T. ${el}`,
      description: 'Every Event of Ticket (i.e. Status change, forwarded, etc.',
      details: 'Active',
    };
  }
);

const columns = [
  {
    title: 'Event Date',
    dataIndex: 'eventDate',
    key: 'eventDate',
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Details',
    dataIndex: 'details',
    key: 'details',
  },
];

export const TicketHistory = () => {
  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: 'Support',
    modules: userModules,
  });

  return (
    <div className={`bg-[#1E1E2D] rounded-[8px] mt-[32px]`}>
      {false ? (
        <div className="w-full flex items-center justify-center min-h-[400px]">
          <Spin spinning />
        </div>
      ) : (
        <div className="ticket-history-table">
          <Table
            columns={columns}
            data={data}
            fieldToFilter="id"
            permissions={permissions}
            hideActions={true}
            customFilterSort={<></>}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {}, // click row
                onDoubleClick: (event) => {}, // double click row
                onContextMenu: (event) => {}, // context menu
              };
            }}
          />
        </div>
      )}
    </div>
  );
};
