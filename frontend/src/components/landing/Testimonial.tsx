import { Star } from "lucide-react";
const Testimonial = () => {
  return (
    <section className="py-20 px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          What Our Users Say
        </h2>
        <p className="text-gray-600 text-center mb-16">
          See What Users Says About Our ProTime App
        </p>

        <div className="bg-black rounded-3xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-6">
                "Matching with a study buddy who shares my schedule and goals
                has kept me on track. I actually look forward to our sessions!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-bold text-sm">Roger Vilson</p>
                  <p className="text-gray-500 text-xs">Student</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-6">
                "This is brilliant! I love how this app pairs me with
                accountability partners who keep me motivated. I've never been
                this productive."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-bold text-sm">Anna Stark</p>
                  <p className="text-gray-500 text-xs">Designer</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-6">
                "Group study rooms helped my project team stay aligned—we use it
                for both school projects and online learning."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-bold text-sm">Rakesh Raj</p>
                  <p className="text-gray-500 text-xs">Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
