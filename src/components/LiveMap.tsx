import React, { useState, useEffect } from 'react';
import { Search, Filter, AlertTriangle, Shield, MapPin, Users, Navigation, Zap, Eye, Settings } from 'lucide-react';
import ActiveAlerts from './ActiveAlerts';
import MapLegend from './MapLegend';

interface Tourist {
  id: number;
  name: string;
  status: 'safe' | 'warning' | 'critical';
  location: { lat: number; lng: number };
  lastUpdate: string;
  battery: number;
  speed: number;
  heading: number;
}

function LiveMap() {
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTourist, setSelectedTourist] = useState<Tourist | null>(null);
  const [mapMode, setMapMode] = useState<'normal' | 'heatmap' | 'satellite'>('normal');
  const [showTrails, setShowTrails] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const regions = ['All Regions', 'Central District', 'Tourist Zone A', 'Historical Quarter', 'Beach Area'];

  // Simulated tourist data with real-time updates
  const [tourists, setTourists] = useState<Tourist[]>([
    {
      id: 1,
      name: 'Li Wei',
      status: 'warning',
      location: { lat: 28.6562, lng: 77.2410 },
      lastUpdate: '30 seconds ago',
      battery: 85,
      speed: 2.5,
      heading: 45
    },
    {
      id: 2,
      name: 'Maria Garcia',
      status: 'critical',
      location: { lat: 28.6129, lng: 77.2295 },
      lastUpdate: '1 minute ago',
      battery: 23,
      speed: 0,
      heading: 0
    },
    {
      id: 3,
      name: 'John Smith',
      status: 'safe',
      location: { lat: 28.6315, lng: 77.2167 },
      lastUpdate: '15 seconds ago',
      battery: 92,
      speed: 1.8,
      heading: 180
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      status: 'safe',
      location: { lat: 28.6289, lng: 77.2065 },
      lastUpdate: '45 seconds ago',
      battery: 67,
      speed: 3.2,
      heading: 270
    },
    {
      id: 5,
      name: 'Ahmed Hassan',
      status: 'safe',
      location: { lat: 28.6200, lng: 77.2100 },
      lastUpdate: '20 seconds ago',
      battery: 78,
      speed: 2.1,
      heading: 90
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setTourists(prev => prev.map(tourist => ({
        ...tourist,
        location: {
          lat: tourist.location.lat + (Math.random() - 0.5) * 0.001,
          lng: tourist.location.lng + (Math.random() - 0.5) * 0.001
        },
        battery: Math.max(0, tourist.battery - Math.random() * 0.5),
        speed: Math.max(0, tourist.speed + (Math.random() - 0.5) * 0.5),
        heading: (tourist.heading + (Math.random() - 0.5) * 30) % 360
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-500';
      case 'warning': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusPulse = (status: string) => {
    switch (status) {
      case 'critical': return 'animate-ping';
      case 'warning': return 'animate-pulse';
      default: return '';
    }
  };

  const filteredTourists = tourists.filter(tourist =>
    tourist.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedRegion === 'All Regions' || true) // Add region filtering logic here
  );

  return (
    <div className="h-full flex">
      {/* Main Map Area */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Live Map Tracking</h1>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span>{autoRefresh ? 'Live' : 'Paused'}</span>
              </div>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                  autoRefresh 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {autoRefresh ? 'Pause' : 'Resume'}
              </button>
            </div>
          </div>
          
          {/* Enhanced Map Controls */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Map Controls</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowTrails(!showTrails)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    showTrails 
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Trails
                </button>
                <select
                  value={mapMode}
                  onChange={(e) => setMapMode(e.target.value as any)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="normal">Normal</option>
                  <option value="heatmap">Heatmap</option>
                  <option value="satellite">Satellite</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tourist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Tourist Stats */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-green-50 rounded-lg p-3 text-center hover:bg-green-100 transition-colors duration-200">
                <div className="text-2xl font-bold text-green-600">{tourists.filter(t => t.status === 'safe').length}</div>
                <div className="text-sm text-green-700">Safe</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-3 text-center hover:bg-orange-100 transition-colors duration-200">
                <div className="text-2xl font-bold text-orange-600">{tourists.filter(t => t.status === 'warning').length}</div>
                <div className="text-sm text-orange-700">Warning</div>
              </div>
              <div className="bg-red-50 rounded-lg p-3 text-center hover:bg-red-100 transition-colors duration-200">
                <div className="text-2xl font-bold text-red-600">{tourists.filter(t => t.status === 'critical').length}</div>
                <div className="text-sm text-red-700">Critical</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Map Container */}
        <div className="flex-1 relative bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
          {/* Dynamic Map Background */}
          <div className={`absolute inset-0 transition-all duration-500 ${
            mapMode === 'heatmap' 
              ? 'bg-gradient-to-br from-purple-100 via-blue-50 to-red-100' 
              : mapMode === 'satellite'
              ? 'bg-gradient-to-br from-green-100 via-yellow-50 to-brown-100'
              : 'bg-gradient-to-br from-cyan-100 via-blue-50 to-teal-100'
          }`}>
            {/* Animated Grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
                {Array.from({ length: 400 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="border border-gray-300 hover:bg-blue-200 transition-colors duration-300"
                    style={{ animationDelay: `${i * 10}ms` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Tourist Markers with Enhanced Animations */}
          {filteredTourists.map((tourist, index) => (
            <div key={tourist.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 group">
              <div
                className={`relative cursor-pointer transition-all duration-300 hover:scale-125 ${
                  selectedTourist?.id === tourist.id ? 'scale-150 z-20' : 'z-10'
                }`}
                style={{
                  left: `${30 + index * 15}%`,
                  top: `${25 + index * 20}%`,
                }}
                onClick={() => setSelectedTourist(selectedTourist?.id === tourist.id ? null : tourist)}
              >
                {/* Pulse Animation for Critical Status */}
                {tourist.status === 'critical' && (
                  <div className="absolute inset-0 w-6 h-6 bg-red-500 rounded-full animate-ping opacity-75"></div>
                )}
                
                {/* Movement Trail */}
                {showTrails && (
                  <div className="absolute -inset-2 opacity-30">
                    <div className={`w-8 h-8 ${getStatusColor(tourist.status)} rounded-full blur-sm animate-pulse`}></div>
                  </div>
                )}
                
                {/* Main Marker */}
                <div className={`w-4 h-4 ${getStatusColor(tourist.status)} rounded-full border-2 border-white shadow-lg ${getStatusPulse(tourist.status)} hover:shadow-xl transition-shadow duration-200`}>
                  {/* Direction Indicator */}
                  <div 
                    className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full shadow-sm"
                    style={{ transform: `rotate(${tourist.heading}deg)` }}
                  ></div>
                </div>
                
                {/* Hover Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-black text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                    <div className="font-semibold">{tourist.name}</div>
                    <div className="text-gray-300">Speed: {tourist.speed.toFixed(1)} km/h</div>
                    <div className="text-gray-300">Battery: {tourist.battery.toFixed(0)}%</div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Geo-fence Zones with Animation */}
          <div className="absolute top-1/4 left-1/4 w-32 h-24 border-2 border-red-500 border-dashed rounded-lg bg-red-100 bg-opacity-30 animate-pulse">
            <div className="absolute -top-6 left-2 text-xs font-semibold text-red-600 bg-white px-2 py-1 rounded shadow">
              Restricted Zone
            </div>
          </div>
          
          <div className="absolute top-2/3 right-1/4 w-40 h-32 border-2 border-green-500 rounded-lg bg-green-100 bg-opacity-30">
            <div className="absolute -top-6 left-2 text-xs font-semibold text-green-600 bg-white px-2 py-1 rounded shadow">
              Safe Zone
            </div>
          </div>

          {/* Selected Tourist Details Panel */}
          {selectedTourist && (
            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-xl p-4 w-64 z-30 animate-slideIn">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900">{selectedTourist.name}</h3>
                <button
                  onClick={() => setSelectedTourist(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium capitalize ${
                    selectedTourist.status === 'safe' ? 'text-green-600' :
                    selectedTourist.status === 'warning' ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    {selectedTourist.status}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Speed:</span>
                  <span className="font-medium">{selectedTourist.speed.toFixed(1)} km/h</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Battery:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          selectedTourist.battery > 50 ? 'bg-green-500' :
                          selectedTourist.battery > 20 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${selectedTourist.battery}%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-xs">{selectedTourist.battery.toFixed(0)}%</span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Update:</span>
                  <span className="font-medium">{selectedTourist.lastUpdate}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded-lg transition-colors duration-200">
                  Contact
                </button>
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs py-2 px-3 rounded-lg transition-colors duration-200">
                  Track
                </button>
              </div>
            </div>
          )}
          
          {/* Map Center Indicator */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center shadow-lg">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-bounce" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Tourist Tracking</h3>
              <p className="text-gray-600">Real-time monitoring and safety management</p>
              <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{tourists.length} Active</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Navigation className="h-4 w-4" />
                  <span>Live GPS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Map Legend */}
        <MapLegend />
      </div>

      {/* Right Panel - Active Alerts */}
      <ActiveAlerts />
    </div>
  );
}

export default LiveMap;