import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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

export default function NotificationsPage() {
  const location = useLocation();
  const { notifications, selectedNotificationId } = location.state || {};

  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (notifications && selectedNotificationId) {
      const notification = notifications.find(n => n.id === selectedNotificationId);
      setSelectedNotification(notification);
    }
  }, [notifications, selectedNotificationId]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setChatMessages([...chatMessages, message]);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Notifications List on the Left */}
      <div className="w-full lg:w-1/3 bg-gray-100 p-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => setSelectedNotification(notification)}
            className={`flex items-start p-3 rounded-lg mt-2 cursor-pointer ${notification.unread ? "bg-gray-100 border border-cyan-500" : "bg-white"} hover:bg-gray-200`}
          >
            <img src={notification.avatar} alt={`${notification.name}'s avatar`} className="w-10 h-10 rounded-full" />
            <div className="ml-3 flex-1">
              <p className="text-sm">
                <span className="font-semibold">{notification.name}</span> {notification.action} <span className="font-semibold">{notification.target}</span>
              </p>
              <p className="text-xs text-gray-500">{notification.time} • {notification.company}</p>
            </div>
            {notification.unread && <span className="w-2 h-2 bg-purple-500 rounded-full ml-2 mt-1"></span>}
          </div>
        ))}
      </div>

      {/* Selected Notification Details on the Right */}
      <div className="w-full lg:w-2/3 p-4 rounded shadow-lg mt-4 lg:mt-0">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Selected Notification</h3>
        {selectedNotification ? (
          <div className="ml-3 flex-1">
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
          </div>
        ) : (
          <p>Select a notification to view details.</p>
        )}

        {/* Chat System */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Chat</h3>
          <div className="flex flex-col space-y-4 mt-4 h-48 overflow-y-auto p-3 border-t-2 border-gray-200">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
                <div
                  className={`p-3 max-w-xs rounded-lg ${
                    index % 2 === 0 ? "bg-blue-200 text-left" : "bg-green-200 text-right"
                  }`}
                >
                  <p>{msg}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your reply..."
              className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
