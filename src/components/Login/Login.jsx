import React from 'react';
import FacebookSignIn from './FacebookSignIn';
import GoogleSignIn from './GoogleSignIn';
import './Login.css';
import SigninForm from './SigninForm';


const Login = () => {
    return (
        <div className='App'>
            <GoogleSignIn />
            <FacebookSignIn />
            <hr />
            <SigninForm />
        </div>
    );
};

export default Login;