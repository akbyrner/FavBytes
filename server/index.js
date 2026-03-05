require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const { OAuth2Client } = require('google-auth-library');
const connectDB = require('../database/db.js');
const User = require('../database/models/User.js');
const Dish = require('../database/models/Dish.js');

const app = express();
const port = process.env.PORT || 3001;


connectDB();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'favbytes-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // Set to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.get('/', (req, res) => {
  res.send('FavBytes API is running...');
});

app.get('/api/dishes', async (req, res) => {
  try {
    const dishes = await Dish.find().populate('userId', 'name');
    res.status(200).json(dishes);
  } catch (error) {
    console.error('Error fetching dishes:', error);
    res.status(500).json({ message: 'Error fetching dishes', error: error.message });
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
      picture: payload.picture
    };

    if (location) {
      updateData.location = { coordinates: location };
    }

    const user = await User.findOneAndUpdate(
      { googleId: payload.sub },
      updateData,
      { upsert: true, new: true }
    );

    // Save user ID in session
    req.session.userId = user._id;

    console.log('Successfully authenticated/verified user:', user.email);

    res.status(200).json({
      message: 'Authentication successful',
      user: user
    });

  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
});

app.get('/auth/me', async (req, res) => {
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
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

app.post('/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully' });
  });
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
