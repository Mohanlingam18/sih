import React from 'react';
import { TrendingUp, Users, AlertTriangle, MapPin, Calendar, Globe } from 'lucide-react';

function Analytics() {
  const metrics = [
    { icon: Users, label: 'Total Tourists', value: '1,247', change: '+12%', changeColor: 'text-green-600' },
    { icon: AlertTriangle, label: 'Active Incidents', value: '7', change: '-23%', changeColor: 'text-green-600' },
    { icon: MapPin, label: 'Geo-fences', value: '24', change: '+3%', changeColor: 'text-green-600' },
    { icon: Globe, label: 'Coverage Area', value: '450km²', change: '+8%', changeColor: 'text-green-600' }
  ];

  const responseStats = [
    { label: 'Average Response Time', value: '3.2 min', color: 'text-blue-600' },
    { label: 'Resolution Rate', value: '98.7%', color: 'text-green-600' },
    { label: 'Tourist Satisfaction', value: '4.8/5', color: 'text-yellow-600' },
    { label: 'System Uptime', value: '99.9%', color: 'text-green-600' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Last 30 days</span>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <Icon className="h-8 w-8 text-blue-600" />
                <span className={`text-sm font-medium ${metric.changeColor}`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-gray-600 text-sm">{metric.label}</p>
            </div>
          );
        })}
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Performance</h2>
          <div className="space-y-4">
            {responseStats.map((stat, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{stat.label}</span>
                <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Tourist verification completed</span>
              <span className="text-xs text-gray-500 ml-auto">2 min ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">New geo-fence created</span>
              <span className="text-xs text-gray-500 ml-auto">15 min ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Emergency resolved</span>
              <span className="text-xs text-gray-500 ml-auto">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tourist Activity Trends</h2>
        <div className="h-64 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Charts</h3>
            <p className="text-gray-600">Detailed analytics and trend visualization would appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;