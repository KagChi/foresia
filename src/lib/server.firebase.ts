/* eslint-disable @typescript-eslint/require-await */
"use server";

import { firebaseConfig } from "@/server.config";
import firebaseApp from "firebase-admin";

export const firebase = async () => {
    if (!firebaseApp.apps.length) {
        firebaseApp.initializeApp({
            credential: firebaseApp.credential.cert(firebaseConfig)
        }, "admin");
    }

    return firebaseApp.apps.find(x => x?.name === "admin")!;
};
