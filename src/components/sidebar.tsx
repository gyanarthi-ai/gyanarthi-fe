"use client";

import { History, HelpCircle, Diamond, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchHistoryItem {
  id: string;
  query: string;
  date: string;
}

const searchHistory: SearchHistoryItem[] = [
  {
    id: "1",
    query: "Do mRNA vaccines have the potential to treat malaria?",
    date: "Today"
  },
  {
    id: "2",
    query: "What are the latest trends in blockchain consensus...",
    date: "Today"
  },
  {
    id: "3",
    query: "What are the latest trends in blockchain consensus algorithms?",
    date: "Today"
  }
];

export function Sidebar() {
  return (
    <div className="flex h-screen w-80 flex-col border-r bg-background">
      <div className="p-4 border-b">
        <Button variant="outline" className="w-full justify-start gap-2">
          <User className="h-4 w-4" />
          Rohsik Spydo
        </Button>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="py-4">
          <h2 className="text-sm font-semibold mb-2">Today</h2>
          {searchHistory.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="w-full justify-start text-left mb-1 h-auto py-2 px-3"
            >
              <span className="truncate w-[250px]">{item.query}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-4 space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <HelpCircle className="h-4 w-4" />
          Help center
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 text-blue-600">
          <Diamond className="h-4 w-4" />
          Upgrade to Premium
        </Button>
      </div>
    </div>
  );
}