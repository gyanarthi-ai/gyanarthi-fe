"use client";

import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import { CitationCard } from "./citation-card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { BiDetail } from "react-icons/bi";
import ChatPopup from "./chatPopup";
interface ChatMessageProps {
  message: Message;
  handleCitationFollowUp: (citationId: string) => void;
}

export function ChatMessage({
  message,
  handleCitationFollowUp,
}: ChatMessageProps) {
  const { isBot, content, citations, verificationResult } = message;

  return (
    <div className={cn("flex gap-3 p-4", !isBot && "bg-muted/50")}>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
        {isBot ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
      </div>
      <div className="flex-1 space-y-4">
        <div className="prose prose-sm max-w-none">
          <p className="text-sm leading-relaxed">{content}</p>
          {message.isBot && (
            <Dialog>
              <DialogTrigger>
                <BiDetail />
              </DialogTrigger>
              <DialogContent>
                <DialogTitle className="hidden">Review Suggestions</DialogTitle>
                <ChatPopup
                  confidence_score={verificationResult?.confidenceScore ?? 0}
                  factual_accuracy={verificationResult?.factualAccuracy}
                  ground_truth={verificationResult?.groundTruth}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>
        {citations && citations?.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">
              Citations
            </h4>
            <div className="grid gap-2">
              {citations?.map((citation) => (
                <CitationCard
                  key={citation.journal}
                  onAskFollowUp={() => handleCitationFollowUp(citation.id)}
                  citation={citation}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
