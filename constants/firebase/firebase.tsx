import { initializeApp, getApps, getApp } from 'firebase/app';
// @ts-ignore
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBnrhWTZZQgwxGJ4HRY_Z7SvoDbsCOKTbA",
    authDomain: "finall-server.firebaseapp.com",
    databaseURL: "https://finall-server-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "finall-server",
    storageBucket: "finall-server.appspot.com",
    messagingSenderId: "100588323064",
    appId: "1:100588323064:web:32826aee7ad91bd03d3b0d",
    measurementId: "G-GY90GBB77W"
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
