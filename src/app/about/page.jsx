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
  FaLinkedin,
  FaGithub,
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

  const teamMembers = [
    {
      name: "Roshan Kumar",
      role: "Founder & Developer",
      image: founder,
      bio: "The sole creator and developer behind CocoKart, passionate about creating delightful chocolate experiences through technology.",
      linkedin: "https://linkedin.com/in/your-linkedin",
      github: "https://github.com/your-github",
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
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="pt-12 pb-16 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-6 font-montserrat">
              Our Sweet Story
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 font-montserrat leading-relaxed">
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
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-6 font-montserrat">
                About CocoKart
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed font-montserrat">
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
                  <span className="text-gray-700">Natural</span>
                </div>
                <div className="bg-orange-50 px-4 py-2 rounded-full">
                  <span className="text-orange-600 font-medium">
                    Eco-Friendly
                  </span>{" "}
                  <span className="text-gray-700">Packaging</span>
                </div>
                <div className="bg-orange-50 px-4 py-2 rounded-full">
                  <span className="text-orange-600 font-medium">Fast</span>{" "}
                  <span className="text-gray-700">Delivery</span>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-montserrat bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
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
                <h3 className="text-xl font-semibold mb-2 font-montserrat text-orange-500 ">
                  {feature.title}
                </h3>
                <p className="text-gray-700 font-montserrat">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-montserrat bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <div className="flex justify-center">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full max-w-md"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2 font-montserrat text-black">{member.name}</h3>
                    <p className="text-gray-600 font-montserrat mb-2">{member.role}</p>
                    <p className="text-gray-700 font-montserrat leading-relaxed mb-4">{member.bio}</p>
                    <div className="flex justify-center space-x-4">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <FaLinkedin className="w-6 h-6" />
                      </a>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <FaGithub className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-montserrat text-orange-500">
              Our Tech Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-orange-100/50"
                >
                  <h3 className="text-xl font-semibold mb-2 font-montserrat text-orange-500 ">{tech.name}</h3>
                  <p className="text-gray-600 font-montserrat">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Ready to Experience the Best?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto font-montserrat leading-relaxed">
            Join thousands of happy customers who trust us for their chocolate
            cravings.
          </p>
          <Link href="/">
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-8 rounded-full transition-colors">
            Shop Now
          </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
