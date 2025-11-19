import { Clock } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <Clock className="w-6 h-6 text-purple-600" />
        <span className="text-xl font-bold text-gray-800">Pro⏰Time</span>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <a href="#home" className="text-gray-600 hover:text-gray-800">
          Home
        </a>
        <a href="#features" className="text-gray-600 hover:text-gray-800">
          Features
        </a>
        <a href="#how-it-works" className="text-gray-600 hover:text-gray-800">
          How it works
        </a>
        <a href="#pricing" className="text-gray-600 hover:text-gray-800">
          Pricing
        </a>
        <a href="#testimonials" className="text-gray-600 hover:text-gray-800">
          Testimonials
        </a>
        <a href="#blog" className="text-gray-600 hover:text-gray-800">
          Blog
        </a>
      </div>
      <button className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
        Login/Signup
      </button>
    </nav>
  );
}
