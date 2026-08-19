import { db } from "../../../firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

const STORAGE_KEY = "db_seri_events";
const EVENT_CHANGE_EVENT = "db_seri_events_updated";

export const INITIAL_EVENTS = [];

export function getStoredEvents() {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return [];
    }
    const parsed = JSON.parse(data);
    if (!parsed || !Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch (err) {
    return [];
  }
}

export function subscribeEvents(callback) {
  if (typeof window === "undefined") return () => {};

  try {
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          callback([]);
        } else {
          const list = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data()
          }));
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
          } catch (e) {
            console.warn("LocalStorage cache quota exceeded:", e);
          }
          callback(list);
        }
      },
      (err) => {
        console.error("Firestore events subscription error:", err);
        callback(getStoredEvents());
      }
    );

    return unsubscribe;
  } catch (err) {
    console.error("Error setting up Firestore listener:", err);
    callback(getStoredEvents());
    return () => {};
  }
}

export async function addEvent(eventData) {
  const payload = {
    title: eventData.title || "Untitled Event",
    category: eventData.category || "General",
    date: eventData.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    status: eventData.status || "Published",
    description: eventData.description || "",
    images: eventData.images || [],
    createdAt: serverTimestamp()
  };

  try {
    const docRef = await addDoc(collection(db, "events"), payload);
    return { id: docRef.id, ...payload };
  } catch (err) {
    console.error("Error adding event to Firestore:", err);
    // Fallback to local storage if Firestore write fails
    const events = getStoredEvents();
    const newEvt = { id: `EVT-${Date.now().toString().slice(-4)}`, ...payload };
    const updated = [newEvt, ...events];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("LocalStorage quota exceeded:", e);
    }
    window.dispatchEvent(new CustomEvent(EVENT_CHANGE_EVENT, { detail: updated }));
    return newEvt;
  }
}

export async function updateEvent(id, updatedFields) {
  try {
    const docRef = doc(db, "events", id);
    await updateDoc(docRef, {
      ...updatedFields,
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    console.error("Error updating event in Firestore:", err);
    // Fallback to local storage update
    const events = getStoredEvents();
    const updated = events.map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(EVENT_CHANGE_EVENT, { detail: updated }));
  }
}

export async function deleteEvent(id) {
  try {
    const docRef = doc(db, "events", id);
    await deleteDoc(docRef);
  } catch (err) {
    console.error("Error deleting event from Firestore:", err);
    // Fallback to local storage delete
    const events = getStoredEvents();
    const updated = events.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(EVENT_CHANGE_EVENT, { detail: updated }));
  }
}