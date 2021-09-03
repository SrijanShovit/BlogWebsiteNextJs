import firebase from "firebase/compat/app"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'



const firebaseConfig = {
  apiKey: "AIzaSyBx3k7--A9ku_tXTvK1GJc_TEpccEoEEho",
  authDomain: "vlogger-bb34a.firebaseapp.com",
  projectId: "vlogger-bb34a",
  storageBucket: "vlogger-bb34a.appspot.com",
  messagingSenderId: "119706475910",
  appId: "1:119706475910:web:e73e001ed35c2a2ffa2007"
  };



  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)
    
  const auth = firebase.auth()
  const db = firebase.firestore()
  const storage = firebase.storage()
  const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
  export {auth,db,storage,serverTimestamp}