// ✅ Firebase Service Worker - Background Notifications
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDInU0kY9zKGrXBLVNlURzzxZJd9aPAlnA",
  authDomain: "mawtin-6308b.firebaseapp.com",
  projectId: "mawtin-6308b",
  storageBucket: "mawtin-6308b.firebasestorage.app",  
  messagingSenderId: "1057041831387",
  appId: "1:1057041831387:web:67c955845a44a6a02043fe",
});

const messaging = firebase.messaging();

// ✅ استقبال الإشعارات في الخلفية (Background)
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Background message received:', payload);

  const title   = payload?.notification?.title || 'إشعار جديد';
  const options = {
    body:  payload?.notification?.body  || '',
    icon: '/src/assets/logo-removebg-preview.png',
    badge: '/src/assets/logo-removebg-preview.png',
    data:  payload?.data || {},
    dir:   'rtl',
    lang:  'ar',
  };

  self.registration.showNotification(title, options);
});

// ✅ فتح التطبيق عند الضغط على الإشعار
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data?.click_action || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
