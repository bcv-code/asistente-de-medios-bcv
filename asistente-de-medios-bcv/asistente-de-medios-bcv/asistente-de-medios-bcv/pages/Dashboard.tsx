import React, { useState, useEffect } from 'react';
import { Metric, NewsArticle } from '../types';
import { getRealNews } from '../services/newsService';
import Spinner from '../components/Spinner';

const MetricCard: React.FC<{ metric: Metric }> = ({ metric }) => {
    const changeColor = metric.changeType === 'positive' ? 'text-green-500' : metric.changeType === 'negative' ? 'text-red-500' : 'text-slate-500';
    const changeIcon = metric.changeType === 'positive' ? '▲' : '▼';

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{metric.title}</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-2">{metric.value}</p>
            <p className={`text-sm mt-1 ${changeColor}`}>
                {metric.changeType !== 'neutral' && <span>{changeIcon}</span>} {metric.change}
            </p>
        </div>
    );
};

const LiveFeedItem: React.FC<NewsArticle> = ({ title, source, summary, url, publishedAt }) => {
    const formattedDate = new Date(publishedAt).toLocaleString('es-VE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    return (
        <div className="border-b border-slate-200 dark:border-slate-700 last:border-b-0">
            <a href={url} target="_blank" rel="noopener noreferrer" className="block p-3 -m-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200">
                <div className="flex justify-between items-center mb-1">
                    <p className="text-sm text-bcv-blue-600 dark:text-bcv-blue-400 font-semibold truncate pr-4">{source}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">{formattedDate}</p>
                </div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200">{title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{summary}</p>
            </a>
        </div>
    );
};


const Dashboard: React.FC = () => {
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [feed, setFeed] = useState<NewsArticle[]>([]);
    const [loadingFeed, setLoadingFeed] = useState(true);

    useEffect(() => {
        // Mock metrics data
        setMetrics([
            { title: 'Menciones en Medios (24h)', value: '1,284', change: '+5.2%', changeType: 'positive' },
            { title: 'Sentimiento General', value: 'Neutral', change: '-2.1%', changeType: 'negative' },
            { title: 'Reservas Internacionales (USD)', value: '$10.5B', change: '+0.1%', changeType: 'positive' },
            { title: 'Tipo de Cambio (BCV)', value: '36.50 VES', change: 'Estable', changeType: 'neutral' },
        ]);

        const fetchFeed = async () => {
            setLoadingFeed(true);
            const headlines = await getRealNews('economía venezolana AND (BCV OR "dólar")');
            setFeed(headlines);
            setLoadingFeed(false);
        };
        fetchFeed();
    }, []);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map(metric => <MetricCard key={metric.title} metric={metric} />)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Feed de Noticias en Vivo</h3>
                    {loadingFeed ? <div className="flex justify-center items-center h-72"><Spinner /></div> : (
                        <div className="max-h-96 overflow-y-auto pr-2">
                            {feed.length > 0 ? feed.map((item, index) => <LiveFeedItem key={`${item.url}-${index}`} {...item} />) : <p>No se encontraron noticias.</p>}
                        </div>
                    )}
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Canales de YouTube</h3>
                     <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <img src="https://picsum.photos/seed/yt1/100/70" alt="Video thumbnail" className="w-24 h-16 object-cover rounded-md" />
                            <div>
                                <p className="font-semibold text-sm">Rueda de prensa sobre políticas monetarias</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Canal BCV</p>
                            </div>
                        </div>
                         <div className="flex items-center space-x-4">
                            <img src="https://picsum.photos/seed/yt2/100/70" alt="Video thumbnail" className="w-24 h-16 object-cover rounded-md" />
                            <div>
                                <p className="font-semibold text-sm">Análisis del mercado de divisas</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Economía Digital</p>
                            </div>
                        </div>
                         <div className="flex items-center space-x-4">
                            <img src="https://picsum.photos/seed/yt3/100/70" alt="Video thumbnail" className="w-24 h-16 object-cover rounded-md" />
                            <div>
                                <p className="font-semibold text-sm">Reporte Semanal de Inflación</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Noticias Económicas TV</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;