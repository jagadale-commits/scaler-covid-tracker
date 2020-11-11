const express = require('express');
const path = require('path');

const homeRouter = require('./routes/home');
const geoRouter = require('./routes/geo');
const reportsRouter = require('./routes/report');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static('static'))
app.use(express.json());
app.use(express.urlencoded());



app.use('/', homeRouter);
app.use('/geo/', geoRouter);
app.use('/reports/', reportsRouter);




const mongoose = require('mongoose');
const { MONGODB } = require('./config.js');


mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Started on PORT ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err)
  });

  