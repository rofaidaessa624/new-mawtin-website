import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import NotificationBell from '../components/NotificationBell';
import InstallmentsTable from '../components/InstallmentsTable';
import UnitUpdates from '../components/UnitUpdates';
import { requestForToken, onMessageListener } from '../firebase';



// SVG Icon Components
const BarChartIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);
const HomeIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);
const CurrencyIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const PhoneIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);
const CogIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const MailIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);
const ChatIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);
const TrendingUpIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);
const CreditCardIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);
const ClipboardIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
);
const CalendarIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);
const RefreshIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
);
const MegaphoneIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
);
const LogoutIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);
const WarningIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);
const XIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const BASE_URL = 'https://api.mawtin.net';

// دالة تنظيف رابط الصورة - مصلحة بالكامل
const getImageUrl = (path) => {
    if (!path) return '';

    if (path.startsWith('http')) {
        return path;
    }

    path = path.replace(/\\/g, '/');

    if (path.startsWith('/storage/')) {
        return `${BASE_URL}${path}`;
    }

    return `${BASE_URL}/storage/${path}`;
};
const UserDashboard = ({ user, onLogout }) => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activePage, setActivePage] = useState('dashboard');
    const [lightboxImg, setLightboxImg] = useState(null); // lightbox للصور
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboard();
requestForToken().then(async (token) => {

    if (token) {

        const authToken = localStorage.getItem('user_token');

        await api.post('/save-device-token', {
            device_token: token
        }, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });

    }

});

// الاستماع للإشعارات الواردة لما التطبيق مفتوح (Foreground)
const listenToMessages = () => {
onMessageListener().then((payload) => {
     if (payload?.notification?.title) {
    new Notification(payload.notification.title, {
        body: payload.notification.body || '',
                icon: '/favicon.svg',
            });
        }
        // إعادة الاستماع بعد كل رسالة
        listenToMessages();
    }).catch((err) => console.error('FCM listener error:', err));
};
listenToMessages();
    }, []);

    const fetchDashboard = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('user_data'));
            const token = localStorage.getItem('user_token');

            if (!userData || !token) {
                onLogout();
                navigate('/');
                return;
            }

            const response = await api.get('/user/dashboard', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

//             const response = await axios.post(
//   `${this.API_BASE_URL}/api/v1/unit-updates`,
//   updateForm
// );

            if (response.data) {
                setDashboardData(response.data);
            }
        } catch (err) {
            console.error('Dashboard error:', err);
            setError('حدث خطأ في تحميل البيانات');
            if (err.response?.status === 401) {
                onLogout();
                navigate('/');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900" dir="rtl">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
                    <p className="mt-4 text-gray-400">جاري تحميل البيانات...</p>
                </div>
            </div>
        );
    }

    if (error || !dashboardData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900" dir="rtl">
                <div className="text-center">
                    <div className="text-red-600 text-xl mb-4 flex items-center gap-2"><WarningIcon className="w-6 h-6" /><span>{error || 'حدث خطأ في تحميل البيانات'}</span></div>
                    <button
                        onClick={fetchDashboard}
                        className="bg-emerald-700 text-white px-6 py-2 rounded-lg hover:bg-emerald-800 transition"
                    >
                        إعادة المحاولة
                    </button>
                </div>
            </div>
        );
    }

    const { client, unit, installments, installments_summary, unit_updates, notifications } = dashboardData;

    const paidPercentage = installments_summary?.total_installments > 0
        ? (installments_summary.paid_count / installments_summary.total_installments) * 100
        : 0;

    const menuItems = [
        { id: 'dashboard', icon: 'dashboard', label: 'لوحة التحكم' },
        { id: 'myUnits', icon: 'myUnits', label: 'وحداتي' },
        { id: 'installments', icon: 'installments', label: 'الأقساط' },
        { id: 'support', icon: 'support', label: 'الدعم الفني' },
        { id: 'settings', icon: 'settings', label: 'الإعدادات' },
    ];

    // مكوّن عرض صور التطورات
