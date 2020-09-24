import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Firebase/firebase.config';

export const LoginDetails = () => {
    firebase.initializeApp(firebaseConfig);
}