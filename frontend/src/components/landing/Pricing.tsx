const Pricing = () => {
  return (
    <section className="py-20 px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Choose Your Plan
        </h2>
        <p className="text-gray-600 text-center mb-16">
          Free To Start. When You Start To Enjoy Then You Subscribe To Our
          Payment Plan
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="border-2 border-gray-200 rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-6">Free Trial (1 Month)</h3>
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-5xl font-bold">₹0</span>
                <span className="text-gray-600 ml-2">per first month</span>
              </div>
            </div>
            <button className="w-full bg-purple-600 text-white py-3 rounded-full font-semibold hover:bg-purple-700 transition mb-6">
              Get started for free
            </button>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span className="text-sm">Access to 1-on-1 sessions</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span className="text-sm">
                  Pomodoro Calendar: start sessions with certified tutors
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span className="text-sm">
                  Pomodoro Timer: basic focus mode
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span className="text-sm">
                  Productivity support: more ways to stay focused for quality
                  sessions
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span className="text-sm">Gamification and rewards</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span className="text-sm">
                  Can view limited members and community chats
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span className="text-sm">IP Buddy Matches</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span className="text-sm">Learn capped Rules</span>
              </li>
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-6">ProTime Plan</h3>
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-5xl font-bold">₹499</span>
                <span className="text-purple-200 ml-2">
                  /monthly after trial
                </span>
              </div>
            </div>
            <button className="w-full bg-white text-purple-600 py-3 rounded-full font-semibold hover:bg-gray-100 transition mb-6">
              Get all now
            </button>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span className="text-sm">Everything from free</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span className="text-sm">Priority Pomodoro access</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span className="text-sm">Calendar: weekly/month review</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span className="text-sm">Community chat access</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span className="text-sm">
                  AI Chat Assistant to answer any question or generate study
                  materials
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span className="text-sm">Unlimited buddy matches</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span className="text-sm">Detailed reports</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span className="text-sm">Export data via CSV</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
