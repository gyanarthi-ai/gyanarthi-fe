"use client";

import { useState } from "react";
import { SearchForm } from "@/components/search/search-form";
import { ChatView } from "@/components/chat/chat-view";
import { Sidebar } from "@/components/sidebar";
import type { Message } from "@/types/chat";
import { generateBotResponse } from "@/lib/sample-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const promptCards = [
  {
    title: "Machine Learning Trends",
    description: "Explore current developments in ML",
    query: "What are the latest trends in machine learning?",
  },
  {
    title: "AI in Healthcare",
    description: "Discover AI applications in medicine",
    query: "Explain the impact of AI on healthcare",
  },
  {
    title: "Data Visualization Tips",
    description: "Learn effective data presentation techniques",
    query: "What are the best practices for data visualization?",
  },
  {
    title: "Big Data Analytics",
    description: "Understand big data processing and uses",
    query: "Explain big data analytics and its applications",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSearch = async (query: string, citationId?: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: query,
      isBot: false,
      timestamp: Date.now(),
      selectedCitationId: citationId,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: query }),
      });

      const data = (await response.json()) as {
        provided_response: string;
        verification_result: {
          factual_accuracy: string;
          ground_truth: string;
          confidence_score: number;
        };
      };

      const botResponse: Message = {
        id: Date.now().toString(),
        content: data.provided_response,
        isBot: true,
        timestamp: Date.now(),
        selectedCitationId: citationId,
        verificationResult: {
          factualAccuracy: data.verification_result.factual_accuracy,
          groundTruth: data.verification_result.ground_truth,
          confidenceScore: data.verification_result.confidence_score,
        },
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, there was an error processing your request.",
        isBot: true,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleCitationFollowUp = (citationId: string) => {
    void handleSearch("Tell me more about this research paper", citationId);
  };

  return (
    <div className="flex h-screen">
      {/* {messages.length > 0 && <Sidebar />} */}
      <main className="flex h-full max-w-[800px] mx-auto flex-1 flex-col overflow-hidden">
        <div className="flex h-full flex-1 flex-col">
          {messages.length > 0 ? (
            <ChatView
              messages={messages}
              handleCitationFollowUp={handleCitationFollowUp}
            />
          ) : (
            <div className="mt-40 flex min-h-screen flex-col">
              <div className="flex flex-1 flex-col items-center px-4 pb-32 pt-16">
                <div className="mb-8 text-center">
                  <h1 className="mb-4 text-4xl font-bold">Talk Data to Me</h1>
                  <p className="text-muted-foreground">
                    Choose a prompt below or write your own to start chatting
                  </p>
                </div>
                <div className="grid max-w-2xl grid-cols-2 gap-4">
                  {promptCards.map((card, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(card.query)}
                      className="rounded-lg border p-4 text-left hover:bg-gray-50"
                    >
                      <h3 className="mb-2 font-medium">{card.title}</h3>
                      <p className="text-sm text-gray-600">
                        {card.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="fixed bottom-0 left-0 right-0 border-t bg-background/80 p-4 backdrop-blur-sm">
                <div className="mx-auto max-w-2xl">
                  <SearchForm onSubmit={handleSearch} />
                </div>
              </div>
            </div>
          )}
          {messages.length > 0 && (
            <div className="border-t p-4">
              <div className="mx-auto max-w-3xl">
                <SearchForm onSubmit={handleSearch} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
