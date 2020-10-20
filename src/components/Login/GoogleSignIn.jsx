import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Firebase/firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


firebase.initializeApp(firebaseConfig);


const GoogleSignIn = () => {

  const [loggedUser, setLoggedUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

    const provider = new firebase.auth.GoogleAuthProvider();
  const [user, setUser] = useState({});
  const setUserToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      sessionStorage.setItem('token', idToken);
    }).catch(function(error) {
      // Handle error
    });
  }
    const handleClick = () => {
      firebase.auth().signInWithPopup(provider)
        .then(res => {
          // console.log(res);
          setUser(res);
          setLoggedUser(res.user);
          setUserToken();
          history.replace(from);
        })
        .catch(err => {
          console.log(err.message);
      })
    }
    const handleSignOut = () => {
      firebase.auth().signOut()
        .then(() => {
          alert('Sign Out!');
          setUser({});
        })
        .catch(err => {
          console.log(err.message);
        });
    }
    // console.log(user);
    return (
      <div>
        {
          user.user? <button className='btnDanger' onClick={handleSignOut}>Sign Out</button> : <button className='btn' onClick={handleClick}>Sign in with Google</button>
        }
        <hr />
        {
          user.user && (<div><h4>Welcome, {user.user.displayName}</h4><h3>{user.user.email}</h3><img className='photo' src={user.user.photoURL} alt='user' /></div>)
        }
      </div>
    );
};

export default GoogleSignIn;