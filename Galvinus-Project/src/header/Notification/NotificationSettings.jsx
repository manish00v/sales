import { useContext } from "react";
import { NotificationContext } from '../../contexts/NotificationContext';
import './NotificationSettings.css'; // Import the CSS file

const NotificationSettings = () => {
  const { notifications, isOnline, addNotification, markAsRead } =
    useContext(NotificationContext);

  // Simulate notification events
  const simulatePaymentConfirmed = () => {
    addNotification("Payment Confirmed", `Order #${Math.floor(Math.random() * 1000)}`);
  };

  const simulateOrderConfirmed = () => {
    addNotification("Order Confirmed", `Order #${Math.floor(Math.random() * 1000)}`);
  };

  const simulateDeliveryConfirmed = () => {
    addNotification("Delivery Confirmed", `Order #${Math.floor(Math.random() * 1000)}`);
  };

  return (
    <div className="notification-settings-container">
      <h1 className="notification-settings-title">Notification Service</h1>
      <p className="notification-settings-status">Status: {isOnline ? "Online" : "Offline"}</p>

      {/* Simulate Events */}
      <div className="notification-settings-buttons">
        <button onClick={simulatePaymentConfirmed} className="notification-settings-button">
          Simulate Payment Confirmed
        </button>
        <button onClick={simulateOrderConfirmed} className="notification-settings-button">
          Simulate Order Confirmed
        </button>
        <button onClick={simulateDeliveryConfirmed} className="notification-settings-button">
          Simulate Delivery Confirmed
        </button>
      </div>

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

      {/* Notification History */}
      <h2 className="notification-settings-history-title">Notification History</h2>
      <ul className="notification-settings-list">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className="notification-settings-history-item"
          >
            <strong>{notification.type}</strong>: Order {notification.orderId} created at{" "}
            {notification.timestamp} - {notification.isRead ? "Read" : "Unread"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationSettings;