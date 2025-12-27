import React from 'react';
import SupportTickets from '../components/Feedback/SupportTickets';
import CustomerSatisfaction from '../components/Feedback/CustomerSatisfaction';
import BugReports from '../components/Feedback/BugReports';
import UserFeedback from '../components/Feedback/UserFeedback';
import FeatureRequests from '../components/Feedback/FeatureRequests';


const Feedback = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Customer Support Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <div>
            <UserFeedback/>
          </div>
          <div>
            <SupportTickets />
          </div>
          <div>
            <FeatureRequests />
          </div>
          <div>
            <BugReports/>
          </div>
          <div>
            <CustomerSatisfaction />
          </div>
        </div>
        
        {/* You can also use them individually */}
        {/* <SupportTickets />
        <CustomerSatisfaction /> */}
      </div>
    </div>
  );
};

export default Feedback;