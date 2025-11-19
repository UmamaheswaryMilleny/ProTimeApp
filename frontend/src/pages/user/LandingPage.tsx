import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Feature from "../../components/landing/Feature";
import HowItWorks from "../../components/landing/HowItWorks";
import Pricing from "../../components/landing/Pricing";
import Blog from "../../components/landing/Blog";
import Testimonial from "../../components/landing/Testimonial";
import Footer from "../../components/landing/Footer";
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      <Navbar />
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Feature />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Pricing Section */}
      <Pricing />

      {/* Testimonials Section */}
      <Testimonial />

      {/* Blog Section */}

      <Blog />
      {/* Footer */}

      <Footer />
    </div>
  );
};

export default LandingPage;
