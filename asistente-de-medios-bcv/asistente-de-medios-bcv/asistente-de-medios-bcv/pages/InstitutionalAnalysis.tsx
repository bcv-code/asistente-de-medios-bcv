
import React, { useState } from 'react';
import { analyzeInstitutionalTopic } from '../services/geminiService';
import Spinner from '../components/Spinner';

interface AnalysisResult {
    sentiment: string;
    keyThemes: string[];
    executiveSummary: string;
}

const InstitutionalAnalysis: React.FC = () => {
    const [topic, setTopic] = useState<string>('Banco Central de Venezuela');
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleAnalysis = async () => {
        if (!topic) {
            setError('Por favor, ingrese un tema para analizar.');
            return;
        }
        setError('');
        setLoading(true);
        setResult(null);
        try {
            const analysisResult = await analyzeInstitutionalTopic(topic);
            setResult(analysisResult);
        } catch (err) {
            setError('Ocurrió un error al realizar el análisis.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getSentimentClass = (sentiment: string) => {
        switch (sentiment.toLowerCase()) {
            case 'positivo':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'negativo':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200';
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Análisis de Percepción Institucional</h2>
                <p className="mb-6 text-slate-600 dark:text-slate-400">
                    Ingrese un tema (p. ej., el nombre de la institución, una política o un evento) para analizar su percepción en los medios utilizando IA.
                </p>
                <div className="flex space-x-4 mb-6">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Ej: Banco Central de Venezuela"
                        className="flex-grow p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-2 focus:ring-bcv-blue-500 focus:outline-none"
                    />
                    <button
                        onClick={handleAnalysis}
                        disabled={loading}
                        className="px-6 py-3 bg-bcv-blue-700 text-white font-semibold rounded-lg hover:bg-bcv-blue-800 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Analizando...' : 'Analizar'}
                    </button>
                </div>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            </div>

            {loading && (
                <div className="mt-6 flex justify-center">
                    <Spinner size="lg" />
                </div>
            )}

            {result && (
                <div className="mt-6 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md animate-fade-in">
                    <h3 className="text-xl font-bold mb-4">Resultados del Análisis para "{topic}"</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <h4 className="font-semibold text-slate-600 dark:text-slate-400 mb-2">Sentimiento General</h4>
                            <div className={`px-4 py-2 rounded-lg text-lg font-bold text-center inline-block ${getSentimentClass(result.sentiment)}`}>
                                {result.sentiment}
                            </div>
                        </div>
                        <div className="md:col-span-2">
                             <h4 className="font-semibold text-slate-600 dark:text-slate-400 mb-2">Temas Clave</h4>
                             <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                                {result.keyThemes.map((theme, index) => <li key={index}>{theme}</li>)}
                             </ul>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h4 className="font-semibold text-slate-600 dark:text-slate-400 mb-2">Resumen Ejecutivo</h4>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{result.executiveSummary}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstitutionalAnalysis;
