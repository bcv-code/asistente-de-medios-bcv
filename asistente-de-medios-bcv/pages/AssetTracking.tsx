
import React, { useState } from 'react';
import { generateNewsHeadlines } from '../services/geminiService';
import Spinner from '../components/Spinner';

interface Asset {
    name: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative' | 'neutral';
    newsTopic: string;
}

const initialAssets: Asset[] = [
    { name: 'Reservas de Oro', value: '$7.8B', change: '+0.5%', changeType: 'positive', newsTopic: 'precio internacional del oro y Venezuela' },
    { name: 'Petróleo (WTI)', value: '$75.60', change: '-1.2%', changeType: 'negative', newsTopic: 'mercado petrolero WTI y Venezuela' },
    { name: 'Tipo de Cambio (EUR)', value: '39.80 VES', change: '+0.1%', changeType: 'negative', newsTopic: 'tipo de cambio Euro en Venezuela' },
    { name: 'Petro (PTR)', value: '$60.00', change: '0.0%', changeType: 'neutral', newsTopic: 'criptoactivo Petro en Venezuela' },
];

const AssetTracking: React.FC = () => {
    const [assets] = useState<Asset[]>(initialAssets);
    const [news, setNews] = useState<{ [key: string]: any[] }>({});
    const [loadingNews, setLoadingNews] = useState<string | null>(null);

    const fetchNewsForAsset = async (asset: Asset) => {
        setLoadingNews(asset.name);
        setNews(prev => ({ ...prev, [asset.name]: [] }));
        const headlines = await generateNewsHeadlines(asset.newsTopic);
        setNews(prev => ({ ...prev, [asset.name]: headlines }));
        setLoadingNews(null);
    };

    const getChangeColor = (changeType: Asset['changeType']) => {
        switch (changeType) {
            case 'positive': return 'text-green-500';
            case 'negative': return 'text-red-500';
            default: return 'text-slate-500 dark:text-slate-400';
        }
    };
    
    return (
        <div className="space-y-6">
            {assets.map(asset => (
                <div key={asset.name} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <div className="flex flex-wrap items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{asset.name}</h3>
                            <div className="flex items-baseline space-x-4 mt-1">
                                <p className="text-2xl font-semibold">{asset.value}</p>
                                <p className={`text-sm font-medium ${getChangeColor(asset.changeType)}`}>
                                    {asset.change}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => fetchNewsForAsset(asset)}
                            disabled={loadingNews === asset.name}
                            className="mt-4 md:mt-0 px-4 py-2 bg-bcv-blue-100 text-bcv-blue-800 dark:bg-bcv-blue-900 dark:text-bcv-blue-200 text-sm font-semibold rounded-lg hover:bg-bcv-blue-200 dark:hover:bg-bcv-blue-800 disabled:opacity-50 transition-colors"
                        >
                            {loadingNews === asset.name ? 'Buscando...' : 'Obtener Noticias Recientes'}
                        </button>
                    </div>

                    {loadingNews === asset.name && <div className="mt-4"><Spinner /></div>}

                    {news[asset.name] && news[asset.name].length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
                            {news[asset.name].map((item, index) => (
                                <div key={index} className="text-sm">
                                    <p className="font-semibold text-slate-800 dark:text-slate-200">{item.title} <span className="font-normal text-slate-500 dark:text-slate-400">({item.source})</span></p>
                                    <p className="text-slate-600 dark:text-slate-400">{item.summary}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AssetTracking;
