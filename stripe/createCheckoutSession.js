//import firebase from "../firebase/firebaseClient";
import initializeStripe from "./initializeStripe";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { config } from "../components/Auth/config"
import { getAuth } from "firebase/auth";
import {loadStripe} from '@stripe/stripe-js';

export async function createCheckoutSession(uid) {
  //const firestore = firebase.firestore();
  //let firebaseApp;
  //if (!getApps().length) {
  //  window.firebaseApp = initializeApp(config);
  //}
  const auth = getAuth();

  // Firestore (optional): uncomment the next line if you want to create a database for your users
  const db = getFirestore();

  // Create a new checkout session in the subollection inside this users document
  /*const checkoutSessionRef = await 
    collection(db, "users")
    .doc(uid)
    .collection("checkout_sessions")
    .add({
      price: "price_1Jx2XFLBlaDAR7THC8EfBw0S",
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });*/
  let newObj = {
    price: 'price_1Jx2XFLBlaDAR7THC8EfBw0S',
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  };
  console.log(`DBG: new obj is ${JSON.stringify(newObj, null, 2)}`);

  // Create a new checkout session in the subollection inside this users document
  let userCollRef = collection(db, "users");
  let uidDocRef = doc(userCollRef, uid);
  let checkoutSessCollRef = collection(uidDocRef, "checkout_sessions")
  const checkoutSessionRef = await addDoc(checkoutSessCollRef, newObj);
  alert(`checkoutSessionRef is: ${JSON.stringify(checkoutSessionRef)}`);

  // Wait for the CheckoutSession to get attached by the extension
  /*checkoutSessionRef.onSnapshot(async (snap) => {
    const { sessionId } = snap.data();
    if (sessionId) {
      // We have a session, let's redirect to Checkout
      // Init Stripe
      const stripe = await initializeStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });*/
  //const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
  const unsub = onSnapshot(checkoutSessionRef, async (doc) => {
    const { sessionId } = doc.data();
    alert(`doc.data is: ${JSON.stringify(doc.data())}`);
    alert(`sessionId is: ${JSON.stringify(sessionId)}`);
    if (sessionId) {
      // We have a session, let's redirect to Checkout
      // Init Stripe
      const stripe = await initializeStripe();
      alert(`Stripe is: ${JSON.stringify(stripe)}`)
      stripe.redirectToCheckout({ sessionId });
      alert('stripe initialized');
    }
  });
}