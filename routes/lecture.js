const express = require('express');
const Class = require('../models/Class');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Add a lecture to a session
router.post('/:classId/unit/:unitId/session/:sessionId/lecture', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const { classId, unitId, sessionId } = req.params;
  const { title, content } = req.body;
  try {
    const classroom = await Class.findById(classId);
    const unit = classroom.units.id(unitId);
    const session = unit.sessions.id(sessionId);
    session.lectures.push({ title, content });
    await classroom.save();
    res.status(200).json({ message: 'Lecture added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

