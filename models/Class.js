const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  units: [{ 
    name: String,
    sessions: [{
      name: String,
      lectures: [{
        title: String,
        content: String
      }]
    }]
  }]
});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;
