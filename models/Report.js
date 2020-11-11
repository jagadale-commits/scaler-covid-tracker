const { model, Schema } = require('mongoose');

const reportSchema = new Schema({
  name: String,
  age: String,
  gender: String,
  state: String,
  district: String,
  city: String,
  latitude: String,
  longitude: String,
  createdAt: String,
});

module.exports = model('Report', reportSchema);
 