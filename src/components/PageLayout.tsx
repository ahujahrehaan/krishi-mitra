
import React from "react";
import Navbar from '@/components/layout/Navbar';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-4 pb-16">{children}</main>
    </div>
  );
};

export default PageLayout;
