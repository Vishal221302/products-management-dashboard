import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import './app.css';
import ProductsPage from './pages/ProductsPage';
import MainContent from './components/Dashboard/MainContent';
import Analytics from './pages/Analytics';
import RevenueChart from './components/Dashboard/RevenueChart';
import Revenue from './pages/Revenue';
import Feedback from './pages/Feedback';
import Roadmap from './pages/Roadmap';
import Settings from './pages/Setting';
import HelpSupport from './pages/Help';
import UserProfile from './pages/UserProfiles';

function App() {
  return (
   <AuthProvider>
      <Router>
        <Routes>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Dashboard layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* Nested pages */}
            <Route index element={<MainContent />} />
            <Route path="products" element={<ProductsPage />} />
            {/* future */}
            <Route path="analytics" element={<Analytics />} />
            <Route path="revanue" element={<Revenue />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="setting" element={<Settings />} />
            <Route path="helpsupport" element={<HelpSupport />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;