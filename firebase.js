import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBRMJrf3vheqP_zloQTpN0gl5Sslx6Wkho",
    authDomain: "docs-app-by-ak.firebaseapp.com",
    projectId: "docs-app-by-ak",
    storageBucket: "docs-app-by-ak.appspot.com",
    messagingSenderId: "942861415584",
    appId: "1:942861415584:web:1a3d60ecbc6e1bfb8d05c5",
    measurementId: "G-8VP89FF9P3"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore();

export default db 
