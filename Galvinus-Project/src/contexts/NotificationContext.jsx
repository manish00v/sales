import { createContext, useState, useEffect } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [ws, setWs] = useState(null);

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(savedNotifications);
  }, []);

  // Save to localStorage when notifications change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // WebSocket connection management
  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080');
  
    websocket.onopen = () => {
      console.log('WebSocket connection established');
      // Send a test message to verify connection
      websocket.send(JSON.stringify({
        type: 'connection_test',
        message: 'Frontend connected'
      }));
    };
  
    websocket.onmessage = (event) => {
      console.log('Raw WebSocket message:', event.data); // Log raw data first
      try {
        const data = JSON.parse(event.data);
        console.log('Parsed notification:', data);
        
        const newNotification = {
          id: data.id || Date.now(),
          type: data.type || 'general',
          service: data.service || 'unknown-service',
          orderId: data.metadata?.orderId || data.data?.orderId || 'N/A',
          message: data.message || 'New notification',
          timestamp: new Date(data.timestamp || new Date()).toLocaleString(),
          isRead: false
        };
  
        setNotifications(prev => [newNotification, ...prev]);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    websocket.onclose = () => {
      console.log('WebSocket disconnected');
      setWs(null);
    };

    return () => {
      websocket.close();
    };
  }, []);

  // Network status detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        isOnline,
        ws,
        markAsRead
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};