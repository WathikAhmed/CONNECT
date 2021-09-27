import React, { useState, useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { toast } from 'react-toastify';

//style
import '../../style/loginStyles.css'

//firebase
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";

//imgs
import logo from '../../img/logo.svg'

import Translations from '../../translations/translations.json'

function Login() {

  const [userLanguage, setUserLanguage] = useState(localStorage.getItem('connectLanguage') || 'english')

    function updateUsers(email, googleId, userName){
        firebase.database().ref(`users/${googleId}`).set({
          UserName: userName,
          email: email,
          planStatus: 'inactive',
          plan: 'Starter',
          clientSecret: 0,
          customerObj: 0,
          subscriptionObj: 0
  
    
        })
      }
  
  
  
      const responseGoogle = (response)=>{
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response))
  
        document.getElementById('profilePic').removeAttribute('hidden')
        document.getElementById('profilePic').src = JSON.parse(localStorage.getItem('user')).profileObj.imageUrl
  
        firebase.database().ref(`users/${response.profileObj.googleId}`).on('value',(snap)=>{
          if(snap.exists()){
            window.location.reload()
            window.location = '/play'
          }
          else{
            updateUsers(response.profileObj.email, response.profileObj.googleId, response.profileObj.name)
            window.location.reload()
            window.location = '/play'
          }
        });
      }
    return (
        <div className='login-main-container'>
            <div className='login-component-container'>
                <img id='home' onClick={()=>{window.location = '/'}} className="nav-links lileft" alt="connect-logo" width={250} height={250} src={logo}/>
                <br></br>
                <h2>{Translations[userLanguage].login.title}</h2>
                <GoogleLogin
                    clientId='701696427912-ajmlkcj3hpo46q5fokhtn5mmeib0m3be.apps.googleusercontent.com'
                    buttonText={Translations[userLanguage].login.googlebutton}
                    onSuccess={responseGoogle}
                    onFailure={()=>{console.log(Error)}}
                    cookiePolicy={'single_host_origin'}
                    style={{backgroundColor: '#e0e0e0'}}
                />
              </div>
        </div>
    )
}

export default Login
