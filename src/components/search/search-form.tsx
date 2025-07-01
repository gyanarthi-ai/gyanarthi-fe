"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Sparkles } from "lucide-react";
import { Input } from "../ui/input";
import React from "react";

interface SearchFormProps {
  onSubmit: (query: string) => void;
}

export function SearchForm({ onSubmit }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = React.useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <Input
        type="text"
        placeholder="What are the best open opportunities by company size?"
        value={query}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        onChange={(e: any) => setQuery(e?.target?.value as string)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`h-14 pr-24 pl-12 rounded-full text-lg transition-all duration-300 ${isFocused ? 'shadow-lg' : ''
          }`}
      />
      <Sparkles className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-opacity duration-300 ${isFocused || query ? 'opacity-100 text-primary' : 'opacity-50'
        }`} />
      <Button
        size="icon"
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
      >
        <Send className="h-5 w-5" />
        <span className="sr-only">Send prompt</span>
      </Button>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
    </form>
  )
}