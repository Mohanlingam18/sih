import React, { useState } from 'react';
import { Plus, MapPin, Shield, Clock } from 'lucide-react';

function GeoFenceManagement() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fences = [
    {
      id: 1,
      name: 'Red Fort Restricted Area',
      description: 'Archaeological zone - No access after 6 PM',
      status: 'Active',
      type: 'Restricted',
      typeColor: 'bg-red-100 text-red-800'
    },
    {
      id: 2,
      name: 'India Gate Safe Zone',
      description: 'High security patrol area',
      status: 'Active',
      type: 'Safe Zone',
      typeColor: 'bg-green-100 text-green-800'
    }
  ];

  const statistics = [
    { label: 'Total Fences', value: 4, color: 'text-gray-600' },
    { label: 'Active', value: 3, color: 'text-green-600' },
    { label: 'Dynamic', value: 1, color: 'text-orange-600' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Geo-fence Management</h1>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          <Plus className="h-5 w-5" />
          <span>Create New Fence</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fence List */}
        <div className="lg:col-span-2 space-y-4">
          {fences.map((fence) => (
            <div key={fence.id} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{fence.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${fence.typeColor}`}>
                    {fence.type}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {fence.status}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{fence.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>GPS Coordinates Set</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>24/7 Monitoring</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Panel */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fence Statistics</h3>
          <div className="space-y-4">
            {statistics.map((stat) => (
              <div key={stat.label} className="flex justify-between items-center">
                <span className="text-gray-600">{stat.label}:</span>
                <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Modal (simplified) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Geo-fence</h3>
            <p className="text-gray-600 mb-4">This would open the fence creation wizard with map interface.</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GeoFenceManagement;