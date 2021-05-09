import firebase from 'firebase/app';
import auth from 'firebase/auth';

firebase.initializeApp({
    apiKey: "AIzaSyDGYOMyCDFi9g2WlnZyLSpPOCdRziOtIAE",
    authDomain: "get-sweety.firebaseapp.com",
    databaseURL: "https://get-sweety-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "get-sweety",
    storageBucket: "get-sweety.appspot.com",
    messagingSenderId: "638001928046",
    appId: "1:638001928046:web:d148ab8bd8f83273ead37f"
});

export default {
    firebase
}