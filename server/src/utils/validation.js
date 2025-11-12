function validateBug(data) {
  const { title, status } = data;
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return { error: 'Title is required' };
  }
  if (status && !['open','in-progress','resolved'].includes(status)) {
    return { error: 'Invalid status' };
  }
  return { error: null };
}

module.exports = { validateBug };
