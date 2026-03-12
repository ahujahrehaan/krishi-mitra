
import { ChevronRight } from 'lucide-react';

interface CropCardProps {
  name: string;
  image: string;
  suitability: string;
  description: string;
}

const CropCard = ({ name, image, suitability, description }: CropCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full card-hover">
      <div className="relative h-48 w-full">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-3 right-3 bg-krishi-500 text-white text-xs px-2 py-1 rounded-full">
          {suitability}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm flex-grow">{description}</p>
        <button className="mt-4 text-krishi-600 font-medium text-sm flex items-center group">
          Learn more
          <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default CropCard;
