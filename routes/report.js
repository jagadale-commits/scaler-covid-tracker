const express = require('express');
const { cityFinder } = require('./geo');

const router = express.Router();
const Report = require('../models/Report')

async function createReport({ name, age, gender, state, district, city }) {
  const { longitude, latitude } = global.citiesData[city];

  const newReport = new Report({
        name: name,
        age: age,
        gender: gender,
        state: state,
        district: district,
        city: city,
        latitude: latitude,
        longitude:longitude,
        createdAt: new Date().toISOString()
      });

      const report = await newReport.save();
}

async function removeReport(reportId) {
 
        const report = await Report.findById(reportId);
          await report.delete();
}

router.route('/')
  .get((req, res) => {
    Report.find()
    .then( allReports => {
    res.render('pages/reports', {
      reports: allReports,
      mapboxKey: 'pk.eyJ1Ijoiam95ZGVlcC1pYiIsImEiOiJja2I4eXhpcWEwOTEwMnVwa3ZsOGg3ZmZ1In0.oS2EZQ7fdhItSubL4NMZBA'
    })
  })
})
  .post((req, res) => {
    res.status(405).send('Method Not Supported')
  });


router.route('/new')
  .get((req, res) => {
    res.render('pages/create_report', {});
  })
  .post((req, res) => {
    const { pname: name, age, gender, pstate: state, district, city } = req.body;

    createReport({ name, age, gender, state, district, city });
    res.redirect('/reports')
  });

router.route('/delete/:id')
  .get((req, res) => {
    removeReport(req.params.id);
    res.redirect('/reports')
  });
  
module.exports = router;
