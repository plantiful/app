import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpUViPr_ERnoeDVSV0iKPfmty8XYeybBU",
  authDomain: "plantiful-381509.firebaseapp.com",
  projectId: "plantiful-381509",
  storageBucket: "plantiful-381509.appspot.com",
  messagingSenderId: "966781437314",
  appId: "1:966781437314:web:60418a2194fb8d9761bb9b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
