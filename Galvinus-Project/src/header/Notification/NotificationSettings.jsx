import { useContext } from "react";
import { NotificationContext } from '../../contexts/NotificationContext';
import './NotificationSettings.css'; // Import the CSS file

const NotificationSettings = () => {
  const { notifications, isOnline, markAsRead } = useContext(NotificationContext);

  return (
    <div className="notification-settings-container">
      <h1 className="notification-settings-title">Notification Service</h1>
      <p className="notification-settings-status">Status: {isOnline ? "Online" : "Offline"}</p>

      {/* Notifications List */}
      <h2 className="notification-settings-history-title">Notifications</h2>
      <ul className="notification-settings-list">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={`notification-settings-item ${
              notification.isRead ? "notification-settings-item-read" : "notification-settings-item-unread"
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <strong>{notification.type}</strong>: Order {notification.orderId} created at{" "}
            {notification.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationSettings;