const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  id: {
    type: String,
    required: false
  },
  dueDate: {
    type: Number,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: false
  },
  completed: {
    type: Boolean,
    required: false
  },
});

module.exports = mongoose.model('item', itemSchema);
