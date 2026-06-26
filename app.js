const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/', authRoutes);

mongoose.connect(process.env.MONGO_URI) 
.then(result => {
  app.listen(3000);
})
.catch(err => {
  console.log(err);
});