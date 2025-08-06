
export interface NewsArticle {
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
}

export interface GroundingChunk {
  web: {
    uri: string;
    title: string;
  };
}

export interface GeopoliticalAnalysis {
  summary: string;
  keyPoints: string[];
  riskAssessment: string;
}

export interface Metric {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}
