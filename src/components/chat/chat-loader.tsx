import { Bot } from "lucide-react";

export const ChatLoader = () => {
  return (
    <div className="group flex gap-4 py-6 px-4 md:px-6">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 border border-border">
          <Bot className="h-5 w-5 text-foreground" />
        </div>
      </div>

      {/* Typing Indicator */}
      <div className="flex-1 max-w-3xl">
        <div className="inline-block rounded-2xl px-5 py-3 bg-card border border-border">
          <div className="flex gap-1.5 items-center">
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};