export interface CitationScore {
  impact: number;  // Impact factor (0-10)
  citations: number;  // Number of citations
  relevance: number;  // Relevance to query (0-10)
}

export interface Citation {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  url: string;
  score?: CitationScore;
}

export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  citations?: Citation[];
  timestamp: number;
  selectedCitationId?: string;  // For follow-up questions
  verificationResult?: {
    factualAccuracy: string;
    groundTruth: string;
    confidenceScore: number;
  };
}