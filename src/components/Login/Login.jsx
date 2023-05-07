// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebase';
import { Link } from 'react-router-dom';

const Login = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")
    const auth = getAuth(app);
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmitSignIn = (event)=>{
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        setError("")
        setSuccess("")
        signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
            setSuccess("You have successfully login");
            event.target.reset()
        })
        .catch(error=>{
            setSuccess("")
            setError(error.message)
        })
    }
    const handleResetPasswor = ()=>{
        const email = emailRef.current.value;
        sendPasswordResetEmail(auth, email)
        .then(()=>{
            alert("check your email")
        })
        .catch(error=>{
            setError(error.message)
        })
    }
    return (
        <div>
            <h1>Login</h1>
           <form onSubmit={handleSubmitSignIn}>
                <div className="mb-3">
                    <label  name="email" className="form-label">Email address</label>
                    <input ref={emailRef} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="mb-3">
                    <label name="password" className="form-label">Password</label>
                    <input ref={passwordRef} type="password" className="form-control" id="password" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {
                success?<p className="text-success">{success}</p>:<p className="text-danger">{error}</p>
            }
            <p>New in this Website? please <Link to="/register">Register</Link></p>
            <p>Forgot password? <button onClick={handleResetPasswor} className='btn btn-link'>Reset</button> Password</p>
        </div>
    );
};

export default Login;