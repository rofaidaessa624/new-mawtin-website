import React, { useState, useEffect } from 'react';
import api from '../services/api';

// SVG Icons
const BellIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

const CheckCircleIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CurrencyDollarIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ExclamationTriangleIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

const MegaphoneIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
);

const NotificationBell = ({ notifications = [] }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [notifs, setNotifs] = useState(notifications);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, []);

   const fetchNotifications = async () => {
    try {
        const token = localStorage.getItem('user_token');

        const res = await api.get('/notifications', {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (res?.data?.success) {

            const list = res.data.data || [];

            setNotifs(Array.isArray(list) ? list : []);
            setUnreadCount(res.data.unread_count || 0);
        }
    } catch (e) {
        console.error('Error fetching notifications:', e);
    }
};

    const markAsRead = async (id) => {
        try {
            const token = localStorage.getItem('user_token');
            await api.post(`/notifications/${id}/read`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifs(prev => prev.map(n => n.id === id ? { ...n, is_read: 1 } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (e) {
            console.error(e);
        }
    };

    const markAllAsRead = async () => {
        try {
            const token = localStorage.getItem('user_token');
            await api.post('/notifications/read-all', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifs(prev => prev.map(n => ({ ...n, is_read: 1 })));
            setUnreadCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    const isUnread = (notif) => notif.is_read === 0 || notif.is_read === false;

    const getTypeColor = (type) => {
        switch(type) {
            case 'success': return 'text-emerald-400';
            case 'warning': return 'text-yellow-400';
            case 'installment': return 'text-blue-400';
            default: return 'text-gray-400';
        }
    };

    const getTypeIcon = (type) => {
        switch(type) {
            case 'success': return <CheckCircleIcon />;
            case 'installment': return <CurrencyDollarIcon />;
            case 'warning': return <ExclamationTriangleIcon />;
            default: return <MegaphoneIcon />;
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative p-2 rounded-lg hover:bg-gray-700 transition"
            >
                <BellIcon className="w-6 h-6 text-white" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {unreadCount}
                    </span>
                )}
            </button>

            {showDropdown && (
                <>
                    {/* خلفية شفافة للقفل عند النقر بره */}
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowDropdown(false)}
                    ></div>
                    
                    <div className="absolute left-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                        <div className="flex justify-between items-center p-3 border-b border-gray-700 sticky top-0 bg-gray-800">
                            <h3 className="font-bold text-white">الإشعارات</h3>
                            {unreadCount > 0 && (
                                <button onClick={markAllAsRead} className="text-xs text-emerald-400 hover:text-emerald-300">
                                    تعليم الكل كمقروء
                                </button>
                            )}
                        </div>

                        {notifs.length === 0 ? (
                            <div className="p-6 text-center text-gray-400">
                                لا توجد إشعارات
                            </div>
                        ) : (
                            (Array.isArray(notifs) ? notifs : []).slice(0, 10).map((notif) => (
                                <div
                                    key={notif.id}
                                    onClick={() => markAsRead(notif.id)}
                                    className={`p-3 border-b border-gray-700 cursor-pointer transition ${
                                        isUnread(notif) ? 'bg-gray-700/50' : 'hover:bg-gray-700/30'
                                    }`}
                                >
                                    <div className="flex items-start gap-2">
                                        <span className={`mt-0.5 ${getTypeColor(notif.type)}`}>
                                            {getTypeIcon(notif.type)}
                                        </span>
                                        <div className="flex-1">
                                            <p className={`text-sm ${isUnread(notif) ? 'text-white font-semibold' : 'text-gray-300'}`}>
                                                {notif.title}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">{notif.message}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(notif.created_at).toLocaleDateString('ar-EG', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        {isUnread(notif) && (
                                            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-1 flex-shrink-0"></span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default NotificationBell;
