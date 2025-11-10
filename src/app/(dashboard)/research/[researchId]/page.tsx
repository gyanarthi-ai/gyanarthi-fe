"use client";
import "froala-editor/js/plugins/font_family.min.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Goal, Pencil, Send, Shield } from "lucide-react";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";
import { useParams } from "next/navigation";
import { LoadingStates, useResearch } from "@/context/ResearchContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import html2pdf from "html2pdf.js";
import { IArticleFormat } from "@/types/chat";

export default function WritingAssistant() {
  const {
    research,
    setResearch,
    getResearchById,
    saveResearch,
    reviewResearch,
    generateParagraph,
    loadingStates,
    generateArticle,
  } = useResearch();
  const params = useParams();
  const researchId = params.researchId as string;
  const [queryInput, setQueryInput] = useState("");
  const [generateArticleInput, setGenerateArticleInput] = useState("");
  const [generatedParagpaphh, setGeneratedParagraph] = useState("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedFormat, setSelectFormat] = useState<IArticleFormat>("IEEE");
  useEffect(() => {
    if (!researchId) return;
    console.log(researchId);
    getResearchById(researchId);
  }, [researchId]);

  const generateParagraphButton = async () => {
    setIsGenerating(true);
    try {
      const value = await generateParagraph(queryInput);
      setGeneratedParagraph(value);
    } catch (e) {
      toast.error("Failed to generate paragraph");
    } finally {
      setIsGenerating(false);
    }
  };
  const generateArticleButton = async () => {
    setIsGenerating(true);
    try {
      const value: string = await generateArticle(
        generateArticleInput,
        selectedFormat,
      );
      setResearch({
        ...research,
        title: research?.title ? research.title : "",
        content: value,
      });
    } catch (e) {
      toast.error("Failed to generate article");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!research) {
    return <>Error: Research not found</>;
  }
  function downloadPDF(content: string) {
    html2pdf().from(content).set({ filename: "research.pdf" }).save();
  }
  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-4">
          <h1 className="font-medium">{research.title}</h1>
          <Button
            onClick={() => downloadPDF(research.content)}
            variant={"outline"}
          >
            Download PDF
          </Button>
        </div>
        <Button
          size={"sm"}
          onClick={saveResearch}
          disabled={loadingStates[LoadingStates.SAVE]}
        >
          Save
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="container mx-auto my-24 max-w-[800px]">
          <FroalaEditorComponent
            model={research?.content}
            onModelChange={(e: string) =>
              setResearch({ ...research, content: e })
            }
          />
        </div>

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
            </TabsList>

            <TabsContent value="review" className="flex-1 p-0">
              <div className="border-b p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">Review suggestions</h3>
                </div>
                <div className="grid gap-3">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Clarity</span>
                      <span>
                        {research.ai_feedback
                          ? research.ai_feedback.clarity_score * 10
                          : 0}
                        /10
                      </span>
                    </div>
                    <Progress value={70} className="h-2 bg-blue-100" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Factual Correctness</span>
                      <span>
                        {research.ai_feedback
                          ? research.ai_feedback.factual_correctness * 10
                          : 0}
                        /10
                      </span>
                    </div>
                    <Progress value={80} className="h-2 bg-emerald-100" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Grammar Score</span>
                      <span>
                        {research.ai_feedback
                          ? research.ai_feedback.grammar_score * 10
                          : 0}
                        /10
                      </span>
                    </div>
                    <Progress value={90} className="h-2 bg-violet-100" />
                  </div>
                  <Button
                    size={"sm"}
                    onClick={reviewResearch}
                    disabled={loadingStates[LoadingStates.REVIEW]}
                  >
                    Review
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="write" className="flex-1 p-0">
              <div className="flex flex-col gap-5 border-b p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Generate With AI</h3>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    Generated Article:
                    <Button
                      variant={"ghost"}
                      className="p-1"
                      onClick={() => {
                        window.navigator.clipboard.writeText(
                          generatedParagpaphh,
                        );
                        toast("Text Copied");
                      }}
                    >
                      <Copy className="h-4 cursor-pointer" />
                    </Button>
                  </div>
                  <p>{generatedParagpaphh}</p>
                </div>
                <div className="flex w-full items-center gap-2">
                  <div className="w-full">
                    <Label>Enter Prompt:</Label>
                    <Input
                      disabled={isGenerating}
                      placeholder="Enter a small conclusion paragraph"
                      value={isGenerating ? "Loading..." : queryInput}
                      onChange={(e) => setQueryInput(e.target.value)}
                    />
                  </div>
                  <Button
                    variant={"ghost"}
                    className="mt-4"
                    onClick={() => generateParagraphButton()}
                  >
                    <Send />
                  </Button>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <div className="w-full">
                    Generate Full Article:
                    <p>Note: This will add directly to the article</p>
                  </div>
                  <div className="w-full">
                    Select Format:
                    <select
                      defaultValue={"IEEE"}
                      onChange={(e) =>
                        setSelectFormat(e.target.value as IArticleFormat)
                      }
                    >
                      <option value="IEEE">IEEE</option>
                      <option value="APA">APA</option>
                      <option value="MLA">MLA</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-full">
                      <Label>Enter Prompt:</Label>
                      <Input
                        disabled={isGenerating}
                        placeholder="Enter a prompt"
                        value={
                          isGenerating ? "Loading..." : generateArticleInput
                        }
                        onChange={(e) =>
                          setGenerateArticleInput(e.target.value)
                        }
                      />
                    </div>
                    <Button
                      variant={"ghost"}
                      className="mt-4"
                      onClick={() => generateArticleButton()}
                    >
                      <Send />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
