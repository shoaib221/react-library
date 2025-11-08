import {  updateProfile } from "firebase/auth";
import { auth } from './firebase.config';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context";
import { Loading } from "../miscel/Loading";
import { NotFound } from "../miscel/NotFound";
import { Navigate, useLocation } from "react-router-dom";
import { Grid, Phone } from "lucide-react";
import { toast } from "react-toastify";


export const UpdateProfile = () => {
    const { user, loading, setUser } = useContext(AuthContext);
    const location  =  useLocation();
    const [ name, setName ] = useState(null)
    const [ photo, setPhoto ] = useState(null)
    const [ number, setNumber ] = useState(null)
    const [ email, setEmail ] = useState(null)

    useEffect(()=> {
        if(!user) return;
        //console.log(user)
        setName( user.displayName );
        setPhoto( user.photoURL );
        setNumber( user.phoneNumber );
        setEmail(1)
    }, [user])


    

    function Update () {

        const updation = { displayName: name, photoURL: photo, phoneNumber: number }
        //console.log(updation)

        updateProfile(auth.currentUser, updation ).then(() => {
            toast.success('Profile Updated Succefully')
            //console.log( auth )
        }).catch((error) => {
            toast.error( error.message )
        });
    }

    if( loading ) return <Loading />
    else if(!user) return <Navigate to='/auth' state={location?.pathname} />
    else return (
        <div style={{ flexGrow: '1' }} >
            <div id='profile-head'  >
                <div id='profile-photo' style={{ backgroundImage: `url(${user.photoURL})` }} ></div>
                <div className="cen-item" >
                    <span className="title-1" >{ user.displayName }</span> 
                    <span> { user.email } </span>
                </div>
            </div>

            <div style={{ 
                marginLeft: 'auto', marginRight: 'auto', color: 'white', marginTop: '2rem', padding: '1rem', borderRadius: '1rem',
                display: 'grid', gridTemplateColumns: '1fr 2fr', backgroundColor: 'var(--color4)', width: '90%', maxWidth: '600px', gap: '1rem' }} >
                <span>Name</span>
                <input type="text" value={name} onChange={ (e) => setName(e.target.value) } />
                <span>Photo URL</span>
                <input type="text" value={photo} onChange={ (e) => setPhoto(e.target.value) } />
                <button onClick={ Update } className="button-1 cen-hor" style={{ gridColumn: 'span 2' }} >Update</button>
            </div>

            
        </div>
    )
}

// displayName, email, emailVerified, 
// metadata, phoneNumber, photoURL

