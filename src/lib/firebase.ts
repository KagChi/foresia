"use server";

import { firebaseConfig } from "@/server.config";
import firebaseApp from "firebase-admin";

export const firebase = async () => {
    if (!firebaseApp.apps.length) {
        firebaseApp.initializeApp({
            credential: firebaseApp.credential.cert(firebaseConfig)
        });
    }

    return firebaseApp.apps[0]!;
};
