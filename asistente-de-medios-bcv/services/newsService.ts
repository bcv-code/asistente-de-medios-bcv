
import type { NewsArticle } from '../types';

// Se utiliza la clave de API proporcionada para corregir el error de configuración en el entorno de demostración.
const API_KEY = '96e755c09a944dbb80c920a680ca5712';

const NEWS_API_URL = 'https://newsapi.org/v2/everything';

interface NewsApiResponseArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export const getRealNews = async (query: string): Promise<NewsArticle[]> => {
  if (!API_KEY) {
    console.error("News API key not configured.");
    return [{
      title: "Error de Configuración",
      summary: "La clave de la API de noticias no está configurada. Esta es una demostración, pero se requiere una clave para funcionar.",
      source: "Sistema",
      url: "#",
      publishedAt: new Date().toISOString()
    }];
  }

  // Una consulta más específica para noticias relevantes. Buscamos artículos en español.
  const apiUrl = `${NEWS_API_URL}?q=${encodeURIComponent(query)}&language=es&sortBy=publishedAt&pageSize=10&apiKey=${API_KEY}`;

  try {
    // Usamos un proxy público y más confiable para evitar problemas de CORS en el entorno de demostración
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
        let errorData;
        try {
            // El proxy puede devolver texto plano en caso de error, no JSON.
            const errorText = await response.text();
            errorData = { message: errorText || response.statusText };
        } catch(e) {
            errorData = { message: response.statusText };
        }
        
        console.error("Error fetching news:", errorData.message);
        
        let summary = "No se pudieron obtener las noticias del servicio externo.";
        if (response.status === 401 || (errorData.message && errorData.message.includes('apiKeyInvalid'))) {
            summary = "Error de autenticación. La clave de la API de noticias podría ser inválida o haber expirado."
        } else if (response.status === 429 || (errorData.message && errorData.message.includes('rateLimited'))) {
            summary = "Se ha excedido el límite de solicitudes a la API de noticias. Inténtelo de nuevo más tarde."
        } else if (errorData && errorData.message) {
            summary = `Error del servidor de noticias: ${errorData.message}`;
        }

        return [{
          title: "Error al Cargar Noticias",
          summary,
          source: "Servicio de Noticias",
          url: "#",
          publishedAt: new Date().toISOString()
        }];
    }
    
    const data = await response.json();
    
    if (data.articles.length === 0) {
      return [{
          title: "No se encontraron noticias",
          summary: `No se encontraron artículos recientes para la consulta: "${query}". Intente con otros términos.`,
          source: "Servicio de Noticias",
          url: "#",
          publishedAt: new Date().toISOString()
      }];
    }

    return data.articles
      .filter((article: NewsApiResponseArticle) => article.title && article.title !== "[Removed]")
      .map((article: NewsApiResponseArticle) => ({
        title: article.title,
        summary: article.description || 'No hay resumen disponible.',
        source: article.source.name,
        url: article.url,
        publishedAt: article.publishedAt,
    }));

  } catch (error) {
    console.error("Failed to fetch news:", error);
    return [{
      title: "Error de Red o CORS",
      summary: "No se pudo conectar con el servicio de noticias. Verifique su conexión o si alguna extensión del navegador está bloqueando la solicitud.",
      source: "Sistema",
      url: "#",
      publishedAt: new Date().toISOString()
    }];
  }
};
