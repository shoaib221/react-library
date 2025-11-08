import React, {  useEffect, useState } from 'react';
import './auth-style.css';
import { EmailLogin, EmailRegister } from './Email';
import { GoogleLogin } from './Google';
import { GithubLogin } from './Github';
import { useContext } from 'react';
import { AuthContext } from './context';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Loading } from '../miscel/Loading';
import { auth } from './firebase.config';
import { signOut } from 'firebase/auth';
import { Breaker } from '../miscel/Breaker';
import { toast } from 'react-toastify';




export const SignOut = () => {
    const { setUser, user } = useContext(AuthContext);
    
    function handle () {
        signOut(auth).then(() => {
            setUser(null);
        }).catch((error) => {
            toast.error( error.message )
        });
    }

    if(user) return (
        <div onClick={ handle } className='button-1' >
            Sign Out
        </div>
    )
    else return;
}


const LogIn = ({toggle}) => {
    
    return (
        <div className='cen-item' >
            <EmailLogin />
            <div>
                Do not have an account ? <span onClick={toggle} className='link-1' >Register</span>
            </div>
        </div>
    )
}



const Register = ({toggle}) => {

    return (
        <div className='cen-item' >
            <EmailRegister />
            <div>
            Already Have an account? <span onClick={toggle} className='link-1' >Log In</span>
            </div>
        </div>
    )
}

export const Auth = () => {
    const [ login, setLogin ] = useState(true);
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    function toggleLogin () {
        setLogin( !login );
    }

    useEffect( () => {
        if(user) navigate( location.state || '/' );
    }, [user] )

    if(loading) return <Loading />

    return (
        <div style={{ flexGrow: '1' }} className='cen-item' >
            { login ? <LogIn toggle={toggleLogin} /> : <Register toggle={toggleLogin} /> }
        </div>
    )
};


export const PrivateRoute = ( {children} ) => {

    const { user, loading } = useContext( AuthContext );
    const location  = useLocation();

    useEffect( () => {
        if( !user )  return <Navigate to='/auth' state={location?.pathname} />
    }, [user] )

    if(loading) return <Loading />
    else return children;
}



