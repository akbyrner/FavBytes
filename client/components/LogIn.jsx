import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
export default function LogIn() {
  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('User signed in:', decoded);
    // Send decoded user info or token to your backend here
  };
  return (
    <div className="login-container">
      <h2>Log in to FavBytes</h2>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log('Login Failed')}
      />
    </div>
  );
}