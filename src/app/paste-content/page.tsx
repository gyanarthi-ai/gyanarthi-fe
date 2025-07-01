"use client";

import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronRight,
  Goal,
  MessageSquare,
  Pencil,
  Shield,
  Star,
  X,
} from "lucide-react";
import { Suggestion, TextFormatter } from "@/components/text-formatter";

export default function WritingAssistant() {
  const sampleText = `You will find here two examples of proposals for postgraduate research from the Department of Social Policy and Criminology. They both give good indication of the sorts of things that need to be included.`;

  const suggestions = [
    {
      id: "1",
      start: 0,
      end: 16,
      type: "fact" as const,
      message: "This phrase could be more direct",
      suggestion: "Here are",
      severity: "info" as const,
    },
    {
      id: "2",
      start: 108,
      end: 129,
      type: "fact" as const,
      message: "Consider using a more concise phrase",
      suggestion: "indicate",
      severity: "warning" as const,
    },
    {
      id: "3",
      start: 130,
      end: 180,
      type: "fact" as const,
      message: "This statement needs a citation or supporting evidence",
      severity: "error" as const,
    },
  ];
  const handleSuggestionClick = (suggestion: Suggestion) => {
    console.log("Suggestion clicked:", suggestion);
  };
  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <h1 className="font-medium">sample-research-proposal</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Goal className="h-4 w-4" />
            Goals
            <span className="flex items-center gap-1">
              <span className="font-semibold text-foreground">71</span>
              Overall score
            </span>
          </div>
        </div>
        <ChevronRight className="h-4 w-4" />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="container mx-auto max-w-[800px] my-24">
          <TextFormatter
            text={sampleText}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        </div>

        {/* Sidebar */}
        <div className="flex w-[400px] flex-col border-l">
          <Tabs defaultValue="review" className="flex-1">
            <TabsList className="h-auto w-full justify-start rounded-none border-b p-0">
              <TabsTrigger
                value="review"
                className="h-12 flex-1 rounded-none data-[state=active]:bg-muted"
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <div className="text-left">
                    <div>Review</div>
                    <div className="text-xs text-muted-foreground">
                      suggestions
                    </div>
                  </div>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="write"
                className="h-12 flex-1 rounded-none data-[state=active]:bg-muted"
              >
                <div className="flex items-center gap-2">
                  <Pencil className="h-4 w-4" />
                  <div className="text-left">
                    <div>Write with</div>
                    <div className="text-xs text-muted-foreground">
                      generative AI
                    </div>
                  </div>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="check"
                className="h-12 flex-1 rounded-none data-[state=active]:bg-muted"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <div className="text-left">
                    <div>Check for AI</div>
                    <div className="text-xs text-muted-foreground">
                      text & plagiarism
                    </div>
                  </div>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="review" className="flex-1 p-0">
              <div className="border-b p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">Review suggestions</h3>
                  <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">
                    114
                  </span>
                </div>
                <div className="grid gap-3">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Correctness</span>
                      <span>3/10</span>
                    </div>
                    <Progress value={30} className="h-2 bg-red-100" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Clarity</span>
                      <span>7/10</span>
                    </div>
                    <Progress value={70} className="h-2 bg-blue-100" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Engagement</span>
                      <span>8/10</span>
                    </div>
                    <Progress value={80} className="h-2 bg-emerald-100" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Delivery</span>
                      <span>9/10</span>
                    </div>
                    <Progress value={90} className="h-2 bg-violet-100" />
                  </div>
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="space-y-4 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    Pro suggestions
                    <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs">
                      114
                    </span>
                  </div>

                  <Card>
                    <CardContent className="space-y-3 p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
                            <Pencil className="h-3 w-3 text-blue-500" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              Clarity · Change the wording
                            </div>
                            <div className="text-sm text-muted-foreground line-through">
                              You will find here
                            </div>
                            <div className="text-sm">Here are</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button className="w-full" variant="outline" size="sm">
                        Accept
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="space-y-3 p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100">
                            <Pencil className="h-3 w-3 text-red-500" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              Grammar · Remove phrase
                            </div>
                            <div className="text-sm text-muted-foreground line-through">
                              give good indication of
                            </div>
                            <div className="text-sm">indicate</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button className="w-full" variant="outline" size="sm">
                        Accept
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
