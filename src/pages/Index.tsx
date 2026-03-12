
import { Link } from 'react-router-dom';
import { Leaf, BarChart2, Sprout, CloudSun, Award, Download } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FeatureCard from '@/components/ui/FeatureCard';
import PageTransition from '@/components/layout/PageTransition';

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-krishi-50 to-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 max-w-xl animate-fade-right">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight text-balance">
                  Empowering Farmers with Smart Fertilizer & Crop Recommendations!
                </h1>
                <p className="text-gray-600 md:text-lg">
                  KrishiMitra uses AI and government soil data to help farmers make informed decisions about crops and fertilizers, leading to increased yields and sustainable farming practices.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/soil-input" className="krishi-btn text-center">
                    Get Started
                  </Link>
                  <Link to="/about" className="krishi-btn-outline text-center">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">How KrishiMitra Helps You</h2>
              <p className="text-gray-600">
                Our platform combines cutting-edge AI with comprehensive agricultural data to provide precise recommendations for your farm
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
                <FeatureCard 
                  icon={<BarChart2 size={24} />}
                  title="AI-Based Insights"
                  description="Our powerful AI analyzes multiple factors to provide personalized crop and fertilizer recommendations tailored to your specific soil conditions."
                />
              </div>
              <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
                <FeatureCard 
                  icon={<Sprout size={24} />}
                  title="Sustainable Farming"
                  description="Get recommendations that not only maximize yield but also promote long-term soil health and environmental sustainability."
                />
              </div>
              <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
                <FeatureCard 
                  icon={<CloudSun size={24} />}
                  title="Seasonal Guidance"
                  description="Receive specific recommendations for Kharif, Rabi, and Zaid seasons to optimize your farming calendar throughout the year."
                />
              </div>
              <div className="animate-fade-up" style={{ animationDelay: '400ms' }}>
                <FeatureCard 
                  icon={<Award size={24} />}
                  title="Government Data Integration"
                  description="We incorporate official soil survey data to ensure our recommendations are based on accurate and reliable information."
                />
              </div>
              <div className="animate-fade-up" style={{ animationDelay: '500ms' }}>
                <FeatureCard 
                  icon={<Leaf size={24} />}
                  title="Organic Options"
                  description="Explore both organic and conventional fertilizer options to suit your farming philosophy and market requirements."
                />
              </div>
              <div className="animate-fade-up" style={{ animationDelay: '600ms' }}>
                <FeatureCard 
                  icon={<Download size={24} />}
                  title="Offline Access"
                  description="Download your personalized recommendations as PDF files for easy offline reference in the field."
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-krishi-50 clippy">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Ready to Transform Your Farming?
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Join thousands of farmers who have increased their yield and improved soil health with KrishiMitra's recommendations
              </p>
              <Link to="/soil-input" className="krishi-btn inline-block text-center">
                Analyze Your Soil Now
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">What Farmers Say</h2>
              <p className="text-gray-600">
                Hear from farmers who have transformed their practices with KrishiMitra
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 card-hover">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-medium text-gray-800">Rajesh Kumar</h4>
                    <p className="text-sm text-gray-500">Punjab</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  "KrishiMitra's recommendations helped me increase my wheat yield while using less chemical fertilizer. The soil health tips were especially valuable."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 card-hover">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-medium text-gray-800">Lakshmi Devi</h4>
                    <p className="text-sm text-gray-500">Karnataka</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  "As a small-scale farmer, I was skeptical about technology, but KrishiMitra's simple interface made it easy to get valuable insights for my paddy fields."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 card-hover">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-medium text-gray-800">Mohan Singh</h4>
                    <p className="text-sm text-gray-500">Haryana</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  "The seasonal recommendations helped me plan my crop rotation better. I've now switched to organic fertilizers based on KrishiMitra's advice, and my soil quality has improved significantly."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
