import { findAccount } from "@/actions/Account";
import { User } from "@/db/schema";
import { firebaseApp } from "@/lib/client.firebase";
import { setCookie } from "cookies-next";
import { getAuth, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { useEffect } from "react";
import { state, useSnapshot } from "reactish-state";

export interface Auth {
    user: Partial<typeof User.$inferSelect> | null;
    firebaseUser: FirebaseUser | null;
    loading: boolean;
}

export const authState = state<Auth, unknown>({
    user: null,
    firebaseUser: null,
    loading: true
});

export const useAuthSnapshot = () => {
    const auth = useSnapshot(authState);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(firebaseApp), u => {
            if (u?.email) {
                const formData = new FormData();
                formData.set("user_or_email", u.email);

                void findAccount(formData).then(x => {
                    void u.getIdToken().then(y => {
                        authState.set({ user: x.data, loading: false, firebaseUser: u });
                        setCookie("session", y);
                    });
                });
            } else {
                authState.set({ user: null, loading: false, firebaseUser: u });
            }
        });

        return () => unsubscribe();
    }, []);

    console.log(auth);

    return auth;
};

