import React, { useEffect } from 'react'
import firebase from 'firebase'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/userSlice';


//Configure Firebase
const config = {
    apiKey: 'AIzaSyDyYbWrVc1u7iRq860TebVIem5pgbx5GUc',
    authDomain: 'shopping-cart-50530.firebaseapp.com',
  };
  firebase.initializeApp(config);
  
const uiConfig = {
    signInFlow: 'redirect',
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  };

function Login() {
    const dispatch = useDispatch()

    //Handle firebase auth changed
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
              return
          }
          const token = await user.getIdToken();
              const data = {
              user, token
            }
            dispatch(login(data))
        });
        return () => unregisterAuthObserver();
    }, [])

    return (
        <div className="container">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    )
}

export default Login