const UpdateImages = ({ images }) => {
    if (!images || images.length === 0) return null;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            {images.map((img, imgIdx) => {
                const url = img?.image_url || img?.url || `https://api.mawtin.net/storage/${img?.path}`;
                const isVideo = img?.file_type?.startsWith('video') || 
                                img?.path?.endsWith('.mp4') || 
                                img?.path?.endsWith('.mov');

                if (!url) return null;

                return (
                    <div key={imgIdx} className="rounded-xl overflow-hidden bg-gray-800 border border-gray-700">
                        {isVideo ? (
                            <video
                                src={url}
                                controls
                                className="w-full h-52 object-cover"
                                onError={(e) => console.log('VIDEO FAILED:', url)}
                            >
                                متصفحك لا يدعم تشغيل الفيديو
                            </video>
                        ) : (
                            <img
                                src={url}
                                alt={`تطور ${imgIdx + 1}`}
                                className="w-full h-52 object-cover cursor-pointer hover:opacity-90 transition"
                                onClick={() => setLightboxImg(url)}
                                onError={(e) => {
                                    e.currentTarget.src = 'https://placehold.co/400x400?text=No+Image';
                                }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

    const renderContent = () => {
        switch (activePage) {
            case 'myUnits':
                return (
                    <div className="bg-gray-800 rounded-2xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-white mb-4">وحداتي</h2>
                        <div className="bg-gray-900 rounded-xl p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <p className="text-gray-400 mb-2">رقم الوحدة</p>
                                    <p className="text-2xl font-bold text-white">{unit?.unit_number}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-400 mb-2">اسم المشروع</p>
                                    <p className="text-2xl font-bold text-white">{unit?.project_name}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-400 mb-2">نوع الوحدة</p>
                                    <p className="text-2xl font-bold text-white">{unit?.unit_type === 'apartment' ? 'شقة' : unit?.unit_type}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-700">
                                <div>
                                    <p className="text-gray-400 text-sm">المساحة</p>
                                    <p className="text-white font-semibold">{unit?.area} م²</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">عدد الغرف</p>
                                    <p className="text-white font-semibold">{unit?.bedrooms}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">عدد الحمامات</p>
                                    <p className="text-white font-semibold">{unit?.bathrooms}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">الموقع</p>
                                    <p className="text-white font-semibold">{unit?.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'installments':
                return (
                    <InstallmentsTable installments={installments || []} unitNumber={unit?.unit_number} />
                );

            case 'support':
                return (
                    <div className="bg-gray-800 rounded-2xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-white mb-4">الدعم الفني</h2>
                        <div className="bg-gray-900 rounded-xl p-6">
                            <p className="text-gray-300 mb-4">للاستفسارات والدعم، يمكنك التواصل معنا عبر:</p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                                    <MailIcon className="w-6 h-6" />
                                    <div>
                                        <p className="text-gray-400 text-sm">البريد الإلكتروني</p>
                                        <p className="text-white">support@motan.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                                    <PhoneIcon className="w-6 h-6" />
                                    <div>
                                        <p className="text-gray-400 text-sm">رقم الهاتف</p>
                                        <p className="text-white">01001234567</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                                    <ChatIcon className="w-6 h-6" />
                                    <div>
                                        <p className="text-gray-400 text-sm">واتساب</p>
                                        <p className="text-white">01001234567</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'settings':
                return (
                    <div className="bg-gray-800 rounded-2xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-white mb-4">الإعدادات</h2>
                        <div className="bg-gray-900 rounded-xl p-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                                    <div>
                                        <p className="text-white font-semibold">الاسم</p>
                                        <p className="text-gray-400 text-sm">{client?.full_name}</p>
                                    </div>
                                    <button className="text-emerald-500 hover:text-emerald-400">تعديل</button>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                                    <div>
                                        <p className="text-white font-semibold">البريد الإلكتروني</p>
                                        <p className="text-gray-400 text-sm">{client?.email}</p>
                                    </div>
                                    <button className="text-emerald-500 hover:text-emerald-400">تعديل</button>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                                    <div>
                                        <p className="text-white font-semibold">رقم الهاتف</p>
                                        <p className="text-gray-400 text-sm">{client?.phone}</p>
                                    </div>
                                    <button className="text-emerald-500 hover:text-emerald-400">تعديل</button>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-white font-semibold">كلمة السر</p>
                                        <p className="text-gray-400 text-sm">••••••••</p>
                                    </div>
                                    <button className="text-emerald-500 hover:text-emerald-400">تغيير</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default: // dashboard
                return (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-emerald-900/50 rounded-xl flex items-center justify-center">
                                        <HomeIcon className="w-6 h-6" />
                                    </div>
                                    <span className="text-2xl font-bold text-white">{unit?.unit_number || '-'}</span>
                                </div>
                                <h3 className="text-gray-400 text-sm">رقم الوحدة</h3>
                                <p className="text-white font-semibold">{unit?.project_name || '-'}</p>
                            </div>

                            <div className="bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-emerald-900/50 rounded-xl flex items-center justify-center">
                                        <CurrencyIcon className="w-6 h-6" />
                                    </div>
                                    <span className="text-2xl font-bold text-white">{installments_summary?.total_installments || 0}</span>
                                </div>
                                <h3 className="text-gray-400 text-sm">إجمالي الأقساط</h3>
                                <p className="text-gray-300 text-sm">{installments_summary?.paid_count || 0} مدفوع / {installments_summary?.pending_count || 0} متبقي</p>
                            </div>

                            <div className="bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-emerald-900/50 rounded-xl flex items-center justify-center">
                                        <TrendingUpIcon className="w-6 h-6" />
                                    </div>
                                    <span className="text-2xl font-bold text-white">{paidPercentage.toFixed(0)}%</span>
                                </div>
                                <h3 className="text-gray-400 text-sm">نسبة الإنجاز</h3>
                                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${paidPercentage}%` }}></div>
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-emerald-900/50 rounded-xl flex items-center justify-center">
                                        <CreditCardIcon className="w-6 h-6" />
                                    </div>
                                    <span className="text-2xl font-bold text-white">{installments_summary?.total_remaining?.toLocaleString() || 0}</span>
                                </div>
                                <h3 className="text-gray-400 text-sm">المتبقي دفعة</h3>
                                <p className="text-white font-semibold text-sm">ج.م</p>
                            </div>
                        </div>

                        {/* Unit Info & Progress */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-800 rounded-2xl shadow-sm p-6">
                                <h2 className="text-lg font-bold text-white mb-4">معلومات الوحدة</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between pb-2 border-b border-gray-700">
                                        <span className="text-gray-400">المشروع</span>
                                        <span className="font-semibold text-white">{unit?.project_name}</span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-gray-700">
                                        <span className="text-gray-400">النوع</span>
                                        <span className="font-semibold text-white">{unit?.unit_type === 'apartment' ? 'شقة' : unit?.unit_type}</span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-gray-700">
                                        <span className="text-gray-400">المساحة</span>
                                        <span className="font-semibold text-white">{unit?.area} م²</span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-gray-700">
                                        <span className="text-gray-400">الموقع</span>
                                        <span className="font-semibold text-white">{unit?.location}</span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-gray-700">
                                        <span className="text-gray-400">السعر الإجمالي</span>
                                        <span className="font-semibold text-emerald-500">{unit?.total_price?.toLocaleString()} ج.م</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">المدفوع</span>
                                        <span className="font-semibold text-emerald-500">{installments_summary?.total_paid?.toLocaleString()} ج.م</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-2xl shadow-sm p-6">
                                <h2 className="text-lg font-bold text-white mb-4">ملخص الأقساط</h2>
                                <div className="relative w-40 h-40 mx-auto mb-4">
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                        <circle className="text-gray-700" strokeWidth="10" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                                        <circle
                                            className="text-emerald-600"
                                            strokeWidth="10"
                                            strokeDasharray={`${paidPercentage * 2.51} 251.2`}
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="40"
                                            cx="50"
                                            cy="50"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">{paidPercentage.toFixed(0)}%</span>
                                    </div>
                                </div>
                                <div className="flex justify-around text-center">
                                    <div>
                                        <p className="text-2xl font-bold text-white">{installments_summary?.total_installments || 0}</p>
                                        <p className="text-sm text-gray-400">إجمالي الأقساط</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-emerald-500">{installments_summary?.paid_count || 0}</p>
                                        <p className="text-sm text-gray-400">مدفوع</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-yellow-500">{installments_summary?.pending_count || 0}</p>
                                        <p className="text-sm text-gray-400">متبقي</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Installments */}
                        <div className="bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-white">آخر الأقساط</h2>
                                <button
                                    onClick={() => setActivePage('installments')}
                                    className="text-emerald-500 text-sm hover:text-emerald-400"
                                >
                                    عرض الكل →
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-700">
                                            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">رقم القسط</th>
                                            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">المبلغ</th>
                                            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">تاريخ الاستحقاق</th>
                                            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">الحالة</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {installments?.slice(0, 5).map((item) => (
                                            <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                                <td className="py-3 px-4 text-white">{item.installment_number}</td>
                                                <td className="py-3 px-4 text-white">{item.amount?.toLocaleString()} ج.م</td>
                                                <td className="py-3 px-4 text-gray-300">{new Date(item.due_date).toLocaleDateString('ar-EG')}</td>
                                                <td className="py-3 px-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                        item.status === 'paid' ? 'bg-emerald-900 text-emerald-400' :
                                                        item.status === 'overdue' ? 'bg-red-900 text-red-400' : 'bg-yellow-900 text-yellow-400'
                                                    }`}>
                                                        {item.status === 'paid' ? 'مدفوع' : item.status === 'overdue' ? 'متأخر' : 'معلق'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Unit Updates - مصلح */}
                        {unit_updates && unit_updates.length > 0 && (
                            <div className="bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
                                <h2 className="text-lg font-bold text-white mb-4">تطورات الوحدة</h2>
                                <div className="space-y-4">
                                    {unit_updates.slice(0, 5).map((update, idx) => (
                                        <div key={idx} className="p-4 bg-gray-900 rounded-xl">
                                            <div className="flex gap-3 items-start">
                                                <div className="w-10 h-10 bg-emerald-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <MegaphoneIcon className="w-5 h-5 text-emerald-500" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-white font-medium">{update.update_text}</p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {new Date(update.created_at).toLocaleDateString('ar-EG', {
                                                            year: 'numeric', month: 'long', day: 'numeric'
                                                        })}
                                                    </p>
                                                    {/* صور التطورات - مصلحة */}
                                                    <UpdateImages images={update.images} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-900" dir="rtl">

            {/* Lightbox للصور */}
            {lightboxImg && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setLightboxImg(null)}
                >
                    <button
                        className="absolute top-4 left-4 text-white text-3xl hover:text-gray-300 transition"
                        onClick={() => setLightboxImg(null)}
                    >
                        <XIcon className="w-6 h-6" />
                    </button>
                    <img
                        src={lightboxImg}
                        alt="صورة مكبّرة"
                        className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 right-0 h-full bg-gray-950 shadow-xl z-40 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                    {sidebarOpen && (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center text-white font-bold">م</div>
                            <span className="font-bold text-white">موطن العقارية</span>
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M13 5l7 7-7 7M5 5l7 7-7 7"} />
                        </svg>
                    </button>
                </div>

                <nav className="p-4">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActivePage(item.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl mb-2 transition ${
                                activePage === item.id
                                    ? 'bg-emerald-700 text-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                        >
                            <span className="flex-shrink-0">{item.id === 'dashboard' ? <BarChartIcon /> : item.id === 'myUnits' ? <HomeIcon /> : item.id === 'installments' ? <CurrencyIcon /> : item.id === 'support' ? <PhoneIcon /> : <CogIcon />}</span>
                            {sidebarOpen && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
                    <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-950/50 transition w-full">
                        <LogoutIcon className="w-5 h-5" />
                        {sidebarOpen && <span>تسجيل خروج</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`transition-all duration-300 ${sidebarOpen ? 'mr-64' : 'mr-20'}`}>
                {/* Top Header */}
                <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-[100]">
                    <div className="flex justify-between items-center px-6 py-4">
                        <div className="flex items-center gap-4">
                            {/* تمرير notifications من dashboardData مباشرة */}
                            <NotificationBell notifications={notifications || dashboardData.notifications || []} />
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-sm text-gray-400">مرحباً بعودتك</p>
                                    <p className="font-semibold text-white">{client?.full_name}</p>
                                </div>
                                <div className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold">
                                    {client?.full_name?.charAt(0)}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">لوحة التحكم</h1>
                            <p className="text-sm text-gray-400">نظرة عامة على حسابك ووحدتك</p>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="p-6">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;