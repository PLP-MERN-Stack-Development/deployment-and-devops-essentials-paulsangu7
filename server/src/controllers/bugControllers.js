const Bug = require('../models/Bug');
const { validateBug } = require('../utils/validation');

exports.createBug = async (req, res, next) => {
  try {
    const { error } = validateBug(req.body);
    if (error) return res.status(400).json({ message: error });

    const bug = await Bug.create(req.body);
    res.status(201).json(bug);
  } catch (err) {
    next(err);
  }
};

exports.getBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (err) {
    next(err);
  }
};

exports.updateBug = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const bug = await Bug.findByIdAndUpdate(id, update, { new: true });
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json(bug);
  } catch (err) {
    next(err);
  }
};

exports.deleteBug = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bug = await Bug.findByIdAndDelete(id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
