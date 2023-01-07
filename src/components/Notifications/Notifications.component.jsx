import { Drawer } from 'antd';
import './Notifications.styles.scss';
import {
  getNotificationIcon,
  getNotificationTarget,
  getNotificationType,
} from './service';

const Notification = ({ type, target }) => {
  return (
    <div className="grid grid-cols-[3fr_2fr]">
      <div className="flex items-center gap-[12px]">
        <div className="bg-[#323248] rounded-[50%] flex items-center justify-center p-[10.5px] h-[35px] w-[35px]">
          <img
            src={getNotificationIcon()}
            alt=""
            className="h-[18px] w-[18px]"
          />
        </div>
        {getNotificationType({ type })}
      </div>
      <div>{getNotificationTarget({ target })}</div>
    </div>
  );
};

const notifications = [
  { type: 0, target: 0 },
  { type: 3, target: 0 },
  { type: 4, target: 1 },
  { type: 0, target: 0 },
  { type: 3, target: 0 },
  { type: 8, target: 1 },
  { type: 4, target: 0 },
  { type: 5, target: 0 },
  { type: 6, target: 1 },
  { type: 3, target: 0 },
  { type: 2, target: 0 },
  { type: 1, target: 1 },
];

export const Notifications = ({ onClose, visible }) => {
  return (
    <Drawer
      width="50%"
      title="Notifications"
      placement="right"
      onClose={onClose}
      visible={visible}
      className="custom-drawer__drawer"
      // footer={
      //   <div className="flex items-center justify-center text-[#3699FF] text-[12px]">
      //     View All Notifications
      //   </div>
      // }
    >
      <div className="flex flex-col gap-[20px]">
        <div className="grid grid-cols-[3fr_2fr]">
          <div>Notification Type</div>
          <div>Target</div>
        </div>
        {notifications.map((notification, idx) => {
          return <Notification key={`notification-${idx}`} {...notification} />;
        })}
      </div>
    </Drawer>
  );
};
