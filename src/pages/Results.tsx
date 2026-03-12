import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Download, Printer, Loader2, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import { useToast } from "@/hooks/use-toast";

// Types
interface SoilFormData {
  state: string;
  district: string;
  block: string;
  season: string;
  soilType: string;
}

interface Section {
  id: string;
  title: string;
  content: JSX.Element;
}

interface CropItem {
  name: string;
  description: string;
  varieties?: Array<{
    name: string;
    description: string;
  }>;
}

const Results = () => {
  const location = useLocation();
  const { toast } = useToast();
  const sectionRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});

  const [formData, setFormData] = useState<SoilFormData | null>(null);
  const [responseData, setResponseData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // Function to handle printing
  const handlePrint = () => {
    window.print();
  };

  // Function to download as text file
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([`Smart Farming Recommendations\n\nLocation: ${formData?.state}, ${formData?.district}, ${formData?.block}\nSeason: ${formData?.season}\nSoil Type: ${formData?.soilType}\n\n${responseData}`], 
                          { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "farming_recommendations.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Function to scroll to section
  const scrollToSection = (sectionId: string) => {
    if (sectionRefs.current[sectionId] && sectionRefs.current[sectionId].current) {
      sectionRefs.current[sectionId].current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(sectionId);
    }
  };

  // Track scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      if (sections.length === 0) return;
      
      // Find the section closest to the top of the viewport
      let closestSection = sections[0].id;
      let closestDistance = Infinity;

      for (const section of sections) {
        const ref = sectionRefs.current[section.id];
        if (ref && ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = section.id;
          }
        }
      }

      setActiveSection(closestSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial active section

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  useEffect(() => {
    const locationState = location.state as {
      formData: SoilFormData;
      geminiResponse: string;
    };

    if (!locationState || !locationState.formData || !locationState.geminiResponse) {
      setError("Form data or AI response is missing.");
      setLoading(false);
      return;
    }

    setFormData(locationState.formData);
    
    // Clean up the response before storing and parsing
    const cleanedResponse = cleanResponseText(locationState.geminiResponse);
    setResponseData(cleanedResponse);
    
    // Parse and format the response into sections
    parseResponse(cleanedResponse);
    
    toast({
      title: "Recommendations Ready",
      description: "Personalized results have been loaded successfully.",
    });
    
    setLoading(false);
  }, [location.state, toast]);
  
  // Helper function to clean up the raw response text
  const cleanResponseText = (text: string): string => {
    let cleanedText = text;
    
    // Remove asterisks used for formatting
    cleanedText = cleanedText.replace(/\*\*/g, "");
    cleanedText = cleanedText.replace(/\*/g, "");
    
    // Normalize spacing
    cleanedText = cleanedText
      .replace(/\s+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n");
      
    return cleanedText;
  };

  // Parse the response into sections
  const parseResponse = (response: string) => {
    try {
      // Improved section detection regex that handles various formatting styles
      // Looking for patterns like "1. Title:" or "1. Title" or similar variations
      const sectionRegex = /(?:^|\n)(\d+\.\s+[^:\n]+)(?::)?/g;
      const matches = [...response.matchAll(sectionRegex)];
      
      // If no sections found, display the entire response as one section
      if (matches.length === 0) {
        const singleSection = {
          id: "recommendations",
          title: "Recommendations",
          content: renderSectionContent(response)
        };
        
        sectionRefs.current["recommendations"] = React.createRef();
        setSections([singleSection]);
        setActiveSection("recommendations");
        return;
      }
      
      const parsedSections: Section[] = [];
      
      // Extract introduction (content before the first section)
      const firstSectionIndex = matches[0].index || 0;
      if (firstSectionIndex > 0) {
        const introText = response.substring(0, firstSectionIndex).trim();
        if (introText) {
          const introSection = {
            id: "introduction",
            title: "Introduction",
            content: renderSectionContent(introText)
          };
          parsedSections.push(introSection);
          sectionRefs.current["introduction"] = React.createRef();
        }
      }
      
      // Extract each section's content
      for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        const sectionTitle = match[1].trim();
        const sectionId = `section-${i + 1}`;
        
        // Calculate section content (from current match to next match, or end of text)
        const startIndex = (match.index || 0) + match[0].length;
        const endIndex = i < matches.length - 1 
          ? (matches[i + 1].index || response.length) 
          : response.length;
          
        const sectionContent = response.substring(startIndex, endIndex).trim();
        
        const section = {
          id: sectionId,
          title: sectionTitle.replace(/^\d+\.\s+/, ''), // Remove the number prefix
          content: renderSectionContent(sectionContent)
        };
        
        parsedSections.push(section);
        sectionRefs.current[sectionId] = React.createRef();
      }
      
      setSections(parsedSections);
      
      // Set initial active section
      if (parsedSections.length > 0) {
        setActiveSection(parsedSections[0].id);
      }
    } catch (err) {
      console.error("Error parsing response:", err);
      // Fallback to displaying the entire response as one section
      const fallbackSection = {
        id: "recommendations",
        title: "Recommendations",
        content: renderSectionContent(response)
      };
      
      sectionRefs.current["recommendations"] = React.createRef();
      setSections([fallbackSection]);
      setActiveSection("recommendations");
    }
  };

  // Helper function to extract crop items from text
  const extractCropItems = (text: string): CropItem[] => {
    // Pattern to match crop names followed by descriptions
    // Example: "Rice (Paddy): Alluvial soils are ideal for rice cultivation."
    const cropItems: CropItem[] = [];
    
    // First, check if we have bullet points already
    if (text.includes('\n* ') || text.trim().startsWith('* ')) {
      const lines = text.split('\n');
      let currentCrop: CropItem | null = null;
      let currentVariety: { name: string; description: string } | null = null;
      
      lines.forEach(line => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return;
        
        // Check if this is a main crop item
        if (trimmedLine.startsWith('* ')) {
          // Complete previous crop if exists
          if (currentCrop) {
            cropItems.push(currentCrop);
          }
          
          // Start a new crop item
          const cropText = trimmedLine.substring(2);
          if (cropText.includes(':')) {
            const [name, description] = cropText.split(':', 2);
            currentCrop = {
              name: name.trim(),
              description: description.trim(),
              varieties: []
            };
          } else {
            currentCrop = {
              name: cropText,
              description: '',
              varieties: []
            };
          }
          currentVariety = null;
        } 
        // Otherwise, this might be a variety or additional info
        else if (currentCrop && trimmedLine.includes(':')) {
          const [name, description] = trimmedLine.split(':', 2);
          currentCrop.varieties = currentCrop.varieties || [];
          currentCrop.varieties.push({
            name: name.trim(),
            description: description.trim()
          });
        } 
        // This is additional text for the current crop
        else if (currentCrop && !currentCrop.description) {
          currentCrop.description = trimmedLine;
        }
        // This is additional text for the current variety
        else if (currentCrop && currentVariety) {
          currentVariety.description += ' ' + trimmedLine;
        }
        // Otherwise add to crop description
        else if (currentCrop) {
          currentCrop.description += ' ' + trimmedLine;
        }
      });
      
      // Add the last crop if exists
      if (currentCrop) {
        cropItems.push(currentCrop);
      }
    } 
    // For text without bullet points, try to detect crop patterns
    else {
      // Regex to find crop names and descriptions
      // Pattern: "CropName: Description" or "CropName (Additional): Description"
      const cropMatches = text.matchAll(/([A-Z][a-zA-Z\s()]+):\s*([^:]+?)(?=\s*[A-Z][a-zA-Z\s()]+:|\s*$)/g);
      
      for (const match of cropMatches) {
        const cropName = match[1].trim();
        const cropDescription = match[2].trim();
        
        // Process varieties within the description
        const varietyMatches = [...cropDescription.matchAll(/([A-Za-z\s()-]+):\s*([^:]+?)(?=\s*[A-Za-z][a-zA-Z\s()-]+:|\s*$)/g)];
        
        if (varietyMatches.length > 0) {
          // This crop has varieties
          const crop: CropItem = {
            name: cropName,
            description: cropDescription.substring(0, varietyMatches[0].index).trim(),
            varieties: []
          };
          
          for (const varietyMatch of varietyMatches) {
            crop.varieties!.push({
              name: varietyMatch[1].trim(),
              description: varietyMatch[2].trim()
            });
          }
          
          cropItems.push(crop);
        } else {
          // Simple crop without varieties
          cropItems.push({
            name: cropName,
            description: cropDescription
          });
        }
      }
    }
    
    return cropItems;
  };

  // Helper function to render section content with proper formatting
  const renderSectionContent = (content: string) => {
    // Pre-process content to identify specific patterns
    let processedContent = content;
    
    // Check if this content looks like a crop recommendation list
    const containsCropRecommendations = 
      (content.includes('Rice') || content.includes('Maize') || content.includes('Wheat')) &&
      content.includes(':');
    
    // Enhanced rendering for crop recommendations
    if (containsCropRecommendations) {
      try {
        const cropItems = extractCropItems(processedContent);
        if (cropItems.length > 0) {
          // We've successfully identified crops, render them with better formatting
          return (
            <div className="prose max-w-none">
              {/* Initial paragraph before crop list */}
              {processedContent.split(/[A-Z][a-zA-Z\s()]+:/)[0].trim() && (
                <p className="mb-4 text-gray-700">
                  {processedContent.split(/[A-Z][a-zA-Z\s()]+:/)[0].trim()}
                </p>
              )}
              
              {/* Crop list */}
              <ul className="space-y-6 mt-4">
                {cropItems.map((crop, index) => (
                  <li key={index} className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <h3 className="font-semibold text-lg text-green-700 mb-2">{crop.name}</h3>
                    <p className="text-gray-700 mb-3">{crop.description}</p>
                    
                    {crop.varieties && crop.varieties.length > 0 && (
                      <div className="mt-2 pl-4 border-l-2 border-green-200">
                        <h4 className="font-medium text-green-600 mb-2">Varieties:</h4>
                        <ul className="space-y-2">
                          {crop.varieties.map((variety, vIndex) => (
                            <li key={vIndex} className="text-gray-700">
                              <span className="font-medium">{variety.name}:</span> {variety.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              
              {/* Final paragraph after crop list if exists */}
              {processedContent.split(/\s+Prioritization:/i)[1]?.trim() && (
                <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-semibold text-blue-700 mb-2">Prioritization</h3>
                  <p className="text-gray-700">
                    {processedContent.split(/\s+Prioritization:/i)[1].trim()}
                  </p>
                </div>
              )}
            </div>
          );
        }
      } catch (e) {
        console.error("Error rendering crop recommendations:", e);
        // Fall back to standard rendering below
      }
    }
    
    // Standard content rendering for other types of content
    const paragraphs = processedContent.split(/\n{2,}/);
    const elements: JSX.Element[] = [];
    let key = 0;
    
    for (const paragraph of paragraphs) {
      if (!paragraph.trim()) continue;
      
      // Check if this is a bullet list
      if (paragraph.includes('\n* ') || paragraph.trim().startsWith('* ')) {
        const listItems = paragraph
          .split(/\n\* /)
          .map((item, idx) => {
            const itemText = idx === 0 && item.startsWith('* ') 
              ? item.substring(2).trim() 
              : item.trim();
              
            if (!itemText) return null;
            
            return (
              <li key={`li-${key++}`} className="ml-6 mb-2 list-disc">
                {itemText}
              </li>
            );
          })
          .filter(Boolean);
          
        elements.push(
          <ul key={`ul-${key++}`} className="my-4 space-y-1">
            {listItems}
          </ul>
        );
      } 
      // Check if this is a special subsection
      else if (paragraph.includes(':') && !paragraph.includes('\n')) {
        const parts = paragraph.split(':');
        if (parts.length >= 2 && parts[0].trim().length <= 50) {
          elements.push(
            <div key={`subsection-${key++}`} className="mb-4">
              <h3 className="font-semibold text-lg text-green-700">{parts[0].trim()}</h3>
              <p className="text-gray-700">{parts.slice(1).join(':').trim()}</p>
            </div>
          );
        } else {
          elements.push(
            <p key={`p-${key++}`} className="mb-4 text-gray-700">
              {paragraph.trim()}
            </p>
          );
        }
      }
      // Regular paragraph
      else {
        elements.push(
          <p key={`p-${key++}`} className="mb-4 text-gray-700">
            {paragraph.trim()}
          </p>
        );
      }
    }
    
    return <div className="prose max-w-none">{elements}</div>;
  };

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        {/* Mobile sidebar toggle */}
        <div className="md:hidden fixed top-16 left-4 z-20 print:hidden">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white shadow-md border-green-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
        
        {/* Sidebar navigation */}
        <div className={`
          fixed md:relative z-10
          w-64 md:w-72 shrink-0 bg-white shadow-md md:shadow-none
          transition-all duration-300 ease-in-out
          border-r border-green-100
          print:hidden
          ${sidebarOpen ? 'left-0' : '-left-72'}
          h-screen overflow-y-auto
        `}>
          <div className="sticky top-0 p-4 bg-white border-b border-green-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-green-800">Contents</h2>
              <Button 
                variant="outline" 
                size="sm"
                className="md:hidden" 
                onClick={() => setSidebarOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>
          </div>
          
          <nav className="p-4">
            <div className="mb-6 border-b border-green-100 pb-4">
              <h3 className="text-xs uppercase tracking-wider text-green-600 font-semibold mb-2">Location</h3>
              {formData && (
                <div className="text-sm text-gray-700">
                  <p className="mb-1"><span className="font-medium">State:</span> {formData.state}</p>
                  <p className="mb-1"><span className="font-medium">District:</span> {formData.district}</p>
                  <p className="mb-1"><span className="font-medium">Block:</span> {formData.block}</p>
                  <p className="mb-1"><span className="font-medium">Season:</span> {formData.season}</p>
                  <p><span className="font-medium">Soil Type:</span> {formData.soilType}</p>
                </div>
              )}
            </div>
            
            <h3 className="text-xs uppercase tracking-wider text-green-600 font-semibold mb-3">Navigation</h3>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => {
                      scrollToSection(section.id);
                      if (window.innerWidth < 768) {
                        setSidebarOpen(false);
                      }
                    }}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg flex items-center
                      transition-colors duration-150 text-sm
                      ${activeSection === section.id 
                        ? 'bg-green-100 text-green-800 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'}
                    `}
                  >
                    <ChevronRight size={16} className={`
                      mr-1 transition-transform
                      ${activeSection === section.id ? 'text-green-600' : 'text-gray-400'}
                    `} />
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 space-y-2">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full flex items-center justify-center gap-2 text-green-800 border-green-300 hover:bg-green-100"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4" />
                Print Recommendations
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="w-full flex items-center justify-center gap-2 text-green-800 border-green-300 hover:bg-green-100"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
                Download as Text
              </Button>
              
              <Link to="/" className="block mt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full flex items-center justify-center gap-2 text-green-800 border-green-300 hover:bg-green-100"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Input
                </Button>
              </Link>
            </div>
          </nav>
        </div>
        
        {/* Main content */}
        <div className="flex-grow p-4 md:p-6 pt-20 md:pt-24 pb-12 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="bg-white border border-green-200 rounded-xl shadow-sm p-6 mb-6">
              <h1 className="text-3xl font-bold text-green-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🌾</span> Smart Farming Recommendations
              </h1>
              <p className="text-green-700 text-base">
                Based on your provided soil and location inputs, here are AI-powered suggestions
                tailored for better yield and sustainability.
              </p>
            </div>

            {loading && (
              <div className="bg-white border border-green-200 rounded-xl shadow-sm p-6 text-green-700 font-medium flex items-center justify-center">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Preparing your eco-smart farming recommendations...
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-700 p-6 rounded-xl shadow-sm font-medium border border-red-200">
                ❌ {error}
              </div>
            )}

            {!loading && !error && (
              <div className="space-y-6">
                {sections.map((section) => (
                  <div 
                    key={section.id} 
                    id={section.id}
                    ref={sectionRefs.current[section.id]} 
                    className="bg-white border border-green-200 rounded-xl shadow-sm overflow-hidden scroll-mt-24"
                  >
                    <div className="bg-green-50 px-6 py-3 border-b border-green-100">
                      <h2 className="text-xl font-bold text-green-800">{section.title}</h2>
                    </div>
                    <div className="p-6">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Results;