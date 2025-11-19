const HowItWorks = () => {
  return (
    <section className="py-20 px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Everything You Need to Learn
        </h2>
        <p className="text-gray-600 text-center mb-16">
          Start Exchanging Skills And Finding Study Buddies In Four Simple Steps
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 className="text-2xl font-bold mb-4">Create Your Profile</h3>
            <p className="text-gray-600">
              Share your goals, availability, and what you're learning (or
              YouTube channel, etc.)—so we can suggest ideal buddies.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 className="text-2xl font-bold mb-4">Match & Start a Session</h3>
            <p className="text-gray-600">
              Find a compatible buddy and launch a 1-on-1 or group Pomodoro
              session with a shared task list.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 className="text-2xl font-bold mb-4">Review & Improve</h3>
            <p className="text-gray-600">
              See what you accomplished, get a quick report, and keep building
              productive streaks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
