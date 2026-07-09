import { Link } from 'react-router-dom';

function ArticleCard({ article, isFeatured = false }) {
  if (!article || !article.title) return null;

  // Generate a URL slug safety layer based on titles
  const articleSlug = encodeURIComponent(article.title.substring(0, 30).toLowerCase().replace(/[^a-z0-9]+/g, '-'));

  if (isFeatured) {
    return (
      <section className="mb-10 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
        {article.urlToImage && (
          <img src={article.urlToImage} alt="Feature" className="w-full h-48 sm:h-64 md:h-[400px] object-cover" />
        )}
        <div className="p-5 md:p-8">
          <span className="text-xs font-black uppercase tracking-wider text-red-600">Featured Story</span>
          <h2 className="mt-2 text-xl md:text-3xl font-bold text-gray-900 leading-tight">{article.title}</h2>
          <p className="mt-3 text-gray-600 text-sm md:text-base line-clamp-3">{article.description}</p>
          <div className="mt-4">
            {/* Pass the JSON data smoothly into state down the dynamic route */}
            <Link 
              to={`/article/${articleSlug}`} 
              state={{ article }}
              className="inline-block text-blue-600 font-bold hover:underline text-sm md:text-base"
            >
              Read full article details →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-start transition-all hover:bg-gray-50">
      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} className="w-full md:w-32 h-32 object-cover rounded-lg shrink-0" />
      )}
      <div className="flex-1">
        <h4 className="font-bold text-base md:text-lg text-gray-900 leading-snug line-clamp-2">{article.title}</h4>
        <p className="mt-1 text-xs md:text-sm text-gray-500 line-clamp-2">{article.description}</p>
        <Link 
          to={`/article/${articleSlug}`} 
          state={{ article }}
          className="mt-2 inline-block text-xs font-bold text-blue-600 hover:underline"
        >
          Read Details
        </Link>
      </div>
    </div>
  );
}

export default ArticleCard;