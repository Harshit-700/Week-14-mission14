const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');


const taskStore = new Map();


router.get('/', protect, (req, res) => {
  const userTasks = taskStore.get(req.user._id.toString()) || [];
  res.json({
    success: true,
    count: userTasks.length,
    tasks: userTasks,
  });
});


router.post('/', protect, (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: 'Task title is required.' });
  }

  const userId = req.user._id.toString();
  const userTasks = taskStore.get(userId) || [];

  const newTask = {
    id: `task_${Date.now()}`,
    title,
    description: description || '',
    completed: false,
    createdAt: new Date().toISOString(),
    userId,
  };

  userTasks.push(newTask);
  taskStore.set(userId, userTasks);

  res.status(201).json({ success: true, task: newTask });
});

router.patch('/:id', protect, (req, res) => {
  const userId = req.user._id.toString();
  const userTasks = taskStore.get(userId) || [];
  const task = userTasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ success: false, message: 'Task not found.' });
  }

  task.completed = !task.completed;
  res.json({ success: true, task });
});

router.delete('/:id', protect, (req, res) => {
  const userId = req.user._id.toString();
  const userTasks = taskStore.get(userId) || [];
  const index = userTasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Task not found.' });
  }

  userTasks.splice(index, 1);
  taskStore.set(userId, userTasks);

  res.json({ success: true, message: 'Task deleted.' });
});

module.exports = router;
