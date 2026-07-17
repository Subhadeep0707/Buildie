import { useEffect, useState } from "react";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost/Mywp/wp-json/wp/v2/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow dark:text-white">
          Loading posts...
        </div>
      </div>
    );
  }

  // Error State
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
    <div className="p-6 space-y-6">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold dark:text-white">Buildie Blog</h1>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          {posts.length} Posts
        </span>
      </div>

      {/* Posts */}
      <div className="grid gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="
              bg-white
              dark:bg-gray-800
              border
              border-gray-200
              dark:border-gray-700
              p-6
              rounded-xl
              shadow
              transition
              hover:shadow-lg
            "
          >
            {/* Title */}
            <h2 className="text-2xl font-semibold mb-3 dark:text-white">
              {post.title?.rendered || "Untitled"}
            </h2>

            {/* Date */}
            {/* Meta Info */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Published on {new Date(post.date).toLocaleDateString()} by Admin
            </p>

            {/* Content */}
            <div
              className="
                text-gray-700
                dark:text-gray-300
                leading-relaxed
              "
              dangerouslySetInnerHTML={{
                __html: post.content?.rendered || "No content available",
              }}
            />

            {/* Read More */}
            <a
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="
                inline-block
                mt-5
                text-blue-600
                hover:text-blue-700
                font-medium
              "
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
