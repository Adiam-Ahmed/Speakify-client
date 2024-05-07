import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
const ClientID = process.env.REACT_APP_ClientID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={ClientID}>
      <App />
    </GoogleOAuthProvider>
    
  </React.StrictMode>
);

