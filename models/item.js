const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  id: {
    type: String
  },
  dueDate: {
    type: String | null
  },
  title: {
    type: String
  },
  text: {
    type: String
  },
  completed: {
    type: Boolean
  }
});

module.exports = mongoose.model("item", itemSchema);
