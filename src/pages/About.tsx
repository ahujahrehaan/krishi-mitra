
import React from "react";
import { Button } from "@/components/ui/button";
import { Wheat, MapPin, Recycle, TestTube } from "lucide-react";
import { Link } from "react-router-dom";
import FeatureCard from "@/components/FeatureCard";
import PageLayout from "@/components/PageLayout";

const About = () => {
  const teamMembers = [
    {
      name: "Saarthak Mahajan",
      role: "Fullstack Engineer",
      bio: "I’m a Computer Science and Engineering student at Bennett University with a strong passion for cybersecurity, particularly in Web Security and DevSecOps. I’m deeply interested in understanding how systems break, how vulnerabilities emerge, and how to build secure, resilient applications from the ground up. Alongside security, I actively develop web-based projects using the MERN stack and Next.js, combining performance, scalability, and security best practices into real-world applications. I also enjoy working with AI-powered systems and integrating them into applications, exploring how intelligent systems can enhance automation, decision-making, and security workflows. This combination gives me a unique perspective at the intersection of development, security, and emerging AI-driven technologies."
    }
  ];

  const features = [
    {
      icon: <Wheat className="h-10 w-10 text-green-600" />,
      title: "AI-Based Crop & Fertilizer Recommendations",
      description:
        "Smart suggestions tailored to your farm's specific needs and conditions.",
    },
    {
      icon: <MapPin className="h-10 w-10 text-green-600" />,
      title: "Location-aware Soil Analysis",
      description:
        "Leveraging GeoData to provide insights based on your exact location.",
    },
    {
      icon: <Recycle className="h-10 w-10 text-green-600" />,
      title: "Sustainability-focused farming",
      description:
        "Recommendations that preserve soil health and promote long-term sustainability.",
    },
    {
      icon: <TestTube className="h-10 w-10 text-green-600" />,
      title: "Organic & Chemical Fertilizer Insights",
      description:
        "Balanced approaches with preference for organic solutions when possible.",
    },
  ];

  return (
    <PageLayout>
      <div className="flex flex-col min-h-screen">
        {/* Header Section */}
        <div className="relative bg-gradient-to-b from-green-50 to-green-100 py-16 px-4 sm:px-6 lg:px-8 rounded-lg">
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-[url('/fields-pattern.svg')] opacity-10" />
          </div>
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-green-800 mb-4">
              About Me
            </h1>
            <p className="text-xl sm:text-2xl text-brown-600 max-w-3xl mx-auto">
              Driven by technology. Dedicated to sustainability.
            </p>
          </div>
        </div>

        {/* Spotlight Section */}
        <div className="bg-white">
          <div className="page-container min-h-[70vh] flex items-center">
            <div className="w-full space-y-8">
              <p className="text-sm font-semibold tracking-wide uppercase text-green-600">
                Builder Spotlight
              </p>
              <h2 className="text-3xl sm:text-3xl lg:text-4xl font-bold text-green-900 leading-tight">
                {teamMembers[0].name}
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-none">
                {teamMembers[0].bio}
              </p>
            </div>
          </div>
        </div>

        {/* About Krishi Mitra Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
              About Krishi Mitra
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto text-center">
              Krishi Mitra is an AI-powered platform that provides 
              Indian farmers with personalized fertilizer and crop suggestions based on soil data 
              (pH, nutrients, type) and seasonal factors. It integrates government soil data and 
              promotes organic fertilizers to ensure long-term sustainability.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>

            <div className="mt-16 text-center">
              <blockquote className="text-2xl font-semibold italic text-green-700 max-w-3xl mx-auto">
                "When we empower farmers with the right information, we cultivate prosperity."
              </blockquote>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-brown-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-brown-800 mb-6">
              Want to learn more about how Krishi Mitra helps farmers thrive?
            </h2>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 rounded-lg"
              asChild
            >
              <Link to="/">Explore Our Platform</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
