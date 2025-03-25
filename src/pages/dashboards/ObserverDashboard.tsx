
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/ui/PageTransition';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';

const ObserverDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="dashboard-layout">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Observer Dashboard</h1>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => logout()}
            >
              <LogOut size={18} />
              Sign out
            </Button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="dashboard-card animate-slide-in" style={{ animationDelay: '0ms' }}>
              <h2 className="text-xl font-semibold mb-4">Welcome to CyberHand</h2>
              <p className="text-gray-600 mb-4">
                As an Observer, you have access to view public information and resources.
                Explore our services and learn more about what we offer.
              </p>
              <div className="flex justify-end">
                <Button variant="outline">Learn More</Button>
              </div>
            </div>

            <div className="dashboard-card animate-slide-in" style={{ animationDelay: '100ms' }}>
              <h2 className="text-xl font-semibold mb-4">Available Services</h2>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Web Development
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Digital Marketing
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Web Hosting
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  AI Integration
                </li>
              </ul>
              <div className="flex justify-end">
                <Button variant="outline">View Services</Button>
              </div>
            </div>
          </div>

          <div className="dashboard-card animate-slide-in" style={{ animationDelay: '200ms' }}>
            <h2 className="text-xl font-semibold mb-4">Upgrade Your Access</h2>
            <p className="text-gray-600 mb-4">
              Ready to do more? Contact us to upgrade your account and access additional features
              and services tailored to your needs.
            </p>
            <div className="flex justify-end">
              <Button>Contact Support</Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ObserverDashboard;
