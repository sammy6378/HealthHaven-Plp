import React from 'react'

import {GoogleLogout} from 'react-google-login'


const clienId = "403625918155-rk4ftcc0qbvfjhelvu3oomqe4rec1ik2.apps.googleusercontent.com";
const onSuccess = () => {
  console.log('Logout successful');
};

function googleLogout() {
  return (
    <div id='signOutButton'>
        <GoogleLogout
            clientId={clienId}
            buttonText='Logout'
            onLogoutSuccess={onSuccess}
        />
    </div>
  )
}

export default googleLogout;