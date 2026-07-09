import { useLocation, useNavigate } from 'react-router-dom';

function ArticleDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // React Router grabs the article data passed during the link click
  const article = location.state?.article;

  // Fallback if someone manually types the URL or data is missing
  if (!article) {
    return (
      <div className="text-center p-10">
        <p className="text-red-500 font-bold">Article details couldn't be loaded.</p>
        <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-gray-900 text-white rounded">
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 max-w-3xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold shadow-sm hover:bg-gray-50 text-gray-700"
      >
        ← Back to Feed
      </button>

      <article className="bg-white rounded-xl shadow-sm overflow-hidden p-6 md:p-10">
        <span className="text-xs font-bold uppercase text-blue-600 tracking-widest block mb-2">
          {article.source?.name || 'News Report'}
        </span>
        <h1 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight">
          {article.title}
        </h1>
        
        {/* Meta details */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500 border-b border-gray-100 pb-4 mb-6">
          {article.author && <span>By <strong className="text-gray-700">{article.author}</strong></span>}
          {article.publishedAt && <span>Published: {new Date(article.publishedAt).toLocaleDateString()}</span>}
        </div>

        {article.urlToImage && (
          <img 
            src={article.urlToImage} 
            alt={article.title} 
            className="w-full h-64 md:h-96 object-cover rounded-xl mb-6 shadow-inner"
          />
        )}

        <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium mb-4">
          {article.description}
        </p>

        <p className="text-gray-600 leading-relaxed mb-6">
          {article.content ? article.content.replace(/\[\+\d+ chars\]/, '') : 'Full text contents are premium content.'}
        </p>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
          <a 
            href={article.url} 
            target="_blank" 
            rel="noreferrer" 
            className="inline-block px-6 py-3 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 shadow"
          >
            Read Original Full Publication →
          </a>
        </div>
      </article>
    </div>
  );
}

export default ArticleDetail;