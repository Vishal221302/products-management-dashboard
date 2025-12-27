import React from 'react';
import AuthLayout from '../components/Auth/AuthLayout';
import Login from '../components/Auth/Login';

const LoginPage = () => {
  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your product management dashboard"
    >
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;