import React from 'react';
import axios from 'axios';

export default function BugItem({ bug, onChange }) {
  const updateStatus = async (newStatus) => {
    try {
      await axios.put(`/api/bugs/${bug._id}`, { status: newStatus });
      onChange();
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  const remove = async () => {
    if (!window.confirm('Delete?')) return;
    try {
      await axios.delete(`/api/bugs/${bug._id}`);
      onChange();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <div data-testid="bug-item">
      <h4>{bug.title} <small>({bug.status})</small></h4>
      <p>{bug.description}</p>
      <button onClick={() => updateStatus('in-progress')}>In progress</button>
      <button onClick={() => updateStatus('resolved')}>Resolve</button>
      <button onClick={remove}>Delete</button>
    </div>
  );
}
