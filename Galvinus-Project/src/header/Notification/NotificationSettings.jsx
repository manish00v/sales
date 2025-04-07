import { useContext } from "react";
import { NotificationContext } from '../../contexts/NotificationContext';
import './NotificationSettings.css';

const NotificationSettings = () => {
  const { notifications, isOnline, markAsRead } = useContext(NotificationContext);

  const formatTime = (timestamp) => {
    try {
      return new Date(timestamp).toLocaleTimeString();
    } catch (e) {
      return new Date().toLocaleTimeString();
    }
  };

  return (
    <div className="notification-settings-container">
      <h1 className="notification-settings-title">Notification </h1>
      
      <div className="status-indicator">
        <span className={`status-dot ${isOnline ? 'online' : 'offline'}`}></span>
        {isOnline ? 'Connected' : 'Offline'}
      </div>

      <div className="notification-list">
        {notifications.length === 0 ? (
          <p className="empty-state">
            {isOnline ? 'Waiting for notifications...' : 'Offline - Notifications paused'}
          </p>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification.id}
              className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="notification-header">
                <span className="notification-service">
                  {notification.service?.toUpperCase() || 'SYSTEM'}
                </span>
                <span className="notification-time">
                  {formatTime(notification.timestamp)}
                </span>
              </div>
              <div className="notification-type">
                {notification.type?.toUpperCase() || 'NOTIFICATION'}
              </div>
              <div className="notification-message">
                {notification.message || 'New notification'}
                {notification.orderId && notification.orderId !== 'N/A' && (
                  <span className="order-id"> (Order: {notification.orderId})</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationSettings;