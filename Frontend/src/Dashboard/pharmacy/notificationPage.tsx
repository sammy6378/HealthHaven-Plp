import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Notification {
  id: string;
  name: string;
  action: string;
  target: string;
  time: string;
  company: string;
  avatar: string;
  unread: boolean;
  attachment?: string;
}

const dummyNotifications: Notification[] = [
  {
    id: "1",
    name: "John Doe",
    action: "commented on",
    target: "your post",
    time: "2 hours ago",
    company: "ABC Corp",
    avatar: "/logo.ico",
    unread: true,
    attachment: "attachment_1.pdf",
  }
];

export default function Notifications({ setUnreadCount }: { setUnreadCount: React.Dispatch<React.SetStateAction<number>> }) {
  const location = useLocation();
  const { selectedNotificationId } = location.state || {};
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
 

  useEffect(() => {
    const socket = io("http://localhost:8000");

    socket.on("prescriptions", (message) => {
      const formattedMessage = {
        id: message.id, 
        name: message.doctor_id, 
        action: `prescribed medication for ${message.patient_id}`,
        target: `Dosage: ${message.dosage}`, 
        time: new Date().toLocaleTimeString(), 
        company: "Harar Hospital",
        avatar: "/logo.ico", 
        unread: true,
        attachment: message.notes,
      };

       // Trigger toast for the new message
       toast.info(`New message from ${formattedMessage.name}`);

      setNotifications((prevNotifications) => {
        const unreadNotifications = [...prevNotifications, formattedMessage];
       
        // Calculate unread count and update
        const newUnreadCount = unreadNotifications.filter((n) => n.unread).length;
        setUnreadCount(newUnreadCount);
        return unreadNotifications;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (selectedNotificationId) {
      const notification = notifications.find((n) => n.id === selectedNotificationId);
      setSelectedNotification(notification || null);
    }
  }, [selectedNotificationId, notifications]);

  const handleMarkAsDone = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, unread: false } : notification
      )
    );
    setUnreadCount(notifications.filter((n) => n.unread).length - 1);
  };



  return (
    <>
    <Helmet>
      <title>Telemedicine - Notifications Panel</title>
    </Helmet>
    <ToastContainer />
    <div className="flex flex-col h-full">
  <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4 sm:mb-6 text-center">Notifications Panel</h2>
  <div className="flex flex-col lg:flex-row h-full">
    {/* Notifications List on the Left */}
    <div className="lg:w-1/3 w-full p-4 overflow-y-auto h-64 lg:h-auto bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          onClick={() => setSelectedNotification(notification)}
          className={`flex items-start p-3 rounded-lg mt-2 cursor-pointer ${
            notification.unread ? "bg-gray-100 border border-cyan-500" : "bg-white"
          } hover:bg-gray-200`}
        >
          <img
            src={notification.avatar}
            alt={`${notification.name}'s avatar`}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3 flex-1">
            <p className="text-sm">
              <span className="font-semibold">{notification.name}</span> {notification.action}{" "}
              <span className="font-semibold">{notification.target}</span>
            </p>
            <p className="text-xs text-gray-500">
              {notification.time} • {notification.company}
            </p>
          </div>
          {notification.unread && <span className="w-2 h-2 bg-purple-500 rounded-full ml-2 mt-1"></span>}
        </div>
      ))}
    </div>

    {/* Selected Notification Details on the Right */}
    <div className="lg:w-2/3 w-full p-4 rounded shadow-lg">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Selected Notification</h3>
      {selectedNotification ? (
        <div>
          <p className="text-sm">
            <span className="font-semibold">{selectedNotification.name}</span> {selectedNotification.action}{" "}
            <span className="font-semibold">{selectedNotification.target}</span>
          </p>
          <p className="text-xs text-gray-500">
            {selectedNotification.time} • {selectedNotification.company}
          </p>
          {selectedNotification.attachment && (
            <p>
              <strong>Attachment:</strong> {selectedNotification.attachment}
            </p>
          )}
          {/* Button to mark notification as done */}
          <button
            onClick={() => handleMarkAsDone(selectedNotification.id)}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Mark as Done
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Select a notification to view details.</p>
      )}
    </div>
  </div>
</div>

    </>
  );
}
