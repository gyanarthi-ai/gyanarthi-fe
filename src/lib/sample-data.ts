import { Message, Citation, CitationScore } from "@/types/chat";

const citationScores: Record<string, CitationScore> = {
  "1": {
    impact: 9.2,
    citations: 1250,
    relevance: 8.5,
  },
  "2": {
    impact: 8.7,
    citations: 890,
    relevance: 9.0,
  },
  "3": {
    impact: 7.8,
    citations: 456,
    relevance: 8.8,
  },
};

export const generateBotResponse = (
  query: string,
  selectedCitationId?: string,
): Message => {
  // If it's a follow-up question about a specific paper
  if (selectedCitationId && citationScores[selectedCitationId]) {
    return {
      id: Date.now().toString(),
      content: `This paper has been cited ${citationScores[selectedCitationId].citations} times and has an impact factor of ${citationScores[selectedCitationId].impact}. The research methodology was rigorous and the findings have been well-received by the scientific community. Would you like to know more about any specific aspect of this paper?`,
      role: 'assistant',
      timestamp: Date.now(),
    };
  }

  const responses: Record<string, Message> = {
    mRNA: {
      id: Date.now().toString(),
      content:
        "Recent studies have shown promising developments in mRNA vaccine technology for treating malaria. Research indicates that mRNA vaccines could potentially target multiple stages of the malaria parasite's life cycle, offering a new approach to malaria prevention and treatment.",
                      role: 'assistant',
      timestamp: Date.now(),
      // citations: [
      //   {
      //     id: "1",
      //     title: "mRNA vaccines — a new era in vaccinology",
      //     authors: ["Pardi, N.", "Hogan, M.J.", "Porter, F.W.", "Weissman, D."],
      //     year: 2018,
      //     journal: "Nature Reviews Drug Discovery",
      //     url: "https://www.nature.com/articles/nrd.2017.243",
      //     score: citationScores["1"],
      //   },
      //   {
      //     id: "2",
      //     title: "Advances in mRNA Vaccines for Infectious Diseases",
      //     authors: ["Jackson, N.A.C.", "Kester, K.E.", "Casimiro, D."],
      //     year: 2020,
      //     journal: "Nature Reviews Immunology",
      //     url: "https://www.nature.com/articles/s41577-020-0321-6",
      //     score: citationScores["2"],
      //   },
      // ],
    },
    // ... other responses
  };

  // Default response logic remains the same
  const defaultResponse: Message = {
    id: Date.now().toString(),
    content:
      "I've analyzed your query but couldn't find specific research citations. Could you please rephrase or provide more specific details about what you're looking for?",
                    role: 'assistant',
    timestamp: Date.now(),
  };

  const keyword = Object.keys(responses).find((key) =>
    query.toLowerCase().includes(key.toLowerCase()),
  );
  if (keyword) {
    return responses[keyword] as unknown as Message;
  } else {
    return defaultResponse;
  }
};
