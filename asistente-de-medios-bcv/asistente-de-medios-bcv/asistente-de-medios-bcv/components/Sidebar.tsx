
import React from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardIcon, AnalysisIcon, AlertIcon, EditIcon, AssetIcon, MicIcon, SettingsIcon, BcvLogo, TelegramIcon } from './Icons';

const navItems = [
  { path: '/', label: 'Dashboard', icon: DashboardIcon },
  { path: '/analysis', label: 'Análisis Institucional', icon: AnalysisIcon },
  { path: '/telegram-monitor', label: 'Monitor Telegram', icon: TelegramIcon },
  { path: '/economic-alerts', label: 'Alertas Económicas', icon: AlertIcon },
  { path: '/content-generator', label: 'Generador de Contenido', icon: EditIcon },
  { path: '/asset-tracking', label: 'Seguimiento de Activos', icon: AssetIcon },
  { path: '/transcriber', label: 'Transcriptor de Audio', icon: MicIcon },
];

const Sidebar: React.FC = () => {
  const baseLinkClasses = "flex items-center px-4 py-3 text-slate-300 hover:bg-bcv-blue-800 hover:text-white transition-colors duration-200";
  const activeLinkClasses = "bg-bcv-blue-700 text-white font-semibold";

  return (
    <div className="flex flex-col w-64 bg-bcv-blue-950 text-white">
      <div className="flex items-center justify-center h-20 border-b border-bcv-blue-900">
        <BcvLogo className="h-10 w-10 mr-2" />
        <h1 className="text-xl font-bold text-bcv-gold">Asistente BCV</h1>
      </div>
      <nav className="flex-1 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : ''}`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-bcv-blue-900">
        <NavLink
            to="/settings"
            className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : ''}`}
          >
          <SettingsIcon className="h-5 w-5 mr-3" />
          <span>Configuración</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
