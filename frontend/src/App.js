import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

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
    <div className="app-container" style={{ maxWidth: 600, margin: '0 auto', padding: 10 }}>
      <h1>MANKIND</h1>
      <hr className="divider" />

      <h4>SHARE YOUR BRILLIANT IDEA DIRECTLY WITH THE COMPANY</h4>
      <br />
      <header>
      <nav>
        <a href="learderb.html">Leaderboard</a>
        <a href="instr.html">Instructions</a>
        <a href="companies.html">Companies You Can Reachout</a>
      </nav>
      </header>


      <br />
      <textarea
        value={ideaText}
        onChange={e => setIdeaText(e.target.value)}
        rows={4}
        placeholder="Write your brilliant idea here starting with hey companyname, e.g., hey amazon, hey google..."
        style={{ width: '96%', padding: 10, fontSize: 16 }}
      />
      <div style={{ textAlign: 'center' }}>
      <button onClick={submitIdea} style={{ marginTop: 10, padding: '10px 20px', fontSize: 16 }}>
        Submit Idea
      </button>
      </div>

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
