"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./chat-message";
import { Message } from "@/types/chat";
import { useEffect, useRef } from "react";
import { Badge } from "../ui/badge";
import { ChatLoader } from "./chat-loader";

interface ChatViewProps {
  messages: Message[];
  isLoading: boolean
}

export function ChatView({ messages, isLoading }: ChatViewProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <ScrollArea className="h-full flex-1 overflow-scroll">
        <div className="flex-1 py-5 overflow-hidden shadow-md font-bold text-center text-2xl">
          Chat Mode
        </div>
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
          />
        ))}
        {isLoading &&
          <ChatLoader/>
        }
        <div ref={messagesEndRef} />
      </ScrollArea>
    </>
  );
}
