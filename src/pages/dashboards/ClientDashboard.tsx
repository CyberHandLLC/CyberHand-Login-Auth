
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/ui/PageTransition';
import { useAuth } from '@/context/AuthContext';
import { LogOut, FileText, MessageSquare, CreditCard } from 'lucide-react';

const ClientDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="dashboard-layout">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Client Dashboard</h1>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => logout()}
            >
              <LogOut size={18} />
              Sign out
            </Button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="dashboard-card animate-slide-in" style={{ animationDelay: '0ms' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Projects</h2>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileText size={20} className="text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-semibold mb-2">3</p>
              <p className="text-gray-500 text-sm">Active projects</p>
            </div>

            <div className="dashboard-card animate-slide-in" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Support</h2>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <MessageSquare size={20} className="text-green-600" />
                </div>
              </div>
              <p className="text-3xl font-semibold mb-2">1</p>
              <p className="text-gray-500 text-sm">Open tickets</p>
            </div>

            <div className="dashboard-card animate-slide-in" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Invoices</h2>
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <CreditCard size={20} className="text-purple-600" />
                </div>
              </div>
              <p className="text-3xl font-semibold mb-2">2</p>
              <p className="text-gray-500 text-sm">Pending payment</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="dashboard-card animate-slide-in" style={{ animationDelay: '300ms' }}>
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-100">
                  <p className="font-medium">Website Redesign - Phase 2 completed</p>
                  <p className="text-sm text-gray-500">Yesterday at 3:45 PM</p>
                </div>
                <div className="pb-4 border-b border-gray-100">
                  <p className="font-medium">New invoice #INV-0023 created</p>
                  <p className="text-sm text-gray-500">Oct 15, 2023 at 10:30 AM</p>
                </div>
                <div>
                  <p className="font-medium">Support ticket #45892 resolved</p>
                  <p className="text-sm text-gray-500">Oct 13, 2023 at 2:15 PM</p>
                </div>
              </div>
            </div>

            <div className="dashboard-card animate-slide-in" style={{ animationDelay: '400ms' }}>
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <FileText size={20} />
                  <span>View Projects</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <MessageSquare size={20} />
                  <span>Contact Support</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <CreditCard size={20} />
                  <span>Pay Invoices</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <LogOut size={20} />
                  <span>Request Service</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ClientDashboard;
