import React from "react";
import Image from "next/image";
import founder from "../../../public/imagessss.jpg";
import {
  FaBox,
  FaShieldAlt,
  FaHeadset,
  FaLeaf,
  FaMobileAlt,
  FaCreditCard,
  FaTruck,
} from "react-icons/fa";
import Link from "next/link";

const About = () => {
  const features = [
    {
      icon: <FaBox className="w-8 h-8 text-orange-500" />,
      title: "Wide Selection",
      description:
        "Discover a vast collection of premium chocolates from around the world.",
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-orange-500" />,
      title: "Secure Payments",
      description:
        "100% secure payment processing with multiple payment options.",
    },
    {
      icon: <FaTruck className="w-8 h-8 text-orange-500" />,
      title: "Fast Delivery",
      description: "Quick and reliable shipping to your doorstep.",
    },
    {
      icon: <FaLeaf className="w-8 h-8 text-orange-500" />,
      title: "Sustainable Sourcing",
      description: "Ethically sourced cocoa for a better tomorrow.",
    },
  ];

  const team = [
    {
      name: "Roshan Kumar",
      role: "Founder & Developer",
      image: "/team/roshan.jpg",
      bio: "The sole creator and developer behind CocoKart, passionate about creating delightful chocolate experiences through technology.",
    },
  ];

  const techStack = [
    { name: "Next.js", description: "For lightning-fast React applications" },
    { name: "Tailwind CSS", description: "For beautiful, responsive designs" },
    {
      name: "Firebase",
      description: "For authentication and real-time database",
    },
    { name: "Stripe", description: "For secure payment processing" },
    { name: "Redux", description: "For state management" },
    { name: "React Icons", description: "For beautiful icons" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-amber-50 pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Sweet Story
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Crafting moments of joy, one chocolate at a time
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About CocoKart
              </h2>
              <p className="text-gray-600 mb-6">
                Founded in 2023, CocoKart is a premium online chocolate store
                dedicated to bringing you the finest selection of artisanal
                chocolates from around the world. Our passion for quality and
                sustainability drives everything we do.
              </p>
              <p className="text-gray-600 mb-6">
                We work directly with cocoa farmers to ensure fair trade
                practices and the highest quality ingredients. Each chocolate
                bar tells a story of craftsmanship and dedication.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="bg-orange-50 px-4 py-2 rounded-full">
                  <span className="text-orange-600 font-medium">100%</span>{" "}
                  <span className="text-black">  Natural </span>
                </div>
                <div className="bg-orange-50 px-4 py-2 rounded-full">
                  <span className="text-orange-600 font-medium">
                    Eco-Friendly
                  </span>{" "}
                  <span className="text-black">Packaging</span>
                </div>
                <div className="bg-orange-50 px-4 py-2 rounded-full">
                  <span className="text-orange-600 font-medium">Fast</span>{" "}
                  <span className="text-black">    Delivery </span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.pexels.com/photos/918328/pexels-photo-918328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="About CocoKart"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            The Creator
          </h2>
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 shadow-lg">
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-6 border-4 border-white shadow-xl">
                <Image
                  src={founder}
                  alt="Roshan Kumar"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
                Roshan Kumar
              </h3>
              <p className="text-orange-600 text-center font-medium mb-4">
                Founder & Developer
              </p>
              <p className="text-gray-700 text-center">
                The sole creator and developer behind CocoKart, passionate about
                creating delightful chocolate experiences through technology.
              </p>
              <div className="mt-6 flex justify-center space-x-4">
                <Link
                  href="https://github.com/Roshnnnnn"
                  className="text-orange-600 hover:text-orange-700"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>

                <Link
                  href="https://www.linkedin.com/in/roshan-yadav-220208288/"
                  className="text-orange-600 hover:text-orange-700"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2 text-orange-600">
                  {tech.name}
                </h3>
                <p className="text-gray-600">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Experience the Best?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who trust us for their chocolate
            cravings.
          </p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-8 rounded-full transition-colors">
            Shop Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
