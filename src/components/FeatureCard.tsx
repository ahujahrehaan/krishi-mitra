
import React, { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white">
      <CardContent className="p-6 flex flex-col items-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-green-700 mb-2 text-center">{title}</h3>
        <p className="text-gray-600 text-center text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
