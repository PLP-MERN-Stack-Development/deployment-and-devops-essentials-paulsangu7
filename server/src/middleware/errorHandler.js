module.exports = function (err, req, res, next) {
  console.error('ERROR:', err && err.message ? err.message : err);
  res.status(500).json({ message: err.message || 'Server Error' });
};
