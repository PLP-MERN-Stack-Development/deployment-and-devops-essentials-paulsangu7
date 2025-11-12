import React, { useState } from 'react';
import axios from 'axios';

const BugForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [created, setCreated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCreated(false);

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      const res = await axios.post('/api/bugs', { title, description });
      if (res.data) {
        setCreated(true);
        setTitle('');
        setDescription('');
      }
    } catch (err) {
      setError('Error creating bug');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report Bug</h2>
      {error && (
        <p role="alert" style={{ color: 'red' }}>
          {error}
        </p>
      )}
      <input
        data-testid="title-input"
        type="text"
        placeholder="Enter bug title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        data-testid="desc-input"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <br />
      <button type="submit">Report Bug</button>
      {created && (
        <p data-testid="created-msg" style={{ color: 'green' }}>
          Bug created successfully!
        </p>
      )}
    </form>
  );
};

export default BugForm;
