import { initializeApp, getApps, getApp } from 'firebase/app';
// @ts-ignore
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    
    authDomain: "finall-server.firebaseapp.com",
    databaseURL: "https://finall-server-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Khởi tạo Firebase app nếu chưa được khởi tạo
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Khởi tạo Auth với AsyncStorage nếu chưa khởi tạo
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

// Cấu hình Firestore, Storage, và Database
const firestore = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { app, auth, firestore, storage, database };
