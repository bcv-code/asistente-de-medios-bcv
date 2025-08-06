
import React from 'react';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  const getTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard Central';
      case '/analysis': return 'Análisis Institucional';
      case '/telegram-monitor': return 'Monitor de Telegram';
      case '/economic-alerts': return 'Alertas Económicas';
      case '/content-generator': return 'Generador de Contenido';
      case '/asset-tracking': return 'Seguimiento de Activos';
      case '/transcriber': return 'Transcriptor de Audio';
      case '/settings': return 'Configuración';
      default: return 'Asistente de Medios BCV';
    }
  };

  return (
    <header className="h-20 flex items-center justify-between px-6 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{getTitle()}</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
            <div className="w-3 h-3 bg-red-500 rounded-full absolute top-0 right-0 border-2 border-white dark:border-slate-800"></div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500 dark:text-slate-400"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        </div>
        <img className="h-10 w-10 rounded-full object-cover" src="https://picsum.photos/100/100" alt="User avatar" />
      </div>
    </header>
  );
};

export default Header;
