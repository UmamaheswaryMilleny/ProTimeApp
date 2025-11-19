import {
  Users,
  Calendar,
  Clock,
  Video,
  Bot,
  Award,
  BarChart3,
  MessageCircle,
} from "lucide-react";

const Feature = () => {
  return (
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          All the tools you need to Thrive
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Designed To Keep You On Track And Help You Level Up—Personally And
          Professionally.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Buddy Matching */}
          <div className="bg-purple-600 text-white p-6 rounded-2xl">
            <Users className="w-10 h-10 mb-4" />
            <h3 className="font-bold text-lg mb-2">Buddy Matching</h3>
            <p className="text-sm text-purple-100">
              Match by availability, goals, and areas of interest—find the
              perfect study buddy made just for you.
            </p>
          </div>

          {/* Second to One */}
          <div className="bg-purple-600 text-white p-6 rounded-2xl">
            <Calendar className="w-10 h-10 mb-4" />
            <h3 className="font-bold text-lg mb-2">Second To-One</h3>
            <p className="text-sm text-purple-100">
              Build, design, and strengthen teams with live and async
              collaboration tools.
            </p>
          </div>

          {/* Calendar */}
          <div className="bg-purple-600 text-white p-6 rounded-2xl">
            <Calendar className="w-10 h-10 mb-4" />
            <h3 className="font-bold text-lg mb-2">Calendar</h3>
            <p className="text-sm text-purple-100">
              Stay organized and plan your study/work schedule with flexible and
              upcoming sessions.
            </p>
          </div>

          {/* Pomodoro Timer */}
          <div className="bg-purple-600 text-white p-6 rounded-2xl">
            <Clock className="w-10 h-10 mb-4" />
            <h3 className="font-bold text-lg mb-2">Pomodoro Timer</h3>
            <p className="text-sm text-purple-100">
              Use a timer to stay laser-focused on both users aligned on what
              needs to get done most—together or solo.
            </p>
          </div>

          {/* Chat & Video */}
          <div className="bg-purple-600 text-white p-6 rounded-2xl">
            <Video className="w-10 h-10 mb-4" />
            <h3 className="font-bold text-lg mb-2">Chat & Video</h3>
            <p className="text-sm text-purple-100">
              Text and video communicate like you're in the same room.
            </p>
          </div>

          {/* Group Rooms */}
          <div className="bg-purple-600 text-white p-6 rounded-2xl">
            <Users className="w-10 h-10 mb-4" />
            <h3 className="font-bold text-lg mb-2">Group Rooms</h3>
            <p className="text-sm text-purple-100">
              More than just 1-on-1: Start group sessions and work together in
              real-time.
            </p>
          </div>

          {/* AI Chat Assistant */}
          <div className="bg-purple-600 text-white p-6 rounded-2xl">
            <Bot className="w-10 h-10 mb-4" />
            <h3 className="font-bold text-lg mb-2">AI Chat Assistant</h3>
            <p className="text-sm text-purple-100">
              Get answers, generate study materials, and stay productive during
              every session—solo or paired.
            </p>
          </div>

          {/* Gamification */}
          <div className="bg-purple-600 text-white p-6 rounded-2xl">
            <Award className="w-10 h-10 mb-4" />
            <h3 className="font-bold text-lg mb-2">Gamification</h3>
            <p className="text-sm text-purple-100">
              Earn points, unlock badges, and climb the leaderboards to stay
              motivated.
            </p>
          </div>

          {/* Reports */}
          <div className="bg-purple-600 text-white p-6 rounded-2xl">
            <BarChart3 className="w-10 h-10 mb-4" />
            <h3 className="font-bold text-lg mb-2">Reports</h3>
            <p className="text-sm text-purple-100">
              Monthly summaries show you your total study time spent, hours done
              together, and goals reached.
            </p>
          </div>

          {/* Community Chat */}
          <div className="bg-purple-600 text-white p-6 rounded-2xl">
            <MessageCircle className="w-10 h-10 mb-4" />
            <h3 className="font-bold text-lg mb-2">Community Chat</h3>
            <p className="text-sm text-purple-100">
              Join the Global Study Lounge or niche study groups where you can
              share tips, ask questions, and stay inspired.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
