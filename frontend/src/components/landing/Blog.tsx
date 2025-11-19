const Blog = () => {
  return (
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          From the ProTime Blog
        </h2>
        <p className="text-gray-600 text-center mb-16">
          Tips, Students Ranked Focus Strategies, And Community Stories.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-purple-600 text-white rounded-2xl p-6">
            <p className="text-sm text-purple-200 mb-2">
              July 18, 2025 · Productivity
            </p>
            <h3 className="text-xl font-bold mb-4">
              3 Ways to Make Pomodoros Work for You
            </h3>
            <p className="text-sm text-purple-100 mb-6">
              Master the availability, goals, and study breaks. Get started with
              your study productivity surge with your buddy.
            </p>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
              Read More
            </button>
          </div>

          <div className="bg-purple-600 text-white rounded-2xl p-6">
            <p className="text-sm text-purple-200 mb-2">
              August 1, 2025 · Community
            </p>
            <h3 className="text-xl font-bold mb-4">
              Study Buddy Matching: What Actually Works
            </h3>
            <p className="text-sm text-purple-100 mb-6">
              Discover how compatibility and goal setting are essential to
              seamless collaboration and great study improving.
            </p>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
              Read More
            </button>
          </div>

          <div className="bg-purple-600 text-white rounded-2xl p-6">
            <p className="text-sm text-purple-200 mb-2">July 12, 2025 · AI</p>
            <h3 className="text-xl font-bold mb-4">
              Using AI to Stay Accountable
            </h3>
            <p className="text-sm text-purple-100 mb-6">
              Learn to prompt a personal coach. Our AI provides instant feedback
              and keeps you on track.
            </p>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
