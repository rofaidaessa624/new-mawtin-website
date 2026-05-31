import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDInU0kY9zKGrXBLVNlURzzxZJd9aPAlnA",
  authDomain: "mawtin-6308b.firebaseapp.com",
  projectId: "mawtin-6308b",
  storageBucket: "mawtin-6308b.firebasestorage.app",
  messagingSenderId: "1057041831387",
  appId: "1:1057041831387:web:67c955845a44a6a02043fe",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const VAPID_KEY = 'BEoaXVQO23PzX0Xwolj46K80Mwb8JdJuOQ1Dqpkb3WP55Np6Z6uto1O9T_lFiOoASsLCoXVNL4bcpbOR8OyWmFc';

/**
 * طلب إذن الإشعارات وجلب FCM Token
 * يُستخدم في UserLogin.jsx و UserDashboard.jsx
 */
export const requestForToken = async (): Promise<string | null> => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('FCM: Notification permission denied.');
      return null;
    }

    const token = await getToken(messaging, { vapidKey: VAPID_KEY });

    if (token) {
      console.log('FCM Token:', token);
      return token;
    } else {
      console.warn('FCM: No token received. Check VAPID key or SW registration.');
      return null;
    }
  } catch (error) {
    console.error('FCM: Error getting token:', error);
    return null;
  }
};

/**
 * الاستماع للإشعارات لما التطبيق يكون مفتوح (Foreground)
 * يُستخدم في UserDashboard.jsx
 */
export const onMessageListener = (): Promise<unknown> => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('FCM Foreground Message:', payload);
      resolve(payload);
    });
  });
};

export { app, messaging };
