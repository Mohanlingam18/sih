import React, { useState } from 'react';
import Sidebar from './Sidebar';
import LiveMap from './LiveMap';
import IncidentManagement from './IncidentManagement';
import GeoFenceManagement from './GeoFenceManagement';
import IDVerification from './IDVerification';
import Analytics from './Analytics';

type ActiveView = 'live-map' | 'incidents' | 'geo-fences' | 'id-verification' | 'analytics';

function Dashboard() {
  const [activeView, setActiveView] = useState<ActiveView>('live-map');

  const renderContent = () => {
    switch (activeView) {
      case 'live-map':
        return <LiveMap />;
      case 'incidents':
        return <IncidentManagement />;
      case 'geo-fences':
        return <GeoFenceManagement />;
      case 'id-verification':
        return <IDVerification />;
      case 'analytics':
        return <Analytics />;
      default:
        return <LiveMap />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
}

export default Dashboard;