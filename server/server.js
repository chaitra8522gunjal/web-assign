const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Todo = require('./model/todo');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todo_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// CRUD Routes

// Fetch Todos
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add a new Todo (with name and description)
app.post('/todos', async (req, res) => {
  const { name, description } = req.body;
  const newTodo = new Todo({ name, description });
  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

// Update Todo
app.put('/todos/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id, 
    { completed: req.body.completed }, 
    { new: true }
  );
  res.json(updatedTodo);
});

// Delete Todo
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo deleted' });
});

app.listen(5000, () => { console.log('Server running on port 5000'); });
