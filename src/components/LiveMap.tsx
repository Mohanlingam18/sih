import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, Shield, MapPin } from 'lucide-react';
import ActiveAlerts from './ActiveAlerts';
import MapLegend from './MapLegend';

function LiveMap() {
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [searchQuery, setSearchQuery] = useState('');

  const regions = ['All Regions', 'Central District', 'Tourist Zone A', 'Historical Quarter', 'Beach Area'];

  return (
    <div className="h-full flex">
      {/* Main Map Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Live Map</h1>
          
          {/* Map Controls */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Map Controls</h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative bg-gradient-to-br from-blue-50 to-blue-100">
          {/* Simulated Map */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-blue-50 to-teal-100">
            {/* Map Points */}
            <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-orange-500 rounded-full animate-pulse border-2 border-white shadow-lg"></div>
            <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-red-500 rounded-full animate-pulse border-2 border-white shadow-lg"></div>
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
            <div className="absolute top-3/4 left-1/4 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
            <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
          </div>
          
          {/* Map Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Map</h3>
              <p className="text-gray-600">Real-time tourist tracking and safety monitoring</p>
            </div>
          </div>
        </div>

        {/* Map Legend */}
        <MapLegend />
      </div>

      {/* Right Panel - Active Alerts */}
      <ActiveAlerts />
    </div>
  );
}

export default LiveMap;