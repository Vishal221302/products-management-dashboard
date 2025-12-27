import React from 'react';
import AuthLayout from '../components/Auth/AuthLayout';
import Signup from '../components/Auth/Signup';

const SignupPage = () => {
  return (
    <AuthLayout 
      title="Get Started" 
      subtitle="Create your product management account"
    >
      <Signup />
    </AuthLayout>
  );
};

export default SignupPage;