
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 card-hover">
      <div className="rounded-full bg-krishi-50 w-14 h-14 flex items-center justify-center mb-5 text-krishi-600">
        {icon}
      </div>
      <h3 className="text-gray-800 font-medium text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
