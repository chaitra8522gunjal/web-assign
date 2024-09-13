const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  name: { type: String, required: true },        // New field
  description: { type: String, required: true }, // New field
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Todo', TodoSchema);