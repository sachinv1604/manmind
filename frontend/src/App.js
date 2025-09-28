import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';







function App() {
  const [ideaText, setIdeaText] = useState('');
  const [message, setMessage] = useState('');
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
  fetchIdeas();
  createBrainEmojis(80);  // add this line to initiate animation
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



  function createBrainEmojis(count = 100) {
  for(let i = 0; i < count; i++) {
    const brain = document.createElement('div');
    brain.textContent = '🧠';
    brain.className = 'brain-emoji';

    brain.style.left = Math.random() * 100 + 'vw';  // random horizontal
    brain.style.animationDuration = (5 + Math.random() * 10) + 's'; // speed
    brain.style.animationDelay = (Math.random() * 15) + 's'; // stagger

    document.body.appendChild(brain);
  }
}


  return (
    <div className="app-container">
      <h1>MANKIND</h1>
      <hr className="divider" />

      <h4>SHARE YOUR BRILLIANT IDEA DIRECTLY WITH THE COMPANY</h4>
      <br />
      <header>
      <nav>
        <a href="learderb.html">Leaderboard</a>
        <a href="instr.html">Instructions</a>
        <a href="company.html">Companies You Can Reachout</a>
      </nav>
      </header>


      <br />
      <textarea
        value={ideaText}
        onChange={e => setIdeaText(e.target.value)}
        rows={4}
        placeholder="Write your brilliant idea here starting with hey companyname, e.g., hey amazon, hey google..."
        style={{  padding: 10, fontSize: 16 }}
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
