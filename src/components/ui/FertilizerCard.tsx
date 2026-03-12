
import { Leaf, Droplet } from 'lucide-react';

interface FertilizerCardProps {
  name: string;
  type: 'organic' | 'chemical';
  nutrientN: number;
  nutrientP: number;
  nutrientK: number;
  description: string;
}

const FertilizerCard = ({ 
  name, 
  type, 
  nutrientN, 
  nutrientP, 
  nutrientK, 
  description 
}: FertilizerCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden card-hover">
      <div className={`py-3 px-5 ${type === 'organic' ? 'bg-krishi-500' : 'bg-soil-400'} text-white flex items-center justify-between`}>
        <h3 className="font-medium">{name}</h3>
        <div className="flex items-center">
          {type === 'organic' ? (
            <Leaf size={16} className="ml-2" />
          ) : (
            <Droplet size={16} className="ml-2" />
          )}
          <span className="text-xs ml-1 capitalize">{type}</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between mb-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-krishi-600">{nutrientN}%</div>
            <div className="text-xs text-gray-500">Nitrogen</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-krishi-600">{nutrientP}%</div>
            <div className="text-xs text-gray-500">Phosphorus</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-krishi-600">{nutrientK}%</div>
            <div className="text-xs text-gray-500">Potassium</div>
          </div>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default FertilizerCard;
