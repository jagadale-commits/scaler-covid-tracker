const express = require('express');
const router = express.Router();
const Report = require('../models/Report')
router.route('/')
  .get((req, res) => {
    Report.find()
    .then( allReports => {
    res.render('pages/index', {
      number: allReports.length
    })
  })
})
  .post((req, res) => {
    res.status(405).send('Method Not Supported')
  });

module.exports = router;
