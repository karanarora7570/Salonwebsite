import { useState, useEffect, useRef } from "react";
import { Scissors, Moon, Sun } from "lucide-react";
import wings2 from "./images/wings2.png";
import wings3 from "./images/wings3.png";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Hero />
        <About />
        <Services />
        <Features />
        <Gallery />
        <Testimonials />
        <BookingBanner />
        <Contact />
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
}

// Navbar Component
function Navbar({
  darkMode,
  toggleDarkMode,
}: {
  darkMode: boolean;
  toggleDarkMode: () => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90  backdrop-blur-md py-2 shadow-lg dark:shadow-purple-900/20"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="flex items-center group">
          <div className="relative h-12 transition-transform duration-300 flex items-center gap-[10px] group-hover:scale-105">
            <div className="h-[34px] w-[34px] flex items-center justify-center">
              <img
                className="h-[34px]"
                src={darkMode ? (isScrolled ? wings2 : wings3) : (isScrolled ? wings3 : wings2)}
                style={{ filter: darkMode ? 'invert(1)' : 'invert(0)' }} 

              />
            </div>
            <h1
              className={
                "text-[26px] whitespace-nowrap font-[math] " +
                (isScrolled ? "text-black " : "text-white")
              }
            >
              Mirror Point Salon
            </h1>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {["Home", "About", "Services", "Gallery", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={
                " hover:text-purple-600 dark:hover:text-purple-300 transition-colors relative group overflow-hidden " +
                (isScrolled ? "text-black" : "text-white")
              }
            >
              <span className="relative z-10">{item}</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
          ))}
          <a
            href="#book"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-purple-500/30"
          >
            Book Now
          </a>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-purple-600" />
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-purple-600" />
            )}
          </button>
          <button
            className="text-gray-800 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {["Home", "About", "Services", "Gallery", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-300 transition-colors py-2 border-b border-gray-200 dark:border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="#book"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-center hover:from-purple-700 hover:to-pink-700 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// Hero Component
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // Animate title with delay
    setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.classList.add("opacity-100", "translate-y-0");
        titleRef.current.classList.remove("opacity-0", "translate-y-10");
      }
    }, 300);

    // Animate subtitle with delay
    setTimeout(() => {
      if (subtitleRef.current) {
        subtitleRef.current.classList.add("opacity-100", "translate-y-0");
        subtitleRef.current.classList.remove("opacity-0", "translate-y-10");
      }
    }, 600);

    // Animate buttons with delay
    setTimeout(() => {
      if (buttonsRef.current) {
        buttonsRef.current.classList.add("opacity-100", "translate-y-0");
        buttonsRef.current.classList.remove("opacity-0", "translate-y-10");
      }
    }, 900);

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="Salon Interior"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 z-10"></div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-1/4 w-2 h-2 rounded-full bg-purple-500 animate-ping opacity-75"></div>
        <div className="absolute top-40 right-1/3 w-3 h-3 rounded-full bg-pink-500 animate-ping opacity-50 animation-delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-2 h-2 rounded-full bg-blue-500 animate-ping opacity-75 animation-delay-2000"></div>
        <div className="absolute bottom-60 right-1/4 w-3 h-3 rounded-full bg-purple-500 animate-ping opacity-50 animation-delay-3000"></div>
      </div>

      {/* Content */}
      <div ref={heroRef} className="container mx-auto px-4 z-20 text-center">
        <h1
          ref={titleRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight"
        >
          <span className="block text-white">Elevate Your Style at</span>
          <span className="block mt-2 text-5xl sm:text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 animate-gradient-x">
            Mirror Point
          </span>
        </h1>
        <p
          ref={subtitleRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-gray-300"
        >
          Where style meets perfection. Experience premium salon services
          tailored to enhance your unique beauty.
        </p>
        <div
          ref={buttonsRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 flex flex-col sm:flex-row justify-center gap-4"
        >
          <a
            href="#services"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30"
          >
            Our Services
          </a>
          <a
            href="#book"
            className="px-8 py-3 bg-transparent border-2 border-white rounded-full text-lg font-medium text-white hover:bg-white/10 transition-colors hover:border-purple-400 hover:text-purple-300"
          >
            Book Appointment
          </a>
        </div>
      </div>

      {/* Animated Down Arrow */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8 text-purple-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-purple-900/20 to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  );
}

// About Component
function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="about"
      className="bg-white dark:bg-[#0b0d1b] py-16 px-6 md:px-12 lg:px-24 transition-colors duration-300"
    >
      {/* Heading */}
      <h2 className="text-4xl text-center font-bold mb-4 text-gray-900 dark:text-white">
        About Us
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Image */}
        <div
          className={`relative opacity-0 translate-y-10 transition-all duration-700 ease-out delay-200 
          ${isVisible ? "opacity-100 translate-y-0" : ""}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg transform rotate-3 scale-95 z-0 blur-md"></div>
          <div className="relative overflow-hidden rounded-lg">
            <img
              src="https://img.freepik.com/free-photo/vintage-chairs-barbershop_155003-10150.jpg"
              alt="Salon Interior"
              className={`object-cover w-full h-full rounded-lg shadow-lg scale-95 transition-transform duration-700 ease-out 
              ${isVisible ? "scale-100" : ""}`}
              loading="lazy"
            />
          </div>
          <div
            className="absolute cursor-pointer -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-lg shadow-xl z-20 flex items-center justify-center 
          transform hover:scale-110 transition-transform duration-300"
          >
            <div className="text-center text-white">
              <p className="text-4xl font-bold">10+</p>
              <p className="text-md">Years of Excellence</p>
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div
          className={`opacity-0 translate-y-10 transition-all duration-700 ease-out delay-500 
          ${isVisible ? "opacity-100 translate-y-0" : ""}`}
        >
          <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
            Welcome to Mirror Point Saloon
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            At Mirror Point Saloon, we believe that beauty is a reflection of
            your inner self. Since our establishment, we have been dedicated to
            providing exceptional grooming services that enhance your natural
            beauty and boost your confidence.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Our team of skilled professionals is passionate about staying
            updated with the latest trends and techniques in the beauty
            industry. We use premium products and provide personalized services
            to ensure that every client leaves our salon feeling refreshed and
            rejuvenated.
          </p>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 transition-all duration-300 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500/30 cursor-pointer transform hover:scale-105 shadow-lg">
              <h4 className="text-lg font-bold mb-2 text-purple-600 dark:text-purple-300">
                Our Mission
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                To transform and enhance your natural beauty with our expert
                services.
              </p>
            </div>
            <div className="bg-gray-100 transition-all duration-300 cursor-pointer dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-pink-500/30  transform hover:scale-105 shadow-lg">
              <h4 className="text-lg font-bold mb-2 text-pink-600 dark:text-pink-300">
                Our Vision
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                To be the leading salon known for excellence and innovation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Component
function Services() {
  const [activeCategory, setActiveCategory] = useState<
    "basics" | "hairTreatment" | "facials" | "colourBar"
  >("basics");
  const sectionRef = useRef<HTMLDivElement>(null);
  const priceCardRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const services = {
    basics: [
      { name: "Haircut (Without Wash)", price: 80 },
      { name: "Haircut (With Wash)", price: 100 },
      { name: "Hair Styling (With Wash)", price: 50 },
      { name: "Kids Haircut (Upto 10 Years)", price: 50 },
      { name: "Beard Trimming", price: 50 },
      { name: "Shaving", price: 50 },
      { name: "Threading", price: 50 },
      { name: "Face Wax", price: 50 },
      { name: "Head Massage", price: 50 },
      { name: "Head Massage (With Massager)", price: 100 },
      { name: "Mustache Setting", price: 100 },
      { name: "Mustache Stitching", price: 200 },
    ],
    hairTreatment: [
      { name: "Hair Straightening", price: 1000 },
      { name: "Hair Smoothening", price: 1500 },
      { name: "Keratin", price: 1500 },
      { name: "Kera Smooth", price: 2000 },
      { name: "Hair Curly", price: 1000 },
      { name: "Hair Pumming", price: 1500 },
      { name: "Hair Spa (Basic)", price: 300 },
      { name: "Hair Spa (Anti Dandruff/Hairfall)", price: 500 },
    ],
    facials: [
      { name: "Cleansing/Facewash", price: 50 },
      { name: "Scrub", price: 150 },
      { name: "Scrub (O3+)", price: 250 },
      { name: "D-Tan Pack", price: 150 },
      { name: "D-Tan (O3+)", price: 250 },
      { name: "Cleanup", price: 300 },
      { name: "Simple Facial", price: 500 },
      { name: "Skin Whitening/Vitamin C Facial", price: 700 },
      { name: "Pure Gold Facial", price: 1000 },
      { name: "Diamond Facial", price: 1500 },
      { name: "Groom Facial", price: 3000 },
    ],
    colourBar: [
      { name: "Beard Colour", price: 100 },
      { name: "Hair Colour (Simple)", price: 100 },
      { name: "Hair Colour (Matrix)", price: 150 },
      { name: "Hair Colour (Loreal)", price: 250 },
      { name: "Global Hair Colour", price: 350 },
      { name: "Highlight (Per Streak)", price: 50 },
    ],
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    if (priceCardRef.current) {
      observer.observe(priceCardRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (priceCardRef.current) observer.unobserve(priceCardRef.current);
    };
  }, []);

  const categoryTitles = {
    basics: "Basics",
    hairTreatment: "Hair Treatment",
    facials: "Facials",
    colourBar: "Colour Bar",
  };

  return (
    <section
      id="services"
      className="py-20 bg-gray-100 dark:bg-black relative overflow-hidden transition-colors duration-300"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-purple-900/10 to-transparent"></div>
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-purple-800 rounded-full blur-3xl opacity-30 dark:opacity-100"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-pink-600 rounded-full blur-3xl opacity-30 dark:opacity-100"></div>

      <div
        ref={sectionRef}
        className="container mx-auto px-4 opacity-0 translate-y-10 transition-all duration-700 relative z-10"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            We offer a wide range of premium salon services to enhance your look
            and boost your confidence. Explore our service categories below.
          </p>
        </div>

        {/* Service Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(
            Object.keys(categoryTitles) as Array<
              "basics" | "hairTreatment" | "facials" | "colourBar"
            >
          ).map((category, index) => (
            <button
              key={category}
              ref={(el) => (categoryRefs.current[index] = el)}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full transition-all duration-500 transform hover:scale-105 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {categoryTitles[category]}
            </button>
          ))}
        </div>

        {/* Price List Card */}
        <div
          ref={priceCardRef}
          className="max-w-4xl mx-auto bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl opacity-0 translate-y-10 transition-all duration-700 delay-300 border border-gray-200 dark:border-gray-800"
        >
          <div className="relative h-48 bg-gradient-to-r from-purple-900 to-pink-900 overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Salon Service"
                className="object-cover w-full h-full opacity-30 mix-blend-overlay"
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center h-24 w-24 mb-2 animate-pulse">
                <img className="h-[92px]" src={wings2} />
              </div>
              <h3 className="text-3xl font-bold text-white">Price List</h3>
              <div className="w-16 h-1 bg-white mt-2"></div>
            </div>
          </div>

          <div className="p-6">
            <h4 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              {categoryTitles[activeCategory]}
            </h4>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {services[activeCategory].map((service, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 group hover:border-purple-500 transition-colors duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                    {service.name}
                  </span>
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                    ₹{service.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50 text-center">
            <p className="text-gray-100 mb-4">
              Book your appointment today and experience our premium services.
            </p>
            <a
              href="#book"
              className="inline-block px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors transform hover:scale-105 duration-300 shadow-lg"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Features Component
function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  const features = [
    {
      icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z",
      title: "Premium Styling",
      description:
        "Our expert stylists use the latest techniques and premium products to create stunning looks tailored to your unique style.",
    },
    {
      icon: "M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z",
      title: "Relaxing Experience",
      description:
        "Enjoy a peaceful atmosphere with comfortable seating, soothing music, and complimentary refreshments during your visit.",
    },
    {
      icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
      title: "5-Star Service",
      description:
        "We pride ourselves on delivering exceptional customer service and ensuring every client leaves feeling satisfied and confident.",
    },
    {
      icon: "M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z M6 6h.008v.008H6V6z",
      title: "Trendy Techniques",
      description:
        "Stay ahead of the curve with our stylists who are continuously trained in the latest hair and beauty trends and techniques.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gradient-to-b dark:from-black dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-purple-900/10 to-transparent"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-600/10 rounded-full blur-3xl"></div>

      <div
        ref={sectionRef}
        className="container mx-auto px-4 opacity-0 translate-y-10 transition-all duration-700 relative z-10"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Why Choose Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            At Mirror Point Saloon, we're dedicated to providing exceptional
            service and results that exceed your expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRefs.current[index] = el)}
              className="bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 shadow-xl opacity-0 translate-y-10 transition-all duration-700 border border-gray-200 dark:border-gray-800 hover:border-purple-500/30 group"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={feature.icon}
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Gallery Component
function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      alt: "Salon Interior",
      category: "interior",
    },
    {
      src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      alt: "Haircut Service",
      category: "haircut",
    },
    {
      src: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      alt: "Hair Styling",
      category: "styling",
    },
    {
      src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      alt: "Facial Treatment",
      category: "facial",
    },
    {
      src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      alt: "Hair Coloring",
      category: "coloring",
    },
    {
      src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      alt: "Beard Grooming",
      category: "beard",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (galleryRef.current) observer.unobserve(galleryRef.current);
      imageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section
      id="gallery"
      className="py-20 bg-gray-100 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-purple-900/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-pink-900/20 to-transparent rounded-full blur-3xl"></div>

      <div
        ref={sectionRef}
        className="container mx-auto px-4 opacity-0 translate-y-10 transition-all duration-700 relative z-10"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Our Gallery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Take a look at our salon space and the amazing transformations we
            create for our clients.
          </p>
        </div>

        <div
          ref={galleryRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-0 translate-y-10 transition-all duration-700 delay-300"
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              className="relative group overflow-hidden rounded-xl cursor-pointer opacity-0 translate-y-10 transition-all duration-700 shadow-xl"
              onClick={() => setSelectedImage(index)}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-80 w-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 p-4">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-medium">{image.alt}</p>
                  <span className="inline-block px-3 py-1 bg-purple-600/70 rounded-full text-xs mt-2">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full w-full">
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="object-contain max-h-[80vh] mx-auto"
              />
            </div>
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/50 py-2 backdrop-blur-sm">
              <p className="text-lg font-medium">
                {galleryImages[selectedImage].alt}
              </p>
              <span className="inline-block px-3 py-1 bg-purple-600/70 rounded-full text-xs mt-1">
                {galleryImages[selectedImage].category}
              </span>
            </div>
            {selectedImage > 0 && (
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage - 1);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            {selectedImage < galleryImages.length - 1 && (
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage + 1);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

// Testimonials Component
function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Regular Customer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      quote:
        "Mirror Point Saloon has been my go-to place for haircuts for over 2 years now. The staff is professional and the ambiance is amazing. Highly recommended!",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "First-time Customer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      quote:
        "I tried their facial treatment and was blown away by the results. My skin feels refreshed and rejuvenated. Will definitely come back!",
      rating: 5,
    },
    {
      name: "Amit Kumar",
      role: "Monthly Subscriber",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      quote:
        "The hair coloring service at Mirror Point is exceptional. They understand exactly what you want and deliver perfect results every time.",
      rating: 4,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    if (testimonialRef.current) {
      observer.observe(testimonialRef.current);
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (testimonialRef.current) observer.unobserve(testimonialRef.current);
      clearInterval(interval);
    };
  }, [testimonials.length]);

  return (
    <section
      id="testimonials"
      className="py-20 bg-white dark:bg-black relative overflow-hidden transition-colors duration-300"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-purple-900/10 to-transparent"></div>
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20 dark:opacity-100"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-pink-600 rounded-full blur-3xl opacity-20 dark:opacity-100"></div>

      <div
        ref={sectionRef}
        className="container mx-auto px-4 opacity-0 translate-y-10 transition-all duration-700 relative z-10"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            What Our Clients Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients
            have to say about their experience at Mirror Point Saloon.
          </p>
        </div>

        <div
          ref={testimonialRef}
          className="max-w-4xl mx-auto opacity-0 translate-y-10 transition-all duration-700 delay-300"
        >
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-8 transition-all duration-700 shadow-xl border border-gray-200 dark:border-gray-800 ${
                  activeIndex === index
                    ? "opacity-100 translate-x-0 scale-100"
                    : "opacity-0 absolute inset-0 translate-x-20 scale-95"
                }`}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="relative h-24 w-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-purple-500/30">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={
                            i < testimonial.rating ? "currentColor" : "none"
                          }
                          stroke={
                            i < testimonial.rating ? "none" : "currentColor"
                          }
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "text-yellow-500"
                              : "text-gray-500"
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 italic mb-6 relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8 text-purple-500/20 absolute -top-4 -left-2"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                          clipRule="evenodd"
                        />
                      </svg>
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 scale-125 w-8"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Booking Banner Component
function BookingBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      },
      { threshold: 0.1 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  return (
    <section
      id="book"
      className="py-16 bg-gradient-to-r from-purple-900 to-pink-900 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-1/4 w-20 h-20 bg-white rounded-full opacity-10 animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/4 w-12 h-12 bg-white rounded-full opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-white rounded-full opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div
        ref={bannerRef}
        className="container mx-auto px-4 text-center opacity-0 translate-y-10 transition-all duration-700 relative z-10"
      >
        <h2 className="text-4xl font-bold mb-6 text-white">
          Ready for a New Look?
        </h2>
        <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
          Book your appointment today and let our expert stylists transform your
          look. Walk in with expectations, walk out with a smile!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#contact"
            className="px-8 py-3 bg-white text-black rounded-full text-lg font-medium hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Book Appointment
          </a>
          <a
            href="tel:+919056868681"
            className="px-8 py-3 bg-transparent border-2 border-white rounded-full text-lg text-white font-medium hover:bg-white/10 transition-colors"
          >
            Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
}

// Contact Component
function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (formRef.current) observer.unobserve(formRef.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");

      // Reset form after success
      if (formRef.current) {
        formRef.current.reset();
      }

      // Reset status after 3 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gray-100 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-purple-900/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-pink-900/20 to-transparent rounded-full blur-3xl"></div>

      <div
        ref={sectionRef}
        className="container mx-auto px-4 opacity-0 translate-y-10 transition-all duration-700 relative z-10"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions or want to book an appointment? Reach out to us using
            the form below or contact us directly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              Get In Touch
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full shadow-lg shadow-purple-500/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1 text-gray-900 dark:text-white">
                    Our Location
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    123 Salon Street, Beauty City, 110001
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full shadow-lg shadow-purple-500/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1 text-gray-900 dark:text-white">
                    Phone Numbers
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    SAJAN: 9056868681
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    RAVI: 7743084910
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    ANKIT: 8837697710
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full shadow-lg shadow-purple-500/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1 text-gray-900 dark:text-white">
                    Opening Hours
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Monday - Saturday: 9:00 AM - 9:00 PM
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Sunday: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110 shadow-lg shadow-purple-500/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110 shadow-lg shadow-purple-500/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110 shadow-lg shadow-purple-500/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              Send Us a Message
            </h3>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 opacity-0 translate-y-10 transition-all duration-700 delay-500"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  Service Interested In
                </label>
                <select
                  id="service"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                >
                  <option value="">Select a service</option>
                  <option value="haircut">Haircut</option>
                  <option value="hair-treatment">Hair Treatment</option>
                  <option value="facial">Facial</option>
                  <option value="color">Hair Coloring</option>
                  <option value="beard">Beard Grooming</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className={`w-full py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  formStatus === "submitting"
                    ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-purple-500/20"
                }`}
              >
                {formStatus === "submitting" ? "Sending..." : "Send Message"}
              </button>

              {formStatus === "success" && (
                <div className="p-4 bg-green-100 dark:bg-green-900/50 border border-green-500 rounded-lg text-green-700 dark:text-green-300 animate-fadeIn">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Your message has been sent successfully. We'll get back to
                    you soon!
                  </div>
                </div>
              )}

              {formStatus === "error" && (
                <div className="p-4 bg-red-100 dark:bg-red-900/50 border border-red-500 rounded-lg text-red-700 dark:text-red-300 animate-fadeIn">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    There was an error sending your message. Please try again
                    later.
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer({ darkMode }: { darkMode: boolean }) {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex gap-[3px] items-center mb-4">
              <div className="h-[34px] w-[34px] animate-spin-slow flex items-center justify-center">
                <Scissors
                  className="text-purple-600 dark:text-purple-400"
                  size={24}
                />
              </div>
              <h3 className="text-[22px] font-[math] text-gray-900 dark:text-white">
                Mirror Point Salon
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-md">
              At Mirror Point Salon, we're dedicated to enhancing your natural
              beauty and boosting your confidence with our premium salon
              services.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073  4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 "
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Contact Info
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  123 Salon Street, Beauty City, 110001
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  9056868681
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  info@mirrorpoint.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Mirror Point Salon. All rights
            reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 text-sm hover:text-purple-600 dark:hover:text-purple-400"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 text-sm hover:text-purple-600 dark:hover:text-purple-400"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;
