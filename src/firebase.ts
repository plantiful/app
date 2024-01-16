// https://medium.com/@sajadshafi/implementing-firebase-auth-in-react-js-typescript-vite-js-88465ac84170
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const app = initializeApp({
  apiKey: "AIzaSyDpUViPr_ERnoeDVSV0iKPfmty8XYeybBU",
  authDomain: "plantiful-381509.firebaseapp.com",
  projectId: "plantiful-381509",
  storageBucket: "plantiful-381509.appspot.com",
  messagingSenderId: "966781437314",
  appId: "1:966781437314:web:60418a2194fb8d9761bb9b",
});

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const auth = getAuth(app);
export default app;
