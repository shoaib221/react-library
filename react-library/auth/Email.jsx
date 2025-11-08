

import React, { useRef, useState, useContext, useEffect } from 'react';
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    sendEmailVerification, sendPasswordResetEmail
} from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from './firebase.config';
import { AuthContext } from './context';
import { GoogleLogin } from './Google';
import { GithubLogin } from './Github';
import { Breaker } from '../miscel/Breaker';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const isValidemail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const EmailLogin = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [forgot, setForgot] = useState(false)
    const [eye, setEye] = useState(false)


    function EyeToggle(event) {
        event.preventDefault()
        setEye(!eye)
    }

    function Login() {


        if (!isValidemail.test(email)) {
            toast.error('Invalid Email')

            return;
        }
        if (!isValidPassword.test(password)) {
            toast.error("Invalid Password - password must contain at least eight characters with at least a uppercase, a lowercase letters and a number")
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                setLoading(false);
                navigate(location.state || '/');
            })
            .catch((error) => {

                const errorMessage = error.message;
                toast.error(errorMessage)
                //console.log(error)
            });
    }

    function ResetPassword() {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("Check your inbox for reset link")
            })
            .catch((error) => {

                const errorMessage = error.message;
                toast.error(errorMessage);
            });
    }

    useEffect(() => {
        if (user) navigate(location?.state);
    }, [user])

    function CheckChange(e) {

        //console.log(e.target.value);
    }



    return (
        <div>
            <div className='header-1' >{forgot ? "Reset Password" : "Log In"} </div>
            {error && <p>{error}</p>}


            {forgot ?
                // Reset Password
                <div className='cen-item' style={{ margin: '1rem', width: '100%' }} >

                    <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' required placeholder='Email' style={{ width: '100%' }}  ></input>
                    <button className='button-1 w-full cen-hor' onClick={ResetPassword} >Get Link</button>
                    <div onClick={() => setForgot(false)} style={{ textDecoration: 'underline', cursor: 'pointer' }} >Log In?</div>
                </div>
                :
                // Login
                <div className='cen-item' >
                    <form  >
                        <fieldset style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', maxWidth: '400px' }} >

                            <label>Email</label>
                            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />

                            <label>Password</label>
                            <div style={{ position: 'relative' }} className='cen-item' >
                                <input type={ eye? 'text': 'password' } value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' id="password-1" />
                                <button style={{ position: 'absolute', right: '0%' }}  onClick={EyeToggle}  >
                                    {eye ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>





                        </fieldset>


                    </form>
                    <button className='button-1 w-full cen-hor' onClick={Login}  >Login</button>
                    <div onClick={() => setForgot(true)} style={{ textDecoration: 'underline', cursor: 'pointer' }} >Forgot Password?</div>

                </div>



            }

            <Breaker message={"or"} />

            <GoogleLogin />
            <GithubLogin />



        </div>
    )

}

export const EmailRegister = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');



    function Register(event) {
        event.preventDefault();
        //console.log(email, password)

        if (!isValidemail.test(email)) {
            toast.error('Invalid Email')

            return;
        }
        if (!isValidPassword.test(password)) {
            toast.error("Invalid Password - password must contain at least eight characters with at least a uppercase, a lowercase letters and a number")
            return;
        }
        //console.log("here")

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                //console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;

                setError(error.message);
            });
    }

    return (
        <div>
            <div className='header-1' >Register</div>
            {error && <p>{error}</p>}
            <form  >
                <fieldset style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', maxWidth: '400px' }} >

                    <label>Email</label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />

                    <label>Password</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />

                </fieldset>

            </form>
            <button className='button-1 w-full cen-hor' onClick={Register} >Register</button>

            <Breaker message={"OR"} />

            <GoogleLogin />
            <GithubLogin />
        </div>
    )
}

export const Email = () => {
    const [error, setError] = useState(null);
    const emailref = useRef();

    function handleSubmit(event) {
        event.preventDefault();
        //console.log(event.target);
        //console.log(event.target.email.value);
    }


    function PasswordReset(event) {
        let email = event.target.email.value;
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }

    function VerifyEmail(event) {
        event.preventDefault();
        //console.log( auth.currentUser );
        sendEmailVerification(auth.currentUser)
            .then(() => {
                // Email verification sent!
                // ...
            });
    }



    return (
        <></>
    );
};

