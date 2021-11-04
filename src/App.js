import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import './App.css'

import { getAuth, signInWithPopup, GoogleAuthProvider , signOut } from "firebase/auth";

const firebaseConfig = {
  
  apiKey: "AIzaSyBn6ssRw-ItWo-kuoXZnogiWguzQr2v_0g",
  authDomain: "ema-john-simple-c68b2.firebaseapp.com",
  projectId: "ema-john-simple-c68b2",
  storageBucket: "ema-john-simple-c68b2.appspot.com",
  messagingSenderId: "1034960038923",
  appId: "1:1034960038923:web:2cddfeb529c8f0530f6b0e"
};

const app = initializeApp(firebaseConfig);


function App(){
  const [user, setUser] = useState({
    isSignedIn: false,
    name:'',
    email:'',
    photo:''

  })

const provider = new GoogleAuthProvider();
const auth = getAuth();
const handleSignIn = () =>{
  signInWithPopup(auth, provider)
  .then(res=>{
    const {displayName, photoURL, email} = res.user;
     const signedInUser ={
       isSignedIn:true,
       name:displayName,
       email: email,
       photo:photoURL
     }
     setUser(signedInUser)
    console.log(displayName, photoURL, email);
  })
  .catch(err=>{
    console.log(err);
    console.log(err.message);
  })
}
const handleSignOut = () =>{
  const auth = getAuth();
 signOut(auth)
.then(res => {
  const signedOutUser = {
    isSignedIn:false, 
    name:'',
    photo:'',
    email:'' 
  }
  setUser(signedOutUser);
})
.catch(err => {
  
});
}
  return (
    <div className="App">
      {
        
        user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button>:
        <button onClick={handleSignIn}>Sign in</button>
      }
      {
        user.isSignedIn && 
        <div>
        <p>Welcome, {user.name}</p>
        <p>Your Email: {user.email}</p>
        <img src={user.photo} alt="" />
       </div>
      }
    </div>
  );
};

export default App;