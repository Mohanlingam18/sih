import React from 'react';
import { Shield, CheckCircle, Users, TrendingUp, Clock } from 'lucide-react';

function IDVerification() {
  const verificationRequests = [
    {
      id: 1,
      name: 'Li Wei',
      type: 'Emergency Verification',
      status: 'verified',
      statusColor: 'text-green-600'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      type: 'Medical Access',
      status: 'verified',
      statusColor: 'text-green-600'
    }
  ];

  const stats = [
    { icon: CheckCircle, label: '247 Verified Tourists', color: 'text-green-600' },
    { icon: TrendingUp, label: '98.7% Success Rate', color: 'text-blue-600' },
    { icon: Clock, label: '12 Pending Verifications', color: 'text-orange-600' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Identity Verification (Polygon ID)</h1>
      
      {/* Zero-Knowledge Verification Section */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-6 w-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Zero-Knowledge Verification</h2>
        </div>
        <p className="text-gray-600 mb-6">Secure identity verification using blockchain technology</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Icon className={`h-6 w-6 ${stat.color}`} />
                <span className="font-medium text-gray-900">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Verification Requests */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Verification Requests</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {verificationRequests.map((request) => (
            <div key={request.id} className="p-6 flex justify-between items-center hover:bg-gray-50 transition-colors">
              <div>
                <h3 className="font-medium text-gray-900">{request.name} - {request.type}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className={`h-5 w-5 ${request.statusColor}`} />
                <span className={`font-medium ${request.statusColor} capitalize`}>
                  {request.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state for additional requests */}
        <div className="p-6 text-center text-gray-500">
          <Users className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p>All verification requests processed successfully</p>
        </div>
      </div>
    </div>
  );
}

export default IDVerification;