const express = require('express');
const Class = require('../models/Class');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Create a new class (Admin/Instructor only)
router.post('/create', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const { name } = req.body;
  try {
    const newClass = new Class({ name, instructor: req.user.userId });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Enroll a student into a class
router.post('/:classId/enroll', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const { classId } = req.params;
  const { studentId } = req.body;
  try {
    const user = await User.findById(studentId);
    if (!user) return res.status(404).json({ message: 'Student not found' });

    user.enrolledClasses.push(classId);
    await user.save();
    res.status(200).json({ message: 'Student enrolled successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
