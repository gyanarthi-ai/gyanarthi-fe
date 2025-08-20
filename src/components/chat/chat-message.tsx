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
    <div className={cn("flex gap-3 p-4", role == 'user' && "bg-muted/50")}>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
        {role == 'assistant' ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
      </div>
      <div className="flex-1 space-y-4">
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            components={{
              a: ({ node, children, ...props }) => (
                <a
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${role == 'user'
                    ? "text-blue-100 hover:text-white underline"
                    : "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline"
                    } transition-colors`}
                >
                  {children}
                </a>
              ),
              p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
              code: ({ children }) => (
                <code
                  className={`px-1.5 py-0.5 rounded text-sm font-mono ${role == 'user'
                    ? "bg-blue-600/50 text-blue-100"
                    : "bg-muted text-muted-foreground dark:bg-gray-700 dark:text-gray-300"
                    }`}
                >
                  {children}
                </code>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
          {/* <p className="text-sm leading-relaxed">{content}</p> */}
        </div>
      </div>
    </div>
  );
}
