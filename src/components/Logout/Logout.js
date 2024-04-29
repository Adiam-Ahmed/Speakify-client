import React from 'react';
import { GoogleLogout } from 'react-google-login'
const clientId = process.env.ClientID

const Logout = () => {
    const onSuccess = (res) => {
        console.log("Login Sucess Current user", res.profileObj)
    }

    return (
        <div className='sign-out'> 
            <GoogleLogout
                clientId={clientId}
                buttonText={'Logout'}
                onSuccess={onSuccess}
            />

        </div>
    );
};

export default Logout;