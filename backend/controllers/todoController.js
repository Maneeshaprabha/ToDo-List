const Todo = require('../models/todoModel');
const mongoose = require('mongoose');

// Get all todos
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({}).sort({ createdAt: -1 });
        res.status(200).json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get a single todo
const getTodo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Task not found' });
    }

    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        console.error("Error fetching todo:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new todo
const createTodo = async (req, res) => {
    const { title, description } = req.body;
    let emptyFields = [];

    if (!title) emptyFields.push('title');
    if (!description) emptyFields.push('description');

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
    }

    try {
        const todo = await Todo.create({ title, description });
        res.status(201).json(todo);
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a todo
const deleteTodo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Task not found' });
    }

    try {
        const todo = await Todo.findByIdAndDelete({ _id: id });
        if (!todo) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a todo
const updateTodo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Task not found' });
    }

    try {
        const todo = await Todo.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Run schema validators on update
        });

        if (!todo) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(todo);
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    deleteTodo,
    updateTodo,
};
