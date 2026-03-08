import React, { useState, useEffect } from 'react';
import HomePage from './HomePage/HomePage';
import Gallery from './Gallery/Gallery';
import LogIn from './LogIn';
import ImagePage from './ImagePage/ImagePage';
import NavBar from './NavigationBar';
import ImageUpload from './ImageUpload/ImageUpload';
import logo from '../../public/images/FavBytes.png';
import { googleLogout } from '@react-oauth/google';

function MainView({
	view,
	isActive,
	setIsActive,
	user,
	dishes,
	setView,
	setSelectedLocation,
	selectedLocation,
}) {
	return view === 'ImageUpload' ? (
		<ImageUpload
			isActive={isActive}
			setIsActive={setIsActive}
			user={user}
			prefillLocation={selectedLocation}
		/>
	) : view === 'ImagePage' ? (
		<ImagePage isActive={isActive} setIsActive={setIsActive} />
	) : (
		<HomePage
			isActive={isActive}
			setIsActive={setIsActive}
			user={user}
			dishes={dishes}
			setView={setView}
			setSelectedLocation={setSelectedLocation}
		/>
	);
}
export default function App() {
	const [searchArr, setSearchArr] = useState([]);
	const [user, setUser] = useState(null);
	const [isShowingSidebar, setIsShowingSidebar] = useState(false);
	const [isShowingGallery, setIsShowingGallery] = useState(false);
	const [view, setView] = useState('HomePage');
	const [isActive, setIsActive] = useState(false);
	const [dishes, setDishes] = useState([]);
	const [selectedDish, setSelectedDish] = useState(null);
	const [selectedLocation, setSelectedLocation] = useState(null);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const res = await fetch('/auth/me', { credentials: 'include' });
				if (res.ok) {
					const data = await res.json();
					setUser(data.user);
				}
			} catch (err) {
				console.error('Auth check failed:', err);
			}
		};
		checkAuth();
	}, []);

	useEffect(() => {
		fetch('/api/dishes')
			.then((res) => res.json())
			.then((data) => setDishes(data))
			.catch((err) => console.error(err));
	}, []);
	const handleLoginSuccess = (userData) => {
		console.log(userData);
		setUser(userData);
	};

	const handleLogout = async () => {
		try {
			const res = await fetch('/auth/logout', {
				method: 'POST',
				credentials: 'include',
			});

			if (res.ok) {
				setUser(null);
				// Reset UI state too!
				setView('HomePage');
				setIsShowingSidebar(false);
			}
		} catch (err) {
			console.error('Logout failed:', err);
		}
		googleLogout();
		setUser(null);
	};

	const handleToggleSidebar = () => {
		setIsShowingSidebar(!isShowingSidebar);
	};

	const handleToggleGallery = () => {
		setIsShowingGallery(!isShowingGallery);
	};

	return (
		<div id='app-container' className='app-container'>
			{!user ? (
				<LogIn onLoginSuccess={handleLoginSuccess} />
			) : (
				<>
					<div id='logged-in' className='logged-in'>
						<div
							id='user-header-after-login'
							className='user-header-after-login'>
							<div id='profile-container' className='profile-container'>
								{user.picture && (
									<img
										src={user.picture}
										alt={user.name}
										style={{ width: 50, height: 50, borderRadius: '50%' }}
									/>
								)}
								<h1> Welcome,</h1>
								{user.name} 😋
							</div>
							<div id='favBytes-container' className='favBytes-container'>
								<img
									className='Logo'
									src={logo}
									style={{ maxWidth: '250px' }}
								/>
							</div>
							<div id='logout-container' className='logout-container'>
								<button className='button-style' onClick={handleLogout}>
									Log out
								</button>
							</div>
						</div>

						<div id='content-row' className='content-row'>
							<>
								{isShowingSidebar && (
									<NavBar
										setView={setView}
										view={view}
										isShowingGallery={isShowingGallery}
										onToggleGallery={handleToggleGallery}
									/>
								)}

								<div id='main-area' className='main-area'>
									<div id='main-area-menu' className='main-area-menu'>
										<button
											className='button-style'
											onClick={handleToggleSidebar}>
											{isShowingSidebar ? '← Hide Menu' : ' ☰ See Menu'}
										</button>
									</div>
									<div id='main-view' className='main-view'>
										<MainView
											view={view}
											user={user}
											dishes={dishes}
											isActive={isActive}
											setIsActive={setIsActive}
											setView={setView}
											setSelectedLocation={setSelectedLocation}
											selectedLocation={selectedLocation}
										/>
									</div>
									<div id='gallery-menu' className='gallery-menu'>
										<button
											className='button-style'
											onClick={handleToggleGallery}>
											{isShowingGallery
												? '⋆.🗄˚ Hide Gallery ↓'
												: '⋆.📷˚ Show Gallery ↑'}
										</button>
									</div>
								</div>
							</>
						</div>
						{isShowingGallery && (
							<div id='gallery-section' className='gallery-section'>
								<Gallery searchArr={searchArr} setSearchArr={setSearchArr} />
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}
