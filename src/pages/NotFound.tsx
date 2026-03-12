
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Leaf } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-krishi-50 flex items-center justify-center">
              <Leaf size={36} className="text-krishi-500" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Oops! We couldn't find the page you're looking for</p>
          <p className="text-gray-500 mb-8">
            The page might have been moved, deleted, or never existed in the first place.
          </p>
          <Link to="/" className="krishi-btn inline-flex items-center">
            Return to Home
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
