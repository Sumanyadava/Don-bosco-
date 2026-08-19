import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase safely (prevent re-initialization error during HMR / SSR in Next.js)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => { });
}

export const db = getFirestore(app);
export const auth = getAuth(app);

// Helper function to register new user/admin without disrupting active admin session
export async function registerNewUser(name, email, password) {
  const secondaryApp = getApps().find((a) => a.name === "SecondaryAuth") || initializeApp(firebaseConfig, "SecondaryAuth");
  const secondaryAuth = getAuth(secondaryApp);
  const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
  if (userCredential.user && name) {
    await updateProfile(userCredential.user, { displayName: name });
  }
  const createdUser = userCredential.user;
  await signOut(secondaryAuth);
  return createdUser;
}

export { analytics };
export default app;

