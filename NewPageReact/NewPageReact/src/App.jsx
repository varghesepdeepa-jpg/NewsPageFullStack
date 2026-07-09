import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import SearchBar from './components/SearchBar';
import ArticleCard from './components/ArticleCard';
import ArticleDetail from './components/ArticleDetail';

function NewsFeed({ articles, loading, error, activeQuery, setActiveQuery }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Top sticky navigation menu bars and tabs filter */}
      <Navigation activeQuery={activeQuery} setActiveQuery={setActiveQuery} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <SearchBar currentTopic={activeQuery} onSearchSubmit={setActiveQuery} />

        {error && <p className="text-red-500 text-center font-semibold mt-4">❌ Error: {error}</p>}
        {loading && <p className="text-gray-500 text-center font-medium mt-4 animate-pulse">Loading news stream...</p>}

        {!loading && !error && articles.length > 0 && (
          <main className="mt-8">
            <ArticleCard article={articles[0]} isFeatured={true} />

            <section className="mt-8">
              <h3 className="text-xl font-black text-gray-950 border-b-2 border-gray-900 pb-2 mb-6">
                More Top Headlines
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {articles.slice(1, 9).map((article, index) => (
                  <ArticleCard key={index} article={article} />
                ))}
              </div>
            </section>
          </main>
        )}
      </div>
    </div>
  );
}

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeQuery, setActiveQuery] = useState('technology');

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Completely secure: key is hidden in the C# backend layer now!
    const url = `http://localhost:5069/api/news?q=${encodeURIComponent(activeQuery)}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "error") {
          setError(data.message);
        } else if (data.articles) {
          const validArticles = data.articles.filter(a => a.title && a.title !== '[Removed]');
          setArticles(validArticles);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [activeQuery]);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <NewsFeed 
              articles={articles} 
              loading={loading} 
              error={error} 
              activeQuery={activeQuery} 
              setActiveQuery={setActiveQuery} 
            />
          } 
        />
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;