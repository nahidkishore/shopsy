const express = require('express');
const env = require('dotenv');
const colors = require('colors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
env.config();

//MongoDB connection

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.jolmh.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Database connected successfully');
  })
.catch ((err) => console.error('Database  Connection Failed!'));

app.use(bodyParser());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Hello from server side',
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server is running on port ${PORT}`.cyan.bold));
