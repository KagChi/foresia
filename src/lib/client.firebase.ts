import { firebaseConfig } from "@/client.config";
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
