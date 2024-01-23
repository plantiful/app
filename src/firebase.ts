// https://medium.com/@sajadshafi/implementing-firebase-auth-in-react-js-typescript-vite-js-88465ac84170
import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  Auth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { get, getDatabase, push, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDpUViPr_ERnoeDVSV0iKPfmty8XYeybBU",
  authDomain: "plantiful-381509.firebaseapp.com",
  databaseURL:
    "https://plantiful-381509-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "plantiful-381509",
  storageBucket: "plantiful-381509.appspot.com",
  messagingSenderId: "966781437314",
  appId: "1:966781437314:web:60418a2194fb8d9761bb9b",
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

let auth: Auth = getAuth(app);
if (!auth) {
  initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
  auth = getAuth(app);
}

export interface PlantInfo {
  photo: string;
  nickname: string;
  commonName: string;
  scientificName: string;
  taxonomy: {
    class: string;
    genus: string;
    order: string;
    family: string;
    phylum: string;
    kingdom: string;
  };
  rank: string;
  description: string;
  watering: string;
}

export const addRoom = async (
  userId: string,
  roomName: string
): Promise<string> => {
  const db = getDatabase();
  const roomsRef = ref(db, `users/${userId}/rooms`);

  const existingRoomSnapshot = await get(roomsRef);
  if (existingRoomSnapshot.exists()) {
    const rooms = existingRoomSnapshot.val();
    for (const roomId in rooms) {
      if (rooms[roomId].name === roomName) {
        return roomId;
      }
    }
  }

  const newRoomRef = push(roomsRef);
  await set(newRoomRef, { name: roomName });
  return newRoomRef.key; // Return the new room's unique key (roomId)
};

export const getRooms = async (userId: string) => {
  const db = getDatabase();
  const roomsRef = ref(db, `users/${userId}/rooms`);
  try {
    const snapshot = await get(roomsRef);
    if (snapshot.exists()) {
      // console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("No rooms available");
      return {};
    }
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export const addPlantt = async (
  userId: string,
  roomId: string,
  plantInfo: PlantInfo
) => {
  const db = getDatabase();
  const plantsRef = ref(db, `users/${userId}/rooms/${roomId}/plants`);
  const newPlantRef = push(plantsRef);

  const plantData = {
    photo: plantInfo.photo || "default_photo_url",
    nickname: plantInfo.nickname || "default_nickname",
    commonName: plantInfo.commonName || "default_common_name",
    scientificName: plantInfo.scientificName || "default_scientific_name",
    taxonomy: plantInfo.taxonomy || {},
    rank: plantInfo.rank || "default_rank",
    description: plantInfo.description || "default_description",
    watering: plantInfo.watering || "default_watering",
  };

  set(newPlantRef, plantData);
};

export const getPlantsInRoom = async (userId: string, roomId: string) => {
  const db = getDatabase();
  const plantsRef = ref(db, `users/${userId}/rooms/${roomId}/plants`);
  try {
    const snapshot = await get(plantsRef);
    if (snapshot.exists()) {
      // console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("No plants available in this room");
      return {};
    }
  } catch (error) {
    console.error("Error fetching plants:", error);
    throw error;
  }
};

export const getCurrentUserId = () => {
  const user = auth.currentUser;
  if (user) {
    return user.uid;
  } else {
    return null;
  }
};

export { auth, app };
