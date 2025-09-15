import React from 'react';
import { AlertTriangle, MapPin, Clock, Users } from 'lucide-react';

function ActiveAlerts() {
  const alerts = [
    {
      id: 1,
      type: 'panic',
      icon: AlertTriangle,
      title: 'Panic Alert',
      person: 'Li Wei - Red Fort Area',
      time: '30 seconds ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'geofence',
      icon: MapPin,
      title: 'Geo-fence Breach',
      person: 'Maria Garcia - Restricted Zone',
      time: '2 minutes ago',
      priority: 'medium'
    }
  ];

  const statistics = [
    { label: 'Active', value: '247', color: 'text-blue-600' },
    { label: 'Safe', value: '231', color: 'text-green-600' },
    { label: 'Critical', value: '3', color: 'text-red-600' }
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Active Alerts */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Alerts</h2>
        
        <div className="space-y-3">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.priority === 'high' 
                    ? 'bg-red-50 border-red-400' 
                    : 'bg-orange-50 border-orange-400'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Icon className={`h-5 w-5 mt-0.5 ${
                    alert.priority === 'high' ? 'text-red-600' : 'text-orange-600'
                  }`} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{alert.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{alert.person}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {alert.time}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {statistics.map((stat) => (
            <div key={stat.label} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActiveAlerts;