const Hero = () => {
  return (
    <section className="relative bg-black text-white py-20 px-8 rounded-3xl mx-8 mt-8 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Learn together, Grow together
        </h1>
        <p className="text-gray-300 mb-8 text-lg">
          Find Your Perfect Study Partner Or Task Mates— Stay Focused, Stay
          Accountable, And Learn More Effectively.
        </p>
        <button className="px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition text-lg font-semibold">
          Get started
        </button>
        <p className="text-gray-400 mt-4 text-sm">
          Join Thousands Of Learners Already Staying Motivated Worldwide
        </p>
      </div>

      {/* Floating Images */}
      <div className="absolute top-10 left-10 w-32 h-24 bg-gray-700 rounded-2xl overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
      </div>
      <div className="absolute bottom-10 left-20 w-24 h-32 bg-gray-700 rounded-2xl overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500"></div>
      </div>
      <div className="absolute top-20 right-10 w-28 h-28 bg-gray-700 rounded-2xl overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500"></div>
      </div>
      <div className="absolute bottom-20 right-20 w-32 h-28 bg-gray-700 rounded-2xl overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500"></div>
      </div>
      <div className="absolute bottom-32 right-48 w-28 h-32 bg-gray-700 rounded-2xl overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500"></div>
      </div>
    </section>
  );
};

export default Hero;
