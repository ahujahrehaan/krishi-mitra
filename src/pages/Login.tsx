import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Leaf } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse: any) => {
    console.log(credentialResponse);

    toast({
      title: "Google Login successful!",
      description: "Redirecting to your dashboard...",
    });

    setTimeout(() => {
      navigate('/soil-input');
    }, 1500);
  };

  const handleLoginError = () => {
    toast({
      title: "Login failed",
      description: "Unable to login with Google",
      variant: "destructive",
    });
  };

  return (
    <GoogleOAuthProvider clientId="343669221031-fg97e6cd386nnstof8qd7lssiulacuib.apps.googleusercontent.com">
      <PageTransition>
        <div className="min-h-screen bg-gray-50">
          <Navbar />

          <div className="pt-28 pb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-2">
                      <div className="h-12 w-12 rounded-full bg-krishi-50 flex items-center justify-center">
                        <Leaf className="h-6 w-6 text-krishi-500" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Welcome to KrishiMitra</h2>
                    <p className="text-gray-600 text-sm mt-1">Login using your Google account</p>
                  </div>

                  <div className="flex justify-center">
                    <GoogleLogin
                      onSuccess={handleLoginSuccess}
                      onError={handleLoginError}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </PageTransition>
    </GoogleOAuthProvider>
  );
};

export default Login;
