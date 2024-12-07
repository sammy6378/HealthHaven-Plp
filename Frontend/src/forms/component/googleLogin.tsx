import React from 'react'
import {GoogleLogin} from 'react-google-login'


const clienId = "403625918155-rk4ftcc0qbvfjhelvu3oomqe4rec1ik2.apps.googleusercontent.com";

const onSuccess = (response: any) => {
  console.log('Login Success: currentUser:', response.profileObj);
};

const onFailure = (response: any) => {
  console.log('Login Failed:', response);
};

function GoogleLogins() {
  return (
   <div id='signInButton'>
    <GoogleLogin
      clientId={clienId}
      buttonText='Login with Google'
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
   </div>
  )
}

export default GoogleLogins