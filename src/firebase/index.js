import firebase from "firebase/app";
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyAlNaCQgm6w0MmGqXx26APXevVmiiydw1s",
    authDomain: "uploadimage-bac43.firebaseapp.com",
    projectId: "uploadimage-bac43",
    storageBucket: "uploadimage-bac43.appspot.com",
    messagingSenderId: "747827186367",
    appId: "1:747827186367:web:135e508aa777d776d4d40a",
    measurementId: "G-GVNHJHS5CD"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }