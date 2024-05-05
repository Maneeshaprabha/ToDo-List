const express = require('express');
const Todo = require('../models/todoModel');

const {
    createTodo,
    getTodo,
    getTodos,
    deleteTodo,
    updateTodo,
} = require('../controllers/todoController');

const router = express.Router();

// Get all todos
router.get('/', getTodos);

// Get a single todo by ID
router.get('/:id', getTodo);

// Create a new todo
router.post('/', createTodo);

// Delete a todo by ID
router.delete('/:id', deleteTodo);

// Update a todo by ID
router.patch('/:id', updateTodo);

module.exports = router;
