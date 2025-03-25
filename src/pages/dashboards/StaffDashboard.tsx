
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/ui/PageTransition';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Users, Briefcase, BarChart } from 'lucide-react';

const StaffDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="dashboard-layout">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Staff Dashboard</h1>
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
                <h2 className="text-xl font-semibold">Clients</h2>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users size={20} className="text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-semibold mb-2">24</p>
              <p className="text-gray-500 text-sm">Total clients</p>
            </div>

            <div className="dashboard-card animate-slide-in" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Projects</h2>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Briefcase size={20} className="text-green-600" />
                </div>
              </div>
              <p className="text-3xl font-semibold mb-2">18</p>
              <p className="text-gray-500 text-sm">Active projects</p>
            </div>

            <div className="dashboard-card animate-slide-in" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Tasks</h2>
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <BarChart size={20} className="text-amber-600" />
                </div>
              </div>
              <p className="text-3xl font-semibold mb-2">42</p>
              <p className="text-gray-500 text-sm">Pending tasks</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 dashboard-card animate-slide-in" style={{ animationDelay: '300ms' }}>
              <h2 className="text-xl font-semibold mb-4">Current Projects</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left pb-3 font-medium">Project</th>
                      <th className="text-left pb-3 font-medium">Client</th>
                      <th className="text-left pb-3 font-medium">Status</th>
                      <th className="text-left pb-3 font-medium">Deadline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3">Website Redesign</td>
                      <td className="py-3">Acme Corp</td>
                      <td className="py-3">
                        <span className="px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded-full">
                          In Progress
                        </span>
                      </td>
                      <td className="py-3">Nov 15, 2023</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3">E-commerce Integration</td>
                      <td className="py-3">TechStart Inc</td>
                      <td className="py-3">
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                          On Track
                        </span>
                      </td>
                      <td className="py-3">Dec 1, 2023</td>
                    </tr>
                    <tr>
                      <td className="py-3">SEO Optimization</td>
                      <td className="py-3">Global Traders</td>
                      <td className="py-3">
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                          At Risk
                        </span>
                      </td>
                      <td className="py-3">Oct 30, 2023</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="dashboard-card animate-slide-in" style={{ animationDelay: '400ms' }}>
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  View Client Directory
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Create Project
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart className="mr-2 h-4 w-4" />
                  Track Task Progress
                </Button>
                <Button className="w-full justify-start mt-6">
                  Generate Reports
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default StaffDashboard;
