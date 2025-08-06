
import { GoogleGenAI, Type } from "@google/genai";

// Se utiliza la clave de API de Gemini proporcionada para que funcione en este entorno de demostración.
const apiKey = "AIzaSyAojUUxKxHNZd37FLlxgmvi0L5VguQgvC4";
if (!apiKey) {
    // Esta comprobación se mantiene como salvaguarda.
    throw new Error("API_KEY para el servicio de Gemini no está configurada.");
}

const ai = new GoogleGenAI({ apiKey });
const textModel = 'gemini-2.5-flash';

export const generateText = async (prompt: string) => {
    try {
        const response = await ai.models.generateContent({
            model: textModel,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating text:", error);
        return "Error: No se pudo generar una respuesta. Por favor, inténtelo de nuevo.";
    }
};

export const analyzeInstitutionalTopic = async (topic: string) => {
    const prompt = `
    Realiza un análisis de percepción institucional sobre "${topic}".
    Evalúa el sentimiento general (Positivo, Negativo, Neutral), identifica los temas clave discutidos en los medios y genera un resumen ejecutivo.
    El sentimiento debe ser una única palabra. Los temas clave deben ser una lista de viñetas.
    `;
    try {
        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                sentiment: { type: Type.STRING, description: "El sentimiento general: Positivo, Negativo o Neutral." },
                keyThemes: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lista de temas clave." },
                executiveSummary: { type: Type.STRING, description: "Un resumen ejecutivo del análisis." }
            }
        };

        const response = await ai.models.generateContent({
            model: textModel,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            }
        });
        
        return JSON.parse(response.text);

    } catch (error) {
        console.error("Error analyzing institutional topic:", error);
        return {
            sentiment: "Error",
            keyThemes: [],
            executiveSummary: "No se pudo completar el análisis."
        };
    }
};

export const generateNewsHeadlines = async (topic: string) => {
    const prompt = `Genera 5 titulares de noticias recientes y creíbles sobre "${topic}" en Venezuela. Cada titular debe incluir una fuente ficticia y un breve resumen de una oración.`;
    try {
        const responseSchema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    source: { type: Type.STRING },
                    summary: { type: Type.STRING }
                }
            }
        };

        const response = await ai.models.generateContent({
            model: textModel,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            }
        });

        return JSON.parse(response.text);

    } catch (error) {
        console.error("Error generating headlines:", error);
        return [];
    }
};

export const generateContentForType = async (topic: string, contentType: string) => {
    const prompt = `Eres un experto en comunicaciones del Banco Central de Venezuela.
    Basado en el tema "${topic}", redacta un borrador para un "${contentType}".
    El tono debe ser formal, informativo y alineado con los objetivos institucionales.
    `;
    return generateText(prompt);
};

export const getGeopoliticalAnalysis = async (newsSummary: string) => {
    const prompt = `Analiza la siguiente noticia desde una perspectiva geopolítica, enfocándote en el impacto para Venezuela. 
    Noticia: "${newsSummary}"
    
    Proporciona un resumen del análisis, 3 puntos clave y una evaluación de riesgo (Bajo, Medio, Alto).`;
    
    try {
        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING },
                keyPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                riskAssessment: { type: Type.STRING }
            }
        };
        const response = await ai.models.generateContent({
            model: textModel,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            }
        });
        return JSON.parse(response.text);

    } catch (error) {
        console.error("Error getting geopolitical analysis:", error);
        return null;
    }
};

export const generateTelegramMessages = async (channels: string) => {
    const prompt = `
    Simula un feed de mensajes de los siguientes canales de Telegram: ${channels}.
    Los temas deben centrarse en la economía de Venezuela, finanzas, y anuncios del BCV.
    Genera 5 mensajes realistas. Cada mensaje debe incluir el nombre del canal, un autor ficticio, el contenido del mensaje y una marca de tiempo relativa (p. ej., "hace 5 minutos").
    `;

    try {
        const responseSchema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    channel: { type: Type.STRING },
                    author: { type: Type.STRING },
                    text: { type: Type.STRING },
                    timestamp: { type: Type.STRING }
                }
            }
        };
        
        const response = await ai.models.generateContent({
            model: textModel,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            }
        });

        return JSON.parse(response.text);

    } catch (error) {
        console.error("Error generating Telegram messages:", error);
        return [];
    }
};
