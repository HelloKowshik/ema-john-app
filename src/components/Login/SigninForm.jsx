import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


const SigninForm = () => {
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useState({
        fullName: '',
        email: '',
        password: '',
        error: '',
        success: false,
        isSigned: false
    });

    const handleBlur = e => {
        let isFormValid = false;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }

        if (e.target.name === 'password') {
            isFormValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/.test(e.target.value);
        }

        if (e.target.name === 'fullName') {
            isFormValid = e.target.value.length > 5;
        }

        if (isFormValid) {
            const currentUser = { ...user };
            currentUser[e.target.name] = e.target.value;
            setUser(currentUser);
            // console.log(user);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (newUser && user.email && user.password) {
            firebase.auth()
                .createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const currentUser = { ...user };
                    currentUser.error = '';
                    currentUser.success = true;
                    setUser(currentUser);
                    updateName(user.fullName);
                    setLoggedUser(currentUser);
                    history.replace(from);
                })
                .catch(error => {
                    
                    let errorMessage = error.message;
                    const currentUser = { ...user };
                    currentUser.error = errorMessage;
                    currentUser.success = false;
                    setUser(currentUser);
                });
            // console.log(user);
        }
        if (!newUser && user.email && user.password) {
            firebase.auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const currentUser = { ...user };
                    currentUser.error = '';
                    currentUser.success = true;
                    setUser(currentUser); 
                    setLoggedUser(currentUser);
                    history.replace(from);
                    console.log('user: ',res.user);
                })
                .catch(function (error) {
                const errorMessage = error.message;
                const currentUser = { ...user };
                currentUser.error = errorMessage;
                currentUser.success = false;
                setUser(currentUser);
              });
        }
        // else {
        //     alert('something went Wrong!');
        // }
    }

    const handleToggle = () => {
        setNewUser(!newUser);
    }

    const updateName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        })
            .then(res => {
                console.log('Updated!');
            })
            .catch(err => {
                console.log(err);
            });
    }

  return (
    <div className='form-div'>
     <input type="checkbox" name="newUser" onChange={handleToggle} />  
     <label htmlFor="newUser">Sign up free</label><hr />     
     <form onSubmit={handleSubmit}>
     {newUser && <><label htmlFor='fullName'>Full Name</label><br/>
     <input
         type='text'
         name='fullName'
         onBlur={handleBlur}      
     /><br /></>}     
        <label htmlFor='email'>Email</label><br/>
        <input
            type='email'
            name='email'
            onBlur={handleBlur}      
        /><br />
        <label htmlFor='password'>Password</label><br />
        <input
            type='password'
            name='password'
            onBlur={handleBlur}      
        /><br />
        <input type='submit' value={newUser ? 'Sign Up' : 'Sign in'} />
     </form>
    <p style={{color:'red'}}>{user.error}</p>
    {
        user.success && <p style={{color:'green'}}>User {newUser ? 'Created' : 'Logged in'} Successfully</p>
    }     
    </div>
  );
};

export default SigninForm;
