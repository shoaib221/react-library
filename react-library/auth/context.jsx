import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { auth } from './firebase.config';


export const AuthContext = createContext();


export const AuthProvider = ( {children} ) => {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);


    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })

        return () => {
            unsubscribe();
        }
    }, [])

    const Info = {
        user, setUser, loading, setLoading
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }} >
            {children}
        </AuthContext.Provider>
    );
};


