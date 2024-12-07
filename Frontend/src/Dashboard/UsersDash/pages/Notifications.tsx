import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotificationPanel({ setUnreadCount }) {

  const [activeTab, setActiveTab] = React.useState('Inbox');
  const [notifications, setNotifications] = React.useState([
    { id: 1, avatar: "https://placehold.co/40x40", name: "Polly", action: "edited", target: "Contact page", time: "36 mins ago", company: "Craftwork Design", unread: true },
    { id: 2, avatar: "https://placehold.co/40x40", name: "James", action: "left a comment on", target: "ACME 2.1", time: "2 hours ago", company: "ACME", unread: true },
    { id: 3, avatar: "https://placehold.co/40x40", name: "Mary", action: "shared the file", target: "Isometric 2.0", time: "3 hours ago", company: "Craftwork Design", unread: true },
    { id: 4, avatar: "https://placehold.co/40x40", name: "Dima Phizeg", action: "edited", target: "ACME 2.1", time: "3 hours ago", company: "ACME", attachment: "ACME_guideline.pdf", unread: false },
    { id: 5, avatar: "https://placehold.co/40x40", name: "James", action: "created Changelog page for", target: "Blank", time: "1 day ago", company: "Blank", unread: false },
  ]);

  // Calculate unread count and set it in Nav component
  useEffect(() => {
    const count = notifications.filter(notification => notification.unread).length;
    setUnreadCount(count);
  }, [notifications, setUnreadCount]);

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, unread: false }))
    );
  };

  const navigate = useNavigate();

  const handleNotificationClick = (notification) => {
    navigate("/user-dashboard/notifications-page",  { state: { notifications } });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg w-96 p-4">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <button onClick={markAllAsRead} className="text-blue-500 text-sm">Mark all as read</button>
      </div>

      <div className="flex space-x-4 my-4">
        {["Inbox", "General", "Archived"].map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(tab)}
            className={`font-medium ${activeTab === tab ? "text-black" : "text-gray-400"}`}
          >
            {tab} {tab === 'Inbox' && <span className="bg-black text-white px-2 py-0.5 rounded-full text-xs ml-1">{notifications.filter(n => n.unread).length}</span>}
          </button>
        ))}
      </div>

      <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-h-80 space-y-3">
        {notifications.map((notification) => (
          <div key={notification.id}
          onClick={() => handleNotificationClick(notification)} className={`flex items-start p-3 rounded-lg cursor-pointer ${notification.unread ? "bg-gray-100 border border-cyan-500" : "bg-white"} hover:bg-gray-200`}>
            <img src={notification.avatar} alt={`${notification.name}'s avatar`} className="w-10 h-10 rounded-full" />
            <div className="ml-3 flex-1">
              <p className="text-sm">
                <span className="font-semibold">{notification.name}</span> {notification.action} <span className="font-semibold">{notification.target}</span>
              </p>
              <p className="text-xs text-gray-500">{notification.time} • {notification.company}</p>
              {notification.attachment && <p className="text-xs text-blue-500 mt-1">{notification.attachment}</p>}
            </div>
            {notification.unread && <span className="w-2 h-2 bg-purple-500 rounded-full ml-2 mt-1"></span>}
          </div>
        ))}
      </div>
    </div>
  )}
