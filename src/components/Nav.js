import '../App.css';
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import GoogleLogin from 'react-google-login'
import { toast } from 'react-toastify';
import { Menu, MenuItem, Divider } from '@material-ui/core';

//material-ui
import MenuIcon from '@material-ui/icons/Menu';

import axios from 'axios';

import logo from '../img/logo.svg'
import nav from '../img/nav.svg'

//firebase
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";

export var ActiveUser = null
export var profilePic = null



function Nav({ isLoggedIn, customerId }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [currentUsername, setCurrentUsername] = useState(null);

    const navStyle = {
        color: "white"
    }
    function updateUsers(email, googleId, userName){
      firebase.database().ref(`users/${googleId}`).set({
        UserName: userName,
        email: email,
        planStatus: 'inactive',
        planDuration: 0,
        plan: 'Starter',
        clientSecret: 0,
        customerObj: 0,
        subscriptionObj: 0

  
      })
    }

    useEffect(() => {
      if(JSON.parse(localStorage.getItem('user')) === null) return
      setCurrentUsername(JSON.parse(localStorage.getItem('user')).profileObj.name)
    }, [])



    const responseGoogle = (response)=>{
      console.log(response)
      ActiveUser = `Active User: ${response.profileObj.givenName} ${response.profileObj.familyName}` 
      toast.success(ActiveUser)
      localStorage.setItem('user', JSON.stringify(response))

      document.getElementById('profilePic').removeAttribute('hidden')
      document.getElementById('profilePic').src = JSON.parse(localStorage.getItem('user')).profileObj.imageUrl

      firebase.database().ref(`users/${response.profileObj.googleId}`).on('value',(snap)=>{
        if(snap.exists()){
          window.location.reload()
        }
        else{
          updateUsers(response.profileObj.email, response.profileObj.googleId, `${response.profileObj.givenName} ${response.profileObj.familyName}`)
          window.location.reload()
        }
      });

      
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openCustomerPortal = async () => {

    if(customerId == undefined){
        toast.info('You Need To Buy A Plan To See This Information!')
        return
    }
    setAnchorEl(null);

    const res = await axios.post('https://connect-quiz-now.herokuapp.com/create-customer-portal-session', {customerId: customerId});

    const {redirectUrl} = res.data;
    console.log(redirectUrl)

    window.location = redirectUrl


    if (res.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(res.error.message);
    } else {
        //
    }

  };

  const logOut = () => {
    localStorage.removeItem('user')
    window.location.reload()
  }

  return (
    <nav>
        <ul>
            <img 
              hidden 
              aria-controls="simple-menu" 
              aria-haspopup="true" 
              onClick={handleClick} 
              alt="profile-pic" 
              style={{
                borderRadius:'100px', 
                marginLeft:'-20px',
                margin:'5px',
              }} 
              className='liright' 
              height='40px' 
              width='40px' 
              id='profilePic'>
            </img>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{width:'150px', marginTop:'30px', padding:'5px', display:'flex', alignItems:'center', marginRight:'10px'}}
            >
              <MenuItem style={{borderBottom:'1px solid grey', width:'150px'}} onClick={handleClose}>Signed in as <br></br> {currentUsername}</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={openCustomerPortal}>Subscription</MenuItem>
              <MenuItem style={{backgroundColor:'rgb(220, 0, 78)', color:'white', fontWeight:'bold', borderRadius:'5px'}} onClick={logOut}>Logout</MenuItem>
            </Menu>
            {isLoggedIn ?
              null
              :
              <Link to='/login'>
                <li className="liright nav-links">Login</li>
              </Link>
            }
            <img id='home' onClick={()=>{window.location = '/'}} className="nav-links lileft" alt="connect-logo" width={50} height={50} src={logo}/>
            <Link to='/play'>
            <li className="nav-links lileft">Play</li>
            </Link>
            <div className="dropdown lileft nav-links">
              <button className="dropbtn"><MenuIcon /></button>
                <div className="dropdown-content">
                  <a href="/play">PLAY</a>
                  <a href="/newquiz">NEW QUIZ</a>
                  <a href="/browsequizes">QUIZZES</a>
                  <a href="/plans">PLANS</a>
                  <a href="/login">LOGIN</a>
                </div>
            </div>
            <Link style={navStyle} to='/newquiz'>
              <li className="nav-links lileft">New Quiz</li>
            </Link>
            <Link style={navStyle} to='/browsequizes'>
              <li className="nav-links lileft">Browse Existing Quizzes</li>
            </Link>
            <Link style={navStyle} to='/plans'>
              <li className="nav-links lileft">plans</li>
            </Link>
        </ul>
    </nav>

  );
}

export default Nav;