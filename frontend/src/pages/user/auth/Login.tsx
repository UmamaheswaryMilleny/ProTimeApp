import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 bg-black text-white flex flex-col justify-center px-8 lg:px-20 py-12">
        {/* Logo */}
        <div className="mb-12 flex items-center space-x-2">
          <span className="text-blue-500 font-bold text-2xl">Pro⏰</span>
          <span className="font-bold text-2xl">Time</span>
        </div>

        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-3">Sign Up</h1>
          <p className="text-gray-400 mb-8">Join SkillSync and Boost Your Productivity</p>

          {/* Google Sign In */}
          <button className="w-full bg-white text-gray-700 py-3 px-4 rounded-lg flex items-center justify-center space-x-3 hover:bg-gray-100 transition mb-8 cursor-pointer">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium">Continue with Google</span>
          </button>

          <div className="flex items-center mb-8">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-white text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-white text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
    
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-600 transition mt-6 cursor-pointer"
            >
              Sign In
            </button>
          </form>

          {/* <p className="text-gray-400 text-sm mt-6">
            By clicking "Sign up" you're agreeing to our{' '}
            <a href="#" className="text-white underline hover:text-gray-300">
              Terms & Conditions
            </a>.
          </p> */}

          <div className="mt-8 text-center">
            <span className="text-gray-400">Don't have an account? </span>
            <a href="#" className="text-white font-semibold hover:text-gray-300">
              Log in
            </a>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="Professional working on laptop"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            if (target.parentElement) {
              target.parentElement.innerHTML =
                '<div class="w-full h-full bg-gradient-to-br from-stone-200 to-amber-200 flex items-center justify-center"><div class="text-gray-500">Image preview</div></div>';
            }
          }}
        />
      </div>
    </div>
  );
};

export default Signup;
