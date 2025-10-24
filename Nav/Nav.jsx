import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { SignOut } from '../auth/auth';
import { AuthContext } from '../auth/context';
import './Nav.css';



export const Nav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user} = useContext(AuthContext)
    //console.log(location)
    

    function handleClick(event, path) {
        event.preventDefault();
        let nav1 = document.getElementById('home-nav');
        let nav2 = document.getElementById('app-nav');
        let nav3 = document.getElementById('install-nav');
        nav1.classList.remove('marked');
        nav2.classList.remove('marked');
        nav3.classList.remove('marked');

        // console.log(event.target , path);
        event.target.classList.add('marked');
        navigate(path);

    }


    function Opener1 () {
        let opener1 = document.getElementById('opener-1');
        //console.log( opener1.style.display )
        if(  opener1.style.display === 'none' || !opener1.style.display )
            opener1.style.display = 'block';
        else
            opener1.style.display = 'none'
    }

    

    return (
        <nav style={{ minHeight: '4rem' }} >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} >
                <img src='/logo1.jpg' style={{ height: '2rem' }} />
                <span style={{ color: 'var(--color4)', fontWeight: '600' }} >SkillUp</span>
            </div>

            <div onClick={ () => navigate('/') } style={{ cursor: 'pointer' }} className={ `${location.pathname === '/'? 'hilit-1': ''}` } >Home</div>

            { user ? 
                <button className='button-1 back-image-3' title={user.displayName} onClick={Opener1} style={{ position: 'relative', padding: '2px', height: '2.5rem', width:'2.5rem',
                    backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `url(${user.photoURL})` }}  >
                    
                    <div id='opener-1' className='button-1' >
                        <div onClick={()=> navigate('/profile')} className='button-1' >Profile</div>
                        <div onClick={ () => navigate('/') } className='button-1' >Home</div>
                        <SignOut />
                    </div>
                </button> :
                
                <button onClick={()=> navigate("/auth")} className='button-1' >
                    Login
                </button>
            }
            

            
        </nav>
    );
};

