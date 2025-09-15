import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Square, Circle, Hexagon as Polygon, Trash2, Save, RotateCcw } from 'lucide-react';

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

interface InteractiveGeoMapProps {
  fences: GeoFence[];
  mode: 'view' | 'create' | 'edit';
  selectedFence: GeoFence | null;
  onFenceCreated: (fence: Omit<GeoFence, 'id'>) => void;
  onFenceUpdated: (fence: GeoFence) => void;
}

function InteractiveGeoMap({ fences, mode, selectedFence, onFenceCreated, onFenceUpdated }: InteractiveGeoMapProps) {
  const [drawingPoints, setDrawingPoints] = useState<{ lat: number; lng: number }[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [newFenceData, setNewFenceData] = useState({
    name: '',
    description: '',
    type: 'Restricted' as const,
    restrictions: [''],
    timeRestrictions: {
      startTime: '00:00',
      endTime: '23:59',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
  });
  const [showFenceForm, setShowFenceForm] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const mapCenter = { lat: 28.6139, lng: 77.2090 }; // Delhi center
  const mapZoom = 12;

  const getFenceColor = (type: string) => {
    switch (type) {
      case 'Restricted': return '#DC2626'; // red-600
      case 'Safe Zone': return '#16A34A'; // green-600
      case 'Warning Zone': return '#D97706'; // amber-600
      case 'Emergency Zone': return '#2563EB'; // blue-600
      default: return '#6B7280'; // gray-500
    }
  };

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (mode !== 'create') return;

    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert pixel coordinates to lat/lng (simplified conversion)
    const lat = mapCenter.lat + (rect.height / 2 - y) * 0.0001;
    const lng = mapCenter.lng + (x - rect.width / 2) * 0.0001;

    const newPoint = { lat, lng };
    setDrawingPoints([...drawingPoints, newPoint]);
    setIsDrawing(true);
  };

  const handleFinishDrawing = () => {
    if (drawingPoints.length >= 3) {
      setShowFenceForm(true);
    }
  };

  const handleClearDrawing = () => {
    setDrawingPoints([]);
    setIsDrawing(false);
    setShowFenceForm(false);
  };

  const handleSaveFence = () => {
    if (drawingPoints.length >= 3 && newFenceData.name) {
      const newFence: Omit<GeoFence, 'id'> = {
        name: newFenceData.name,
        description: newFenceData.description,
        status: 'Active',
        type: newFenceData.type,
        typeColor: `bg-${newFenceData.type === 'Restricted' ? 'red' : newFenceData.type === 'Safe Zone' ? 'green' : newFenceData.type === 'Warning Zone' ? 'yellow' : 'blue'}-100 text-${newFenceData.type === 'Restricted' ? 'red' : newFenceData.type === 'Safe Zone' ? 'green' : newFenceData.type === 'Warning Zone' ? 'yellow' : 'blue'}-800`,
        coordinates: drawingPoints,
        restrictions: newFenceData.restrictions.filter(r => r.trim() !== ''),
        timeRestrictions: newFenceData.timeRestrictions,
        visible: true
      };

      onFenceCreated(newFence);
      handleClearDrawing();
      setNewFenceData({
        name: '',
        description: '',
        type: 'Restricted',
        restrictions: [''],
        timeRestrictions: {
          startTime: '00:00',
          endTime: '23:59',
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }
      });
      setShowFenceForm(false);
    }
  };

  const addRestriction = () => {
    setNewFenceData({
      ...newFenceData,
      restrictions: [...newFenceData.restrictions, '']
    });
  };

  const updateRestriction = (index: number, value: string) => {
    const updatedRestrictions = [...newFenceData.restrictions];
    updatedRestrictions[index] = value;
    setNewFenceData({
      ...newFenceData,
      restrictions: updatedRestrictions
    });
  };

  const removeRestriction = (index: number) => {
    setNewFenceData({
      ...newFenceData,
      restrictions: newFenceData.restrictions.filter((_, i) => i !== index)
    });
  };

  // Convert coordinates to SVG path
  const coordinatesToPath = (coordinates: { lat: number; lng: number }[]) => {
    if (coordinates.length === 0) return '';
    
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return '';

    const points = coordinates.map(coord => {
      const x = (coord.lng - mapCenter.lng) / 0.0001 + rect.width / 2;
      const y = rect.height / 2 - (coord.lat - mapCenter.lat) / 0.0001;
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')} Z`;
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-3 space-y-2">
        <div className="text-sm font-medium text-gray-700">Drawing Tools</div>
        <div className="flex space-x-2">
          <button
            onClick={handleFinishDrawing}
            disabled={drawingPoints.length < 3}
            className="flex items-center space-x-1 px-2 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded text-xs transition-colors"
          >
            <Save className="h-3 w-3" />
            <span>Finish</span>
          </button>
          <button
            onClick={handleClearDrawing}
            className="flex items-center space-x-1 px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Clear</span>
          </button>
        </div>
        {mode === 'create' && (
          <div className="text-xs text-gray-600">
            Click on map to add points ({drawingPoints.length} points)
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg p-3">
        <div className="text-sm font-medium text-gray-700 mb-2">Legend</div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Restricted</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Safe Zone</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Warning</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Emergency</span>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div 
        ref={mapRef}
        className="flex-1 relative bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 cursor-crosshair overflow-hidden"
        onClick={handleMapClick}
      >
        {/* Background Map Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
            {Array.from({ length: 400 }).map((_, i) => (
              <div key={i} className="border border-gray-300"></div>
            ))}
          </div>
        </div>

        {/* SVG Overlay for Fences */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Existing Fences */}
          {fences.filter(fence => fence.visible).map((fence) => (
            <g key={fence.id}>
              <path
                d={coordinatesToPath(fence.coordinates)}
                fill={getFenceColor(fence.type)}
                fillOpacity="0.2"
                stroke={getFenceColor(fence.type)}
                strokeWidth="2"
                strokeDashArray={fence.type === 'Warning Zone' ? '5,5' : 'none'}
              />
              {/* Fence Label */}
              {fence.coordinates.length > 0 && (
                <text
                  x={(fence.coordinates[0].lng - mapCenter.lng) / 0.0001 + (mapRef.current?.getBoundingClientRect().width || 0) / 2}
                  y={(mapRef.current?.getBoundingClientRect().height || 0) / 2 - (fence.coordinates[0].lat - mapCenter.lat) / 0.0001}
                  fill={getFenceColor(fence.type)}
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  {fence.name}
                </text>
              )}
            </g>
          ))}

          {/* Drawing Points */}
          {drawingPoints.map((point, index) => {
            const rect = mapRef.current?.getBoundingClientRect();
            if (!rect) return null;
            
            const x = (point.lng - mapCenter.lng) / 0.0001 + rect.width / 2;
            const y = rect.height / 2 - (point.lat - mapCenter.lat) / 0.0001;
            
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#3B82F6"
                stroke="white"
                strokeWidth="2"
              />
            );
          })}

          {/* Drawing Lines */}
          {drawingPoints.length > 1 && (
            <path
              d={coordinatesToPath(drawingPoints)}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDashArray="5,5"
            />
          )}
        </svg>

        {/* Tourist Markers */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
        <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white shadow-lg"></div>
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-lg"></div>
        <div className="absolute top-3/4 left-1/4 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
      </div>

      {/* Fence Creation Form Modal */}
      {showFenceForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Configure Geo-fence</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fence Name</label>
                  <input
                    type="text"
                    value={newFenceData.name}
                    onChange={(e) => setNewFenceData({ ...newFenceData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter fence name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={newFenceData.type}
                    onChange={(e) => setNewFenceData({ ...newFenceData, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Restricted">Restricted Zone</option>
                    <option value="Safe Zone">Safe Zone</option>
                    <option value="Warning Zone">Warning Zone</option>
                    <option value="Emergency Zone">Emergency Zone</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newFenceData.description}
                  onChange={(e) => setNewFenceData({ ...newFenceData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                  placeholder="Enter fence description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Restrictions</label>
                {newFenceData.restrictions.map((restriction, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={restriction}
                      onChange={(e) => updateRestriction(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter restriction"
                    />
                    <button
                      onClick={() => removeRestriction(index)}
                      className="p-2 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addRestriction}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  + Add Restriction
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Restrictions</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={newFenceData.timeRestrictions.startTime}
                      onChange={(e) => setNewFenceData({
                        ...newFenceData,
                        timeRestrictions: { ...newFenceData.timeRestrictions, startTime: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">End Time</label>
                    <input
                      type="time"
                      value={newFenceData.timeRestrictions.endTime}
                      onChange={(e) => setNewFenceData({
                        ...newFenceData,
                        timeRestrictions: { ...newFenceData.timeRestrictions, endTime: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => {
                  setShowFenceForm(false);
                  handleClearDrawing();
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveFence}
                disabled={!newFenceData.name}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
              >
                Save Fence
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InteractiveGeoMap;