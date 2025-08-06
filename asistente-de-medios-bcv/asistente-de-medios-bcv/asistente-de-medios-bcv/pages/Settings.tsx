
import React from 'react';

const Settings: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Configuración</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">APIs y Servicios</h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="gemini-api" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Google Gemini API Key
                                </label>
                                <input
                                    type="text"
                                    id="gemini-api"
                                    disabled
                                    value="Configurado en el servidor"
                                    className="mt-1 block w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm cursor-not-allowed"
                                />
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">La clave de API se gestiona de forma segura a nivel de entorno.</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">Fuentes de Monitoreo</h3>
                        <div className="space-y-4">
                             <div>
                                <label htmlFor="telegram" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Canales de Telegram
                                </label>
                                <input
                                    type="text"
                                    id="telegram"
                                    defaultValue="@bcv_org_ve, @economia_digital"
                                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-bcv-blue-500 focus:border-bcv-blue-500"
                                />
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Separar los nombres de los canales con comas.</p>
                            </div>
                             <div>
                                <label htmlFor="news-sources" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Fuentes de Noticias (URLs)
                                </label>
                                <textarea
                                    id="news-sources"
                                    rows={3}
                                    defaultValue="https://www.bancaynegocios.com/\nhttps://www.descifrado.com/"
                                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-bcv-blue-500 focus:border-bcv-blue-500"
                                />
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Una URL por línea.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end pt-4">
                         <button
                            className="px-6 py-2 bg-bcv-blue-700 text-white font-semibold rounded-lg hover:bg-bcv-blue-800 disabled:bg-slate-400 transition-colors"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
