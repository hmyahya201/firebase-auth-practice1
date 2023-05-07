/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import app from './../../firebase';
import {GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithPopup} from 'firebase/auth'
import { Link } from 'react-router-dom';

const Register = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const auth = getAuth(app)
    const GoogleProvider = new GoogleAuthProvider()
    const GithubProvider = new GithubAuthProvider()

    const handleSubmitForm = (event)=>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        setError("")
        setSuccess("")
        createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const loggedInUser = result.user
            setSuccess("You have successfully registered")
            handleVerifyEmail(loggedInUser)
            event.target.reset()
        })
        .catch(error=>{
            setSuccess("")
            setError(error.message)
        })
    }

    const handleGithubVerification = ()=>{
        signInWithPopup(auth, GithubProvider)
        .then(result=>{
            const loggedInUser = result.user;
            console.log(loggedInUser)
        })
        .catch(error=>{
            console.log(error.message)
        })
    }

    const handleGoogleVerification = ()=>{
        signInWithPopup(auth, GoogleProvider)
        .then(result=>{
            const loggedInUser = result.user;
            console.log(loggedInUser)
        })
        .catch(error=>{
            console.log(error.message)
        })
    }
    const handleVerifyEmail = (user)=>{
        sendEmailVerification(user)
        .then(()=>{
            alert("Check your email")
        })
        .catch(error=>{
            setSuccess("")
            setError(error.message)
        })
    }

    return (
        <div>
            <h1>Register</h1>
             <div>
           <form onSubmit={handleSubmitForm}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            {
                error?<p className="text-danger mt-2">{error}</p>:<p className="text-success mt-2">{success}</p>
            }

            <div className="d-grid gap-2 mt-3">
                <button onClick={handleGoogleVerification} className="btn btn-primary" type="button">
                    Login with Google
                </button>
                <button onClick={handleGithubVerification} className="btn btn-secondary" type="button">
                    Login with Github
                </button>
            </div>
            <p>Already have an acount? please <Link to="/login">Login</Link></p>
           
        </div>
        </div>
    );
};

export default Register;