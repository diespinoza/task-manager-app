const mongoose = require('mongoose');


//Why schema? to have consistent object for your database
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    //basic validations
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name cannot be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false
  },
});


module.exports = mongoose.model('Task', TaskSchema);
