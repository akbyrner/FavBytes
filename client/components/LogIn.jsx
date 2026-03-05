import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import logo from '../../public/images/FavBytes.png';

export default function LogIn({ onLoginSuccess }) {
  const handleSuccess = async (credentialResponse) => {
    try {
      let location = null;
      if ('geolocation' in navigator) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        } catch (err) {
          console.warn('Geolocation permission denied or error:', err);
        }
      }

      const res = await fetch('/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: credentialResponse.credential,
          location,
        }),
      });

      if (!res.ok) {
        throw new Error('Authentication failed');
      }

      const data = await res.json();
      console.log('Authenticated user:', data.user);
      onLoginSuccess(data.user);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome! Log in to FavBytes</h2>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log('Login Failed')}
      />
      <div><img className='Logo' src={logo}/>
      </div>
    </div>
  );
}
