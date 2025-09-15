import React from 'react';

function MapLegend() {
  const legendItems = [
    { color: 'bg-green-500', label: 'Safe' },
    { color: 'bg-orange-500', label: 'Warning' },
    { color: 'bg-red-500', label: 'Critical' }
  ];

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Legend</h3>
        <div className="flex items-center space-x-6">
          {legendItems.map((item) => (
            <div key={item.label} className="flex items-center space-x-2">
              <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MapLegend;