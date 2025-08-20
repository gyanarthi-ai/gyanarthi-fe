"use client";

import { Citation } from "@/types/chat";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CitationCardProps {
  citation: Citation;
  onAskFollowUp: (citationId: string) => void;
}

export function CitationCard({ citation, onAskFollowUp }: CitationCardProps) {
  const { score } = citation;

  return (
    <Card className="p-4 hover:bg-muted/50 transition-colors">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h4 className="font-medium text-sm">{citation.title}</h4>
          <p className="text-sm text-muted-foreground mt-1">
            {citation.authors.join(", ")} • {citation.year} • {citation.journal}
          </p>

          {score && (
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">
                Impact: {score.impact}/10
              </Badge>
              <Badge variant="secondary">
                Citations: {score.citations}
              </Badge>
              <Badge variant="secondary">
                Relevance: {score.relevance}/10
              </Badge>
            </div>
          )}

          <div className="flex gap-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAskFollowUp(citation.id)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask about this paper
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(citation.url, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View paper
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}