
import React, { useState } from 'react';
import { generateTelegramMessages } from '../services/geminiService';
import Spinner from '../components/Spinner';
import { TelegramIcon } from '../components/Icons';

interface TelegramMessage {
    channel: string;
    author: string;
    text: string;
    timestamp: string;
}

const TelegramMonitor: React.FC = () => {
    const [channels, setChannels] = useState<string>('@bcv_org_ve, @economia_digital');
    const [messages, setMessages] = useState<TelegramMessage[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleMonitor = async () => {
        if (!channels) {
            setError('Por favor, ingrese al menos un canal de Telegram.');
            return;
        }
        setError('');
        setLoading(true);
        setMessages([]);
        try {
            const results = await generateTelegramMessages(channels);
            setMessages(results);
        } catch (err) {
            setError('Ocurrió un error al monitorear los canales.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <TelegramIcon className="w-6 h-6 mr-3 text-bcv-blue-600" />
                    Monitor de Canales de Telegram (Simulado)
                </h2>
                <p className="mb-6 text-slate-600 dark:text-slate-400">
                    Ingrese los nombres de los canales de Telegram (separados por comas) para generar un feed de mensajes simulado utilizando IA.
                </p>
                <div className="flex space-x-4 mb-6">
                    <input
                        type="text"
                        value={channels}
                        onChange={(e) => setChannels(e.target.value)}
                        placeholder="@canal1, @canal2"
                        className="flex-grow p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-2 focus:ring-bcv-blue-500 focus:outline-none"
                    />
                    <button
                        onClick={handleMonitor}
                        disabled={loading}
                        className="px-6 py-3 bg-bcv-blue-700 text-white font-semibold rounded-lg hover:bg-bcv-blue-800 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Monitoreando...' : 'Monitorear'}
                    </button>
                </div>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            </div>

            <div className="mt-6">
                {loading && (
                    <div className="flex justify-center">
                        <Spinner size="lg" />
                    </div>
                )}

                {messages.length > 0 && (
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md space-y-4 animate-fade-in">
                        {messages.map((msg, index) => (
                            <div key={index} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-l-4 border-bcv-blue-500">
                                <div className="flex justify-between items-center mb-1">
                                    <div className="flex items-center">
                                        <p className="font-bold text-bcv-blue-700 dark:text-bcv-blue-400">{msg.channel}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 ml-3">{msg.author}</p>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-500">{msg.timestamp}</p>
                                </div>
                                <p className="text-slate-800 dark:text-slate-200">{msg.text}</p>
                            </div>
                        ))}
                    </div>
                )}
                 {!loading && messages.length === 0 && (
                    <div className="text-center p-6 text-slate-500">
                        Los mensajes simulados aparecerán aquí.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TelegramMonitor;
