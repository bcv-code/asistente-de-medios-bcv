
import React, { useState } from 'react';
import { generateContentForType } from '../services/geminiService';
import Spinner from '../components/Spinner';
import { EditIcon } from '../components/Icons';

const ContentGenerator: React.FC = () => {
    const [topic, setTopic] = useState<string>('');
    const [contentType, setContentType] = useState<string>('Comunicado de Prensa');
    const [generatedContent, setGeneratedContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const contentTypes = ['Comunicado de Prensa', 'Publicación para Redes Sociales', 'Resumen Ejecutivo', 'Discurso'];

    const handleGenerate = async () => {
        if (!topic) return;
        setLoading(true);
        setGeneratedContent('');
        const result = await generateContentForType(topic, contentType);
        setGeneratedContent(result);
        setLoading(false);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <EditIcon className="w-6 h-6 mr-3 text-bcv-blue-600" />
                    Generador de Contenido
                </h2>
                <p className="mb-6 text-slate-600 dark:text-slate-400">
                    Proporcione un tema y seleccione un tipo de contenido. La IA generará un borrador inicial para su revisión.
                </p>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="topic" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Tema Principal
                        </label>
                        <textarea
                            id="topic"
                            rows={4}
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="Ej: Resultados de la última subasta de divisas, nueva regulación sobre criptoactivos..."
                            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-2 focus:ring-bcv-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="contentType" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Tipo de Contenido
                        </label>
                        <select
                            id="contentType"
                            value={contentType}
                            onChange={(e) => setContentType(e.target.value)}
                            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-2 focus:ring-bcv-blue-500 focus:outline-none"
                        >
                            {contentTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                    <button
                        onClick={handleGenerate}
                        disabled={loading || !topic}
                        className="w-full px-6 py-3 bg-bcv-blue-700 text-white font-semibold rounded-lg hover:bg-bcv-blue-800 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Generando...' : 'Generar Borrador'}
                    </button>
                </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Contenido Generado</h3>
                <div className="h-96 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-700">
                    {loading && <Spinner />}
                    {generatedContent && (
                        <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                           {generatedContent}
                        </div>
                    )}
                    {!loading && !generatedContent && (
                        <div className="flex items-center justify-center h-full text-slate-500">
                            El contenido generado aparecerá aquí.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContentGenerator;
