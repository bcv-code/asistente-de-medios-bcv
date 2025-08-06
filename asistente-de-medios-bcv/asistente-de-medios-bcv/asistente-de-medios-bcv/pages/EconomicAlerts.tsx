
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getGeopoliticalAnalysis } from '../services/geminiService';
import { GeopoliticalAnalysis } from '../types';
import Spinner from '../components/Spinner';

// Mock data generation
const generateData = () => {
    let data = [];
    let value = 50;
    for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        value += (Math.random() - 0.5) * 5;
        data.push({
            date: date.toLocaleDateString('es-VE', { month: 'short', day: 'numeric' }),
            'Índice de Actividad Económica': Math.max(20, value),
        });
    }
    return data;
};

// Simple moving average to simulate Kalman filter
const simpleMovingAverage = (data: any[], windowSize: number) => {
    if (!data || data.length === 0) return [];
    let result = [];
    for (let i = 0; i < data.length; i++) {
        let avg = null;
        if (i >= windowSize - 1) {
            let sum = 0;
            for (let j = 0; j < windowSize; j++) {
                sum += data[i - j]['Índice de Actividad Económica'];
            }
            avg = sum / windowSize;
        }
        result.push({
            ...data[i],
            'Tendencia (Suavizada)': avg
        });
    }
    return result;
};


const EconomicAlerts: React.FC = () => {
    const [data, setData] = useState(() => simpleMovingAverage(generateData(), 5));
    const [selectedNews, setSelectedNews] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<GeopoliticalAnalysis | null>(null);
    const [loadingAnalysis, setLoadingAnalysis] = useState<boolean>(false);

    const mockNews = useMemo(() => [
        "El BCV anuncia nuevas medidas para controlar la inflación y estabilizar el mercado cambiario.",
        "Aumentan las exportaciones no tradicionales en un 15% durante el último trimestre, según cifras oficiales.",
        "Tensiones en el mercado petrolero internacional podrían afectar los ingresos fiscales de Venezuela.",
    ], []);

    const handleAnalyzeNews = async (newsSummary: string) => {
        setSelectedNews(newsSummary);
        setLoadingAnalysis(true);
        setAnalysis(null);
        const result = await getGeopoliticalAnalysis(newsSummary);
        setAnalysis(result);
        setLoadingAnalysis(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">Análisis de Series Temporales Económicas</h2>
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                            <XAxis dataKey="date" tick={{ fill: 'rgb(100 116 139)' }} />
                            <YAxis tick={{ fill: 'rgb(100 116 139)' }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(30, 41, 59, 0.9)',
                                    borderColor: 'rgb(51 65 85)'
                                }}
                                labelStyle={{ color: '#fff' }}
                            />
                            <Legend wrapperStyle={{ color: 'rgb(100 116 139)' }}/>
                            <Line type="monotone" dataKey="Índice de Actividad Económica" stroke="#3b9cf5" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="Tendencia (Suavizada)" stroke="#c7a75a" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">Alertas y Análisis Geopolítico</h2>
                <div className="space-y-4">
                    {mockNews.map((news, index) => (
                        <div key={index} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <p className="text-sm text-slate-700 dark:text-slate-300">{news}</p>
                            <button
                                onClick={() => handleAnalyzeNews(news)}
                                className="text-sm mt-2 text-bcv-blue-600 dark:text-bcv-blue-400 hover:underline"
                            >
                                Analizar Impacto
                            </button>
                        </div>
                    ))}
                </div>

                {loadingAnalysis && <div className="mt-4"><Spinner /></div>}
                
                {analysis && selectedNews && (
                    <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg animate-fade-in">
                        <h3 className="font-bold text-md mb-2">Análisis para: <span className="font-normal">"{selectedNews}"</span></h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2"><span className="font-semibold">Resumen:</span> {analysis.summary}</p>
                        <div className="text-sm mb-2">
                           <span className="font-semibold">Puntos Clave:</span>
                           <ul className="list-disc list-inside ml-4">
                               {analysis.keyPoints.map((pt, i) => <li key={i}>{pt}</li>)}
                           </ul>
                        </div>
                        <p className="text-sm"><span className="font-semibold">Evaluación de Riesgo:</span> <span className="font-bold">{analysis.riskAssessment}</span></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EconomicAlerts;
