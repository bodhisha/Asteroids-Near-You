import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCBiQZBJd3u3K4A7PiWokWdxFshsLokFwA",
  authDomain: "asteroids-near-you.firebaseapp.com",
  databaseURL: "https://asteroids-near-you.firebaseio.com",
  projectId: "asteroids-near-you",
  storageBucket: "asteroids-near-you.appspot.com",
  messagingSenderId: "53061041040",
  appId: "1:53061041040:web:87b8ada67f9c1ac0399115",
  measurementId: "G-FSXSE55DC8",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
