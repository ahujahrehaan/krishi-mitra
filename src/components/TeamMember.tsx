
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
}

const TeamMember = ({ name, role, bio }: TeamMemberProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-green-100">
      <CardContent className="p-6">
        <div className="h-16 w-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
          {name.charAt(0)}
        </div>
        <h3 className="text-xl font-semibold text-center text-green-800 mb-1">{name}</h3>
        <p className="text-sm text-green-600 text-center font-medium mb-3">{role}</p>
        <p className="text-gray-600 text-center">{bio}</p>
      </CardContent>
    </Card>
  );
};

export default TeamMember;
