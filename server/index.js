require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const connectDB = require('../database/db.js');
const User = require('../database/models/User.js');

const app = express();
const port = process.env.PORT || 3001;

// Connect to Database
connectDB();

// Initialize Google OAuth2 Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('FavBytes API is running...');
});

app.post('/auth/google', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    
    // Find or create the user in the database
    const user = await User.findOneAndUpdate(
      { googleId: payload.sub },
      { 
        email: payload.email,
        name: payload.name,
        picture: payload.picture
      },
      { upsert: true, new: true }
    );

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

// Start Server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
