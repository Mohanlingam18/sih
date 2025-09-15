import React from 'react';
import { 
  Shield, 
  Map, 
  AlertTriangle, 
  MapPin, 
  UserCheck, 
  BarChart3, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type ActiveView = 'live-map' | 'incidents' | 'geo-fences' | 'id-verification' | 'analytics';

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const { logout, user } = useAuth();

  const menuItems = [
    { id: 'live-map', icon: Map, label: 'Live Map' },
    { id: 'incidents', icon: AlertTriangle, label: 'Incidents', badge: '7' },
    { id: 'geo-fences', icon: MapPin, label: 'Geo-Fences' },
    { id: 'id-verification', icon: UserCheck, label: 'ID Verification' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' }
  ];

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">ERC Dashboard</h1>
            <p className="text-xs text-gray-600">Tourist Safety</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ActiveView)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.username}</p>
              <p className="text-xs text-gray-600">{user?.role}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;