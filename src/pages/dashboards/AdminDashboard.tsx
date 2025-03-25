
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/ui/PageTransition';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Users, Briefcase, BarChart, Settings, Shield, Bell } from 'lucide-react';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="dashboard-layout">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => logout()}
            >
              <LogOut size={18} />
              Sign out
            </Button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="dashboard-card animate-slide-in" style={{ animationDelay: '0ms' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Users</h2>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users size={20} className="text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-semibold mb-2">152</p>
              <p className="text-gray-500 text-sm">Total users</p>
            </div>

            <div className="dashboard-card animate-slide-in" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Clients</h2>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Briefcase size={20} className="text-green-600" />
                </div>
              </div>
              <p className="text-3xl font-semibold mb-2">98</p>
              <p className="text-gray-500 text-sm">Active clients</p>
            </div>

            <div className="dashboard-card animate-slide-in" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Staff</h2>
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Shield size={20} className="text-purple-600" />
                </div>
              </div>
              <p className="text-3xl font-semibold mb-2">24</p>
              <p className="text-gray-500 text-sm">Staff members</p>
            </div>

            <div className="dashboard-card animate-slide-in" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Alerts</h2>
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Bell size={20} className="text-amber-600" />
                </div>
              </div>
              <p className="text-3xl font-semibold mb-2">12</p>
              <p className="text-gray-500 text-sm">System notifications</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 dashboard-card animate-slide-in" style={{ animationDelay: '400ms' }}>
              <h2 className="text-xl font-semibold mb-4">User Activity</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left pb-3 font-medium">User</th>
                      <th className="text-left pb-3 font-medium">Role</th>
                      <th className="text-left pb-3 font-medium">Last Active</th>
                      <th className="text-left pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3">Jane Smith</td>
                      <td className="py-3">Staff</td>
                      <td className="py-3">Just now</td>
                      <td className="py-3">
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                          Online
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3">Michael Johnson</td>
                      <td className="py-3">Client</td>
                      <td className="py-3">2 hours ago</td>
                      <td className="py-3">
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                          Offline
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3">Emily Davis</td>
                      <td className="py-3">Admin</td>
                      <td className="py-3">5 minutes ago</td>
                      <td className="py-3">
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                          Online
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">Robert Miller</td>
                      <td className="py-3">Observer</td>
                      <td className="py-3">1 day ago</td>
                      <td className="py-3">
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                          Offline
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="dashboard-card animate-slide-in" style={{ animationDelay: '500ms' }}>
              <h2 className="text-xl font-semibold mb-4">System Settings</h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  User Management
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Role Permissions
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  System Configuration
                </Button>
                <Button className="w-full justify-start mt-6">
                  Security Audit
                </Button>
              </div>
            </div>
          </div>

          <div className="dashboard-card animate-slide-in" style={{ animationDelay: '600ms' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">System Status</h2>
              <Button variant="outline" size="sm">Refresh</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Database</h3>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Operational</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">API Services</h3>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Operational</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">File Storage</h3>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;
