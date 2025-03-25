
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AuthCallback from "./pages/auth/AuthCallback";
import CompleteProfile from "./pages/auth/CompleteProfile";

// Dashboard Pages
import ObserverDashboard from "./pages/dashboards/ObserverDashboard";
import ClientDashboard from "./pages/dashboards/ClientDashboard";
import StaffDashboard from "./pages/dashboards/StaffDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";

// Route Protection
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/auth/complete-profile" element={<CompleteProfile />} />

            {/* Protected Routes - Observer */}
            <Route element={<ProtectedRoute allowedRoles={['OBSERVER', 'CLIENT', 'STAFF', 'ADMIN']} />}>
              <Route path="/observer" element={<ObserverDashboard />} />
            </Route>

            {/* Protected Routes - Client */}
            <Route element={<ProtectedRoute allowedRoles={['CLIENT', 'STAFF', 'ADMIN']} />}>
              <Route path="/client" element={<ClientDashboard />} />
            </Route>

            {/* Protected Routes - Staff */}
            <Route element={<ProtectedRoute allowedRoles={['STAFF', 'ADMIN']} />}>
              <Route path="/staff" element={<StaffDashboard />} />
            </Route>

            {/* Protected Routes - Admin */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
