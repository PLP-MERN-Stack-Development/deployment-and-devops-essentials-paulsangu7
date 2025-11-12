import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const res = await axios.get('/api/bugs');
        setBugs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBugs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (bugs.length === 0) return <p data-testid="empty">No bugs reported yet!</p>;

  return (
    <ul>
      {bugs.map((bug) => (
        <li key={bug._id}>{bug.title}</li>
      ))}
    </ul>
  );
};

export default BugList;
