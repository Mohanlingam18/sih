import React, { useState } from 'react';
import { Plus, MapPin, Shield, Clock, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import InteractiveGeoMap from './InteractiveGeoMap';

interface GeoFence {
  id: number;
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
  type: 'Restricted' | 'Safe Zone' | 'Warning Zone' | 'Emergency Zone';
  typeColor: string;
  coordinates: { lat: number; lng: number }[];
  restrictions: string[];
  timeRestrictions?: {
    startTime: string;
    endTime: string;
    days: string[];
  };
  visible: boolean;
}

function GeoFenceManagement() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFence, setSelectedFence] = useState<GeoFence | null>(null);
  const [mapMode, setMapMode] = useState<'view' | 'create' | 'edit'>('view');

  const [fences, setFences] = useState<GeoFence[]>([
    {
      id: 1,
      name: 'Red Fort Restricted Area',
      description: 'Archaeological zone - No access after 6 PM',
      status: 'Active',
      type: 'Restricted',
      typeColor: 'bg-red-100 text-red-800',
      coordinates: [
        { lat: 28.6562, lng: 77.2410 },
        { lat: 28.6570, lng: 77.2420 },
        { lat: 28.6550, lng: 77.2430 },
        { lat: 28.6540, lng: 77.2415 }
      ],
      restrictions: ['No entry after 6 PM', 'Photography restricted', 'Group size limit: 20'],
      timeRestrictions: {
        startTime: '06:00',
        endTime: '18:00',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      visible: true
    },
    {
      id: 2,
      name: 'India Gate Safe Zone',
      description: 'High security patrol area',
      status: 'Active',
      type: 'Safe Zone',
      typeColor: 'bg-green-100 text-green-800',
      coordinates: [
        { lat: 28.6129, lng: 77.2295 },
        { lat: 28.6140, lng: 77.2310 },
        { lat: 28.6120, lng: 77.2320 },
        { lat: 28.6110, lng: 77.2300 }
      ],
      restrictions: ['24/7 security patrol', 'Emergency services available'],
      visible: true
    },
    {
      id: 3,
      name: 'Connaught Place Warning Zone',
      description: 'High tourist activity - Pickpocket alerts',
      status: 'Active',
      type: 'Warning Zone',
      typeColor: 'bg-yellow-100 text-yellow-800',
      coordinates: [
        { lat: 28.6315, lng: 77.2167 },
        { lat: 28.6325, lng: 77.2180 },
        { lat: 28.6305, lng: 77.2190 },
        { lat: 28.6295, lng: 77.2175 }
      ],
      restrictions: ['High pickpocket activity', 'Stay in groups', 'Avoid displaying valuables'],
      visible: true
    },
    {
      id: 4,
      name: 'Hospital Emergency Zone',
      description: 'Quick access for medical emergencies',
      status: 'Active',
      type: 'Emergency Zone',
      typeColor: 'bg-blue-100 text-blue-800',
      coordinates: [
        { lat: 28.6289, lng: 77.2065 },
        { lat: 28.6300, lng: 77.2080 },
        { lat: 28.6280, lng: 77.2090 },
        { lat: 28.6270, lng: 77.2070 }
      ],
      restrictions: ['Priority emergency response', 'Medical facilities nearby'],
      visible: true
    }
  ]);

  const statistics = [
    { label: 'Total Fences', value: fences.length, color: 'text-gray-600' },
    { label: 'Active', value: fences.filter(f => f.status === 'Active').length, color: 'text-green-600' },
    { label: 'Restricted Zones', value: fences.filter(f => f.type === 'Restricted').length, color: 'text-red-600' },
    { label: 'Safe Zones', value: fences.filter(f => f.type === 'Safe Zone').length, color: 'text-green-600' }
  ];

  const handleCreateFence = () => {
    setMapMode('create');
    setShowCreateModal(true);
  };

  const handleEditFence = (fence: GeoFence) => {
    setSelectedFence(fence);
    setMapMode('edit');
  };

  const toggleFenceVisibility = (fenceId: number) => {
    setFences(fences.map(fence => 
      fence.id === fenceId 
        ? { ...fence, visible: !fence.visible }
        : fence
    ));
  };

  const deleteFence = (fenceId: number) => {
    setFences(fences.filter(fence => fence.id !== fenceId));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Restricted': return '🚫';
      case 'Safe Zone': return '🛡️';
      case 'Warning Zone': return '⚠️';
      case 'Emergency Zone': return '🚨';
      default: return '📍';
    }
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* Left Panel - Fence List */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-gray-900">Geo-fence Management</h1>
            <button 
              onClick={handleCreateFence}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
              <span>Create</span>
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {statistics.map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-lg p-3 text-center">
                <div className={`text-lg font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Fence List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {fences.map((fence) => (
            <div key={fence.id} className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getTypeIcon(fence.type)}</span>
                  <h3 className="font-semibold text-gray-900 text-sm">{fence.name}</h3>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => toggleFenceVisibility(fence.id)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title={fence.visible ? 'Hide on map' : 'Show on map'}
                  >
                    {fence.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => handleEditFence(fence)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Edit fence"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteFence(fence.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete fence"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${fence.typeColor}`}>
                  {fence.type}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {fence.status}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-3">{fence.description}</p>

              {/* Restrictions */}
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-gray-700">Restrictions:</h4>
                {fence.restrictions.slice(0, 2).map((restriction, index) => (
                  <div key={index} className="text-xs text-gray-600 flex items-center space-x-1">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>{restriction}</span>
                  </div>
                ))}
                {fence.restrictions.length > 2 && (
                  <div className="text-xs text-blue-600">+{fence.restrictions.length - 2} more</div>
                )}
              </div>

              {/* Time Restrictions */}
              {fence.timeRestrictions && (
                <div className="mt-2 text-xs text-gray-500 flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{fence.timeRestrictions.startTime} - {fence.timeRestrictions.endTime}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Interactive Map */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Interactive Map</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMapMode('view')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  mapMode === 'view' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                View Mode
              </button>
              <button
                onClick={() => setMapMode('create')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  mapMode === 'create' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Create Mode
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <InteractiveGeoMap 
            fences={fences}
            mode={mapMode}
            selectedFence={selectedFence}
            onFenceCreated={(newFence) => {
              setFences([...fences, { ...newFence, id: Date.now() }]);
              setMapMode('view');
            }}
            onFenceUpdated={(updatedFence) => {
              setFences(fences.map(f => f.id === updatedFence.id ? updatedFence : f));
              setSelectedFence(null);
              setMapMode('view');
            }}
          />
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && mapMode === 'create' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Geo-fence</h3>
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">
                Use the map to draw your geo-fence boundary. Click on the map to add points and create a polygon.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-medium text-blue-900 mb-2">Instructions:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Click on the map to add boundary points</li>
                  <li>• Connect back to the first point to close the fence</li>
                  <li>• Right-click to finish drawing</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => {
                  setShowCreateModal(false);
                  setMapMode('view');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GeoFenceManagement;