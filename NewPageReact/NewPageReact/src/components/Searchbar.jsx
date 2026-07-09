import { useState } from 'react';

function SearchBar({ onSearchSubmit, currentTopic }) {
  const [searchInput, setSearchInput] = useState(currentTopic);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== '') {
      onSearchSubmit(searchInput);
    }
  };

  return (
    <header style={{ marginBottom: '30px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#111' }}>Global News Portal</h1>
      <p style={{ color: '#666' }}>
        Current Topic: <span style={{ fontWeight: 'bold', color: '#0070f3' }}>{currentTopic}</span>
      </p>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <input 
          type="text" 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search news topics (e.g., sports, AI)..."
          style={{ padding: '10px', width: '60%', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <button 
          type="submit"
          style={{ padding: '10px 20px', borderRadius: '6px', border: 'none', backgroundColor: '#111', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Search
        </button>
      </form>
    </header>
  );
}

export default SearchBar;