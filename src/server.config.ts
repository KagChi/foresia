import { ServiceAccount } from "firebase-admin";

export const firebaseConfig: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
};

export const objectStorageKey = process.env.OBJECT_STORAGE_KEY!;
export const objectStorageSecret = process.env.OBJECT_STORAGE_SECRET!;
