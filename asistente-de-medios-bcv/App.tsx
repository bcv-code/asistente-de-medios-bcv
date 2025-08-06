
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import InstitutionalAnalysis from './pages/InstitutionalAnalysis';
import TelegramMonitor from './pages/TelegramMonitor';
import EconomicAlerts from './pages/EconomicAlerts';
import ContentGenerator from './pages/ContentGenerator';
import AssetTracking from './pages/AssetTracking';
import AudioTranscriber from './pages/AudioTranscriber';
import Settings from './pages/Settings';

const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 dark:bg-slate-900 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analysis" element={<InstitutionalAnalysis />} />
            <Route path="/telegram-monitor" element={<TelegramMonitor />} />
            <Route path="/economic-alerts" element={<EconomicAlerts />} />
            <Route path="/content-generator" element={<ContentGenerator />} />
            <Route path="/asset-tracking" element={<AssetTracking />} />
            <Route path="/transcriber" element={<AudioTranscriber />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
