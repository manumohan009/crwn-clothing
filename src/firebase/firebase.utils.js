import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config= {
    apiKey: "AIzaSyDtyzLyabsnkjrrfKWMK6jd0dWYQMON0bw",
    authDomain: "crwn-db-5493e.firebaseapp.com",
    databaseURL: "https://crwn-db-5493e.firebaseio.com",
    projectId: "crwn-db-5493e",
    storageBucket: "",
    messagingSenderId: "575354369337",
    appId: "1:575354369337:web:ce55f0274bbdbf62"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    // console.log(snapShot);
    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error){
        console.log('Error creating user', error.message)
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

  export default firebase; 