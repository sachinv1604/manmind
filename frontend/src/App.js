import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [ideaText, setIdeaText] = useState('');
  const [message, setMessage] = useState('');
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/ideas');
      setIdeas(res.data);
    } catch {
      setMessage('Cannot load ideas');
    }
  };

  const submitIdea = async () => {
    if (!ideaText.trim()) {
      setMessage('Please enter an idea.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/ideas', { text: ideaText });
      setMessage('Idea submitted successfully!');
      setIdeaText('');
      fetchIdeas(); // refresh the list
    } catch {
      setMessage('Error submitting idea.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 >mankind - Idea Sharing</h1>

      <textarea
        value={ideaText}
        onChange={e => setIdeaText(e.target.value)}
        rows={4}
        placeholder="Write your brilliant idea here..."
        style={{ width: '100%', padding: 10, fontSize: 16 }}
      />
      <button onClick={submitIdea} style={{ marginTop: 10, padding: '10px 20px', fontSize: 16 }}>
        Submit Idea
      </button>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}

      <h2>All Ideas</h2>
      <ul>
        {ideas.map((idea) => (
          <li key={idea._id} style={{ marginBottom: 8 }}>
            {idea.text} <small style={{ color: '#666' }}>({new Date(idea.createdAt).toLocaleString()})</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
