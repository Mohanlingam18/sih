import React from 'react';
import { AlertTriangle, MapPin, Clock, Users, Zap, Phone, Navigation } from 'lucide-react';

function ActiveAlerts() {
  const alerts = [
    {
      id: 1,
      type: 'panic',
      icon: AlertTriangle,
      title: 'Panic Alert',
      person: 'Li Wei - Red Fort Area',
      time: '30 seconds ago',
      priority: 'high',
      location: 'Red Fort Area',
      distance: '0.8 km'
    },
    {
      id: 2,
      type: 'geofence',
      icon: MapPin,
      title: 'Geo-fence Breach',
      person: 'Maria Garcia - Restricted Zone',
      time: '2 minutes ago',
      priority: 'medium',
      location: 'Restricted Zone',
      distance: '1.2 km'
    }
  ];

  const statistics = [
    { label: 'Active', value: '247', color: 'text-blue-600' },
    { label: 'Safe', value: '231', color: 'text-green-600', change: '+2' },
    { label: 'Critical', value: '3', color: 'text-red-600', change: '-1' }
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Active Alerts */}
      <div className="p-6 border-b border-gray-200 animate-fadeInUp">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Active Alerts</h2>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
        
        <div className="space-y-3 animate-fadeInUp">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 hover-lift cursor-pointer transition-all duration-200 ${
                  alert.priority === 'high' 
                    ? 'bg-red-50 border-red-400 hover:bg-red-100' 
                    : 'bg-orange-50 border-orange-400 hover:bg-orange-100'
                } hover:shadow-md`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start space-x-3">
                  <Icon className={`h-5 w-5 mt-0.5 ${
                    alert.priority === 'high' ? 'text-red-600' : 'text-orange-600'
                  } ${alert.priority === 'high' ? 'animate-pulse' : ''}`} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{alert.title}</h3>
                    <p className="text-sm text-gray-600">{alert.person}</p>
                  </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.priority === 'high' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {alert.priority === 'high' ? 'HIGH' : 'MED'}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {alert.time}
                    </div>
                    <div className="flex items-center">
                      <Navigation className="h-3 w-3 mr-1" />
                      {alert.distance}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105">
                    <Phone className="h-3 w-3 inline mr-1" />
                    Call
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105">
                    <Zap className="h-3 w-3 inline mr-1" />
                    Respond
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      <div className="p-6 animate-fadeInUp">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {statistics.map((stat) => (
            <div key={stat.label} className="text-center p-4 bg-gray-50 rounded-lg hover-lift hover-glow transition-all duration-200">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <div className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
                {stat.change && (
                  <div className={`text-sm font-medium ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full ${stat.color.replace('text-', 'bg-')} transition-all duration-1000`} style={{ width: `${Math.random() * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActiveAlerts;