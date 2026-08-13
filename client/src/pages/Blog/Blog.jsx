import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogsAsync } from "../../store/slices/blogSlice";

const Blog = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogsAsync());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow dark:text-white">
          Aggregating live construction insights...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-6 rounded-xl shadow">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 h-full flex flex-col overflow-hidden">
      {/* Heading (Stays fixed at the top) */}
      <div className="flex items-baseline justify-between flex-shrink-0">
        <h1 className="text-4xl font-bold dark:text-white">ConTech Insights</h1>
        <span className="text-xs font-semibold px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full">
          {posts.length} Live Articles
        </span>
      </div>

      {/* Scrollable Feed Container */}
      <div className="grid gap-6 overflow-y-auto flex-1 pr-2 pb-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow transition hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded">
                  {post.source}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(post.date).toLocaleDateString()}
                </span>
              </div>

              <h2 className="text-2xl font-semibold mb-3 dark:text-white">
                {post.title}
              </h2>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {post.content}
              </p>
            </div>

            <div>
              <a
                href={post.link}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-blue-600 hover:text-blue-700 font-medium"
              >
                Read Full Article →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
