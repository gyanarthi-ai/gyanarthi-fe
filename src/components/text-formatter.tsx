"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface Suggestion {
  id: string;
  start: number;
  end: number;
  type: "fact" | "opinion" | "disputed";
  message: string;
  suggestion?: string;
  severity: "error" | "warning" | "info";
}

interface TextFormatterProps {
  text: string;
  suggestions: Suggestion[];
  onSuggestionClick?: (suggestion: Suggestion) => void;
}

export function TextFormatter({
  text,
  suggestions,
  onSuggestionClick,
}: TextFormatterProps) {
  // Sort suggestions by start position to handle overlapping ranges
  const sortedSuggestions = [...suggestions].sort((a, b) => a.start - b.start);

  const formatText = () => {
    const result: React.ReactNode[] = [];
    let currentIndex = 0;

    sortedSuggestions.forEach((suggestion, idx) => {
      // Add text before the suggestion
      if (suggestion.start > currentIndex) {
        result.push(
          <span key={`text-${idx}`}>
            {text.slice(currentIndex, suggestion.start)}
          </span>,
        );
      }

      // Add the highlighted text with popover
      const highlightedText = text.slice(suggestion.start, suggestion.end);
      result.push(
        <Popover key={suggestion.id}>
          <PopoverTrigger asChild>
            <span
              className={cn("cursor-pointer", {
                "underline decoration-red-400 decoration-wavy":
                  suggestion.type === "opinion",
                "underline decoration-blue-400 decoration-wavy":
                  suggestion.type === "disputed",
                "underline decoration-violet-400 decoration-wavy":
                  suggestion.type === "fact",
              })}
              onClick={() => onSuggestionClick?.(suggestion)}
            >
              {highlightedText}
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-72" side="top" align="start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span
                  className={cn("h-2 w-2 rounded-full", {
                    "bg-red-500": suggestion.severity === "error",
                    "bg-amber-500": suggestion.severity === "warning",
                    "bg-blue-500": suggestion.severity === "info",
                  })}
                />
                <span className="font-medium capitalize">
                  {suggestion.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {suggestion.message}
              </p>
              {suggestion.suggestion && (
                <div className="rounded bg-muted p-2 text-sm">
                  Suggestion: {suggestion.suggestion}
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>,
      );

      currentIndex = suggestion.end;
    });

    // Add remaining text after last suggestion
    if (currentIndex < text.length) {
      result.push(<span key="text-end">{text.slice(currentIndex)}</span>);
    }

    return result;
  };

  return <div className="prose max-w-none">{formatText()}</div>;
}
