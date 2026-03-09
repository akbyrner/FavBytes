require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const { OAuth2Client } = require('google-auth-library');
const connectDB = require('../database/db.js');
const User = require('../database/models/User.js');
const Dish = require('../database/models/Dish.js');
const compression = require('compression');
const path = require('path');
const mongoose = require('mongoose');
const upload = require('./upload');

const app = express();
const port = process.env.PORT || 8080;

app.set('trust proxy', 1);

app.use(compression());

connectDB();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(
  cors({
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none',
    },
  }),
);

// Logging middleware
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.url} - Session ID: ${req.sessionID}`,
  );
  next();
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// API Routes
app.get('/api/dishes', async (req, res) => {
  try {
    const dishes = await Dish.find().populate('userId', 'name');
    res.status(200).json(dishes);
  } catch (error) {
    console.error('Error fetching dishes:', error);
    res
      .status(500)
      .json({ message: 'Error fetching dishes', error: error.message });
  }
});

app.post('/auth/google', async (req, res) => {
  const { token, location } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const updateData = {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };
    if (location) {
      updateData.location = { coordinates: location };
    }
    const user = await User.findOneAndUpdate(
      { googleId: payload.sub },
      updateData,
      { upsert: true, new: true },
    );
    req.session.userId = user._id;
    console.log(
      'Successfully authenticated/verified user:',
      user.email,
      'Session UID:',
      req.session.userId,
    );
    res.status(200).json({
      message: 'Authentication successful',
      user: user,
    });
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res
      .status(401)
      .json({ message: 'Authentication failed', error: error.message });
  }
});

app.get('/auth/me', async (req, res) => {
  console.log('/auth/me - Session UserId:', req.session.userId);
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching user', error: error.message });
  }
});

app.post('/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out' });
    }
    res.clearCookie('connect.sid', {
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

app.post('/api/favDish', upload.single('image'), async (req, res) => {
  try {
    const {
      userId,
      name,
      restaurantName,
      description,
      rating,
      price,
      location,
      lat,
      lng,
      tags,
    } = req.body;

    const newDish = await Dish.create({
      userId,
      name,
      restaurantName,
      imageUrl: req.file.location,
      description,
      rating: Number(rating),
      price: Number(price),
      location: { 
        address: location,
        coordinates: { lat: Number(lat), lng: Number(lng) } 
      },
      tags: JSON.parse(tags),
    });
    
    res.status(200).json(newDish);
  } catch (error) {
    console.error('Error saving dish:', error);
    res
      .status(500)
      .json({ message: 'Error saving dish', error: error.message });
  }
});

// Catch-all route to serve the built index.html
app.get(/^(?!\/api|\/auth).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const server = app.listen(port, () => console.log('Server on ' + port));

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed.');
      process.exit(0);
    });
  });
});