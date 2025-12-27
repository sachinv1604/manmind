import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [ideaText, setIdeaText] = useState('');
  const [message, setMessage] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchIdeas();
    createBrainEmojis(60);
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
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/ideas', { text: ideaText });
      setMessage('Idea submitted successfully!');
      setIdeaText('');
      fetchIdeas();
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('Error submitting idea.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  function createBrainEmojis(count = 60) {
    for(let i = 0; i < count; i++) {
      const brain = document.createElement('div');
      brain.textContent = '🧠';
      brain.className = 'brain-emoji';
      brain.style.left = Math.random() * 100 + 'vw';
      brain.style.animationDuration = (8 + Math.random() * 12) + 's';
      brain.style.animationDelay = (Math.random() * 10) + 's';
      brain.style.fontSize = (20 + Math.random() * 15) + 'px';
      document.body.appendChild(brain);
    }
  }

  return (
    <div className="app-wrapper">
      <div className="container">
        {/* Header Section */}
        <div className="header-section">
          <h1 className="main-title">
            MANMIND
          </h1>
          <div className="title-divider"></div>
          <p className="subtitle">
            Share Your Suggestions and Innovative Ideas to Organizations
          </p>
        </div>

        {/* Navigation */}
        <nav className="navigation">
          <div className="nav-links">
            <a href="learderb.html" className="nav-link">🏆 Leaderboard</a>
            <a href="instr.html" className="nav-link">📋 Instructions</a>
            <a href="company.html" className="nav-link">🏢 Companies</a>
          </div>
        </nav>

        {/* Main Content */}
        <div className="content-grid">
          {/* Submit Idea Section */}
          <div className="card submit-card">
            <h2 className="card-title">
              <span className="card-icon">💡</span>
              Submit Your Idea
            </h2>
            
            <textarea
              value={ideaText}
              onChange={e => setIdeaText(e.target.value)}
              rows={6}
              placeholder="Write your brilliant idea here... 

Example: Hey Amazon, I have an idea to improve..."
              className="idea-textarea"
            />
            
            <button
              onClick={submitIdea}
              disabled={isSubmitting}
              className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
            >
              {isSubmitting && <span className="shimmer"></span>}
              <span className="button-text">
                {isSubmitting ? '✨ Submitting...' : '🚀 Submit Idea'}
              </span>
            </button>

            {message && (
              <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}
          </div>

          {/* Ideas List Section */}
          <div className="card ideas-card">
            <h2 className="card-title">
              <span className="card-icon">💭</span>
              Recent Ideas ({ideas.length})
            </h2>
            
            <div className="ideas-list">
              {ideas.length === 0 ? (
                <div className="no-ideas">
                  <p>No ideas yet. Be the first to share!</p>
                </div>
              ) : (
                ideas.map((idea) => (
                  <div key={idea._id} className="idea-item">
                    <p className="idea-text">{idea.text}</p>
                    <div className="idea-meta">
                      <span>🕐</span>
                      <span>{new Date(idea.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>Made with 💜 by innovative minds</p>
        </div>
      </div>
    </div>
  );
}

export default App;