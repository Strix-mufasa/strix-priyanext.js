import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3i7GvHlnib2GCCyR37H5XC7aANbPMVIc",
  authDomain: "strix-production-402d4.firebaseapp.com",
  projectId: "strix-production-402d4",
  storageBucket: "strix-production-402d4.firebasestorage.app",
  messagingSenderId: "207095143719",
  appId: "1:207095143719:web:ef9c4d4a3482131da5dd02",
  measurementId: "G-0MVYMSZCWX"
};


// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Export auth and firestore instances
export const auth = getAuth(app);

// Enable Offline Persistence for instant loads and reliability
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});

// Helper function to convert file to base64
export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    // Check file size (recommend under 500KB for Firestore)
    const maxSize = 500 * 1024; // 500KB
    if (file.size > maxSize) {
      console.warn(`Warning: File size is ${(file.size / 1024).toFixed(2)}KB. Recommend under 500KB for best performance.`);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};