"use client";

import { SearchForm } from "@/components/search/search-form";
import { ChatView } from "@/components/chat/chat-view";
import { useChat } from "@/context/ChatContext";
import { useRouter } from "next/navigation";

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
  const { createChat } = useChat()
  const router = useRouter()

  const handleSearch = async (query: string) => {
    const chatId = await createChat(query)
    if (!chatId) return;
    router.push(`/chat/${chatId}`)

  }
  return (
    <div className="flex h-screen">
      <main className="flex h-full max-w-[800px] mx-auto flex-1 flex-col overflow-hidden">
        <div className="flex h-full flex-1 flex-col">
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
          <div className="border-t p-4">
            <div className="mx-auto max-w-3xl">
              <SearchForm onSubmit={handleSearch} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
