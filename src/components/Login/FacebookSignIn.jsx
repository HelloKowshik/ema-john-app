import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';


const FacebookSignIn = () => {

  const [loggedUser, setLoggedUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

    const provider = new firebase.auth.FacebookAuthProvider();
    const [user, setUser] = useState({});
    const handleClick = () => {
      firebase.auth().signInWithPopup(provider)
          .then(res => {
            // const token = res.credential.accessToken;
            console.log(res);
            setUser(res.user);
            setLoggedUser(res.user);
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
          user.user? <button className='btnDanger' onClick={handleSignOut}>Sign Out</button> : <button className='btn' onClick={handleClick}>Sign in with Facebook</button>
        }
        <hr />
        {
          user.displayName ? (<div><h4>Welcome, {user.displayName}</h4><h3>{user.email}</h3><img className='photo' src={user.photoURL} alt='user' /></div>): <h5>No Sign in user at this moment.</h5>
        }
      </div>
    );
};

export default FacebookSignIn;