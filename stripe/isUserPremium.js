//import firebase from "../firebase/firebaseClient";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default async function isUserPremium(){
  const auth = getAuth();
  //await firebase.auth().currentUser?.getIdToken(true);
  await auth.currentUser?.getIdToken(true);
  //const decodedToken = await firebase.auth().currentUser?.getIdTokenResult();
  const decodedToken = await auth.currentUser?.getIdTokenResult();

  return decodedToken?.claims?.stripeRole ? true : false;
}