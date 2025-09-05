import express from 'express';
import Todo from '../models/Todo.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

// Get all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(todos);
});

// Add todo
router.post('/', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Text is required' });
  const todo = await Todo.create({ user: req.user._id, text });
  res.status(201).json(todo);
});

// Update todo
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  const todo = await Todo.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { $set: { ...(text !== undefined && { text }), ...(completed !== undefined && { completed }) } },
    { new: true }
  );
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
});

// Delete todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await Todo.findOneAndDelete({ _id: id, user: req.user._id });
  if (!result) return res.status(404).json({ message: 'Todo not found' });
  res.json({ message: 'Deleted' });
});

export default router;
