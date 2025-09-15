import React from 'react';
import { Phone, Truck, Heart } from 'lucide-react';

function IncidentManagement() {
  const incidents = [
    {
      id: 'INC001',
      person: 'Li Wei',
      description: 'Panic button activated - Red Fort Area',
      priority: 'High Priority',
      priorityColor: 'text-red-600',
      bgColor: 'bg-red-50',
      actions: ['Call', 'Dispatch', 'Medical']
    },
    {
      id: 'INC002',
      person: 'Maria Garcia',
      description: 'Geo-fence breach - Restricted area entry',
      priority: 'Medium Priority',
      priorityColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      actions: ['Call', 'Dispatch']
    }
  ];

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'Call': return Phone;
      case 'Dispatch': return Truck;
      case 'Medical': return Heart;
      default: return Phone;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Call': return 'bg-blue-600 hover:bg-blue-700';
      case 'Dispatch': return 'bg-green-600 hover:bg-green-700';
      case 'Medical': return 'bg-red-600 hover:bg-red-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Incident Management</h1>
      
      <div className="space-y-6">
        {incidents.map((incident) => (
          <div key={incident.id} className={`${incident.bgColor} rounded-lg border p-6`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {incident.id} - {incident.person}
                </h2>
                <p className="text-gray-700 mt-1">{incident.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${incident.priorityColor} bg-white`}>
                {incident.priority}
              </span>
            </div>
            
            <div className="flex space-x-3">
              {incident.actions.map((action) => {
                const Icon = getActionIcon(action);
                return (
                  <button
                    key={action}
                    className={`flex items-center space-x-2 px-4 py-2 ${getActionColor(action)} text-white rounded-lg font-medium transition-colors duration-200`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{action}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State for additional incidents */}
      <div className="mt-8 text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">All incidents handled</h3>
        <p className="text-gray-600">New incidents will appear here automatically</p>
      </div>
    </div>
  );
}

export default IncidentManagement;