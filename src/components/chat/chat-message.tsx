"use client";

import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown"
interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({
  message,
}: ChatMessageProps) {
  const { role, content } = message;

  return (
    <div className={cn(
  "flex gap-3 py-4 px-6",
  role == 'user' && "flex-row-reverse"
)}>
  <div className="flex-shrink-0">
    <div className={cn(
      "flex h-8 w-8 items-center justify-center rounded-full",
      role == 'assistant' 
        ? "bg-gray-100 dark:bg-gray-800" 
        : "bg-blue-500"
    )}>
      {role == 'assistant' ? (
        <Bot className="h-4 w-4 text-gray-700 dark:text-gray-300" />
      ) : (
        <User className="h-4 w-4 text-white" />
      )}
    </div>
  </div>
  
  <div className={cn(
    "flex-1 max-w-3xl",
    role == 'user' && "flex justify-end"
  )}>
    <div className={cn(
      "prose prose-sm dark:prose-invert",
      role == 'user' && "text-right"
    )}>
      <ReactMarkdown
        components={{
          a: ({ node, children, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline"
            >
              {children}
            </a>
          ),
          p: ({ children }) => (
            <p className="mb-2 last:mb-0 leading-relaxed">
              {children}
            </p>
          ),
          code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono">
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  </div>
</div>
  );
}
