//import firebase from "../firebase/firebaseClient";
import initializeStripe from "./initializeStripe";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { config } from "../components/Auth/config"
import { getAuth } from "firebase/auth";

export async function createCheckoutSession(uid) {
  //const firestore = firebase.firestore();
  //let firebaseApp;
  //if (!getApps().length) {
  //  window.firebaseApp = initializeApp(config);
  //}
  const auth = getAuth(global.firebaseApp);

  // Firestore (optional): uncomment the next line if you want to create a database for your users
  const db = getFirestore(global.firebaseApp);

  // Create a new checkout session in the subollection inside this users document
  const checkoutSessionRef = await 
    collection(db, "users")
    .doc(uid)
    .collection("checkout_sessions")
    .add({
      price: "price_1Jx2XFLBlaDAR7THC8EfBw0S",
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

  // Wait for the CheckoutSession to get attached by the extension
  checkoutSessionRef.onSnapshot(async (snap) => {
    const { sessionId } = snap.data();
    if (sessionId) {
      // We have a session, let's redirect to Checkout
      // Init Stripe
      const stripe = await initializeStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });
}