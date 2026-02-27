require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const port = process.env.PORT || 3001;

// Initialize Google OAuth2 Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('FavBytes API is running...');
});


// Start Server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
