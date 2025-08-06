
import React, { useState, useRef, useCallback } from 'react';
import { MicIcon } from '../components/Icons';
import Spinner from '../components/Spinner';
import { generateText } from '../services/geminiService';

const AudioTranscriber: React.FC = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState('');
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const handleStop = useCallback(async () => {
        setIsProcessing(true);
        setTranscript('');
        setError('');

        const prompt = "Genera una transcripción ficticia pero plausible para un clip de audio de 15 segundos de un oficial de un banco central hablando sobre política monetaria. Incluye pausas y algunas dudas para que suene realista.";
        try {
            const result = await generateText(prompt);
            setTranscript(result);
        } catch (err) {
            setError('Error al generar la transcripción simulada.');
        } finally {
            setIsProcessing(false);
        }
    }, []);


    const startRecording = async () => {
        setError('');
        setTranscript('');
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorderRef.current = new MediaRecorder(stream);
                mediaRecorderRef.current.onstop = handleStop;
                mediaRecorderRef.current.start();
                setIsRecording(true);
            } catch (err) {
                console.error("Error accessing microphone:", err);
                setError("No se pudo acceder al micrófono. Por favor, verifique los permisos.");
            }
        } else {
            setError("La grabación de audio no es compatible con este navegador.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            // Get rid of the MediaStream track to turn off the recording indicator
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            setIsRecording(false);
        }
    };

    const handleToggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-bold mb-2">Transcriptor de Audio</h2>
                <p className="mb-6 text-slate-600 dark:text-slate-400">
                    Grabe audio desde su micrófono para transcribirlo a texto utilizando IA.
                </p>

                <div className="flex justify-center items-center mb-6">
                    <button
                        onClick={handleToggleRecording}
                        disabled={isProcessing}
                        className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300
                            ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-bcv-blue-700 hover:bg-bcv-blue-800'}
                            ${isProcessing ? 'cursor-not-allowed bg-slate-400' : ''}`}
                    >
                        <MicIcon className="w-10 h-10 text-white" />
                    </button>
                </div>
                <p className="h-6 text-lg font-semibold text-slate-700 dark:text-slate-300">
                    {isProcessing ? 'Procesando...' : isRecording ? 'Grabando...' : 'Presione para grabar'}
                </p>

                {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>

            {(isProcessing || transcript) && (
                <div className="mt-6 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Transcripción Resultante</h3>
                    <div className="min-h-[10rem] p-4 bg-slate-50 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-700">
                        {isProcessing ? (
                            <div className="flex items-center justify-center h-full">
                                <Spinner />
                            </div>
                        ) : (
                            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{transcript}</p>
                        )}
                    </div>
                     <p className="text-xs text-center text-slate-500 mt-2">Nota: La transcripción es una simulación generada por IA para fines de demostración.</p>
                </div>
            )}
        </div>
    );
};

export default AudioTranscriber;
