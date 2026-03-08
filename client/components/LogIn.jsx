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
						navigator.geolocation.getCurrentPosition(resolve, reject, {
							timeout: 2000,
							maximumAge: 1000 * 60 * 60 * 24,
							enableHighAccuracy: false,
						});
					});
					location = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};
					console.log(location);
				} catch (err) {
					console.warn('Geolocation permission denied or error:', err);
				}
			}

			const res = await fetch('/auth/google', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
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
    <div id="login-container" className="login-container">
      <div>
        <img className="Logo" src={logo} />
      </div>

      <div id="user-header-before-login" className="user-header-before-login">
        <h1>Welcome! Please Log-In:</h1>
      </div>

			<div id='google-button' className='google-button'>
				<GoogleLogin
					onSuccess={handleSuccess}
					onError={() => console.log('Login Failed')}
				/>
			</div>
		</div>
	);
}
