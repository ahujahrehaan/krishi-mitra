import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { toast } from '@/hooks/use-toast';

const SoilInput = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    block: '',
    season: '',
    soilType: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emptyFields = Object.entries(formData)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      toast({
        title: "Incomplete form",
        description: `Please fill in all fields: ${emptyFields.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      toast({
        title: "Generating AI recommendations...",
        description: "Please wait a few seconds...",
      });

      const prompt = `
Based on the following inputs:
- State: ${formData.state}
- District: ${formData.district}
- Block: ${formData.block}
- Season: ${formData.season}
- Soil Type: ${formData.soilType}

Suggest:
1. Suitable crops
2. Fertilizer recommendations (organic and/or inorganic)
3. Dosage and application timing
4. A sustainability tip for the region
Keep suggestions practical, farmer-friendly, and region-specific.
      `;

      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      const geminiText = data.recommendations;

      if (!geminiText) {
        throw new Error("No valid response from Gemini.");
      }

      toast({
        title: "Success!",
        description: "AI recommendations generated.",
      });

      navigate('/results', {
        state: {
          formData,
          geminiResponse: geminiText
        }
      });

    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate AI recommendations.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-soil-100/80 rounded-2xl shadow-md p-8 animate-fade-up">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <Leaf className="mr-2 text-krishi-500" />
                    Soil Analysis Form
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Fill in the details below to get personalized crop and fertilizer recommendations for your farm
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">LOCATION:</h3>

                    {["state", "district", "block", "season", "soilType"].map((field, idx) => (
                      <div className="mb-4" key={idx}>
                        <label htmlFor={field} className="block text-gray-700 font-medium mb-1">
                          {field.toUpperCase()}:
                        </label>
                        <input
                          type="text"
                          id={field}
                          name={field}
                          value={formData[field as keyof typeof formData]}
                          onChange={handleInputChange}
                          placeholder={`Enter your ${field}`}
                          className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-krishi-300 transition"
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className={`krishi-btn w-full text-center uppercase ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'GET RESULTS'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default SoilInput;
