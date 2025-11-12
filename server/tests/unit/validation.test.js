const { validateBug } = require('../../src/utils/validation');

describe('validateBug', () => {
  test('rejects empty title', () => {
    const res = validateBug({ title: '' });
    expect(res.error).toBe('Title is required');
  });

  test('accepts valid bug', () => {
    const res = validateBug({ title: 'Fix login' });
    expect(res.error).toBeNull();
  });

  test('rejects invalid status', () => {
    const res = validateBug({ title: 'X', status: 'invalid' });
    expect(res.error).toBe('Invalid status');
  });
});
