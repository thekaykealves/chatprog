const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  msg: {
    type: String, 
    required: true
  }
})

const modelMsg = mongoose.model('msg', msgSchema);

module.exports = modelMsg;