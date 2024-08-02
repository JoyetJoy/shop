const express = require('express');
const app = express();
const PORT = process.env.PORT || 4001;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

app.use(bodyParser.json());
app.use(cors());

const http = require('http').Server(app);
const io = require("socket.io")(http, {
    cors: {
        origin: '*',
    }
});

// Routes
const shopifyRouter = require('./src/router/shopify');
const frontendRouter = require('./src/router/shopifyfrondend');
app.use('/webhook', shopifyRouter);
app.use('/api', frontendRouter);

// Database Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database connected');
    http.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
  });
