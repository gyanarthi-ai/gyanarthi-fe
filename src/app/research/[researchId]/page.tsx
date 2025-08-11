"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Copy,
    Goal,
    Pencil,
    Send,
    Shield,
} from "lucide-react";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';

import { useResearch } from "@/context/ResearchContext";

export default function WritingAssistant() {
    const { research, setResearch } = useResearch()
    if (!research) {
        return <>Error: Research not found</>
    }
    return (
        <div className="flex h-screen flex-col">
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
                <Button size={"sm"}>Save</Button>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <div className="container mx-auto max-w-[800px] my-24">
                    <FroalaEditorComponent model={research?.content} onModelChange={(e: string) => setResearch({ ...research, content: e })} />
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
                                    <Button size={"sm"}>Review</Button>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="write" className="flex-1 p-0">
                            <div className="border-b p-4 flex flex-col gap-5">
                                <div className=" flex items-center justify-between">
                                    <h3 className="font-semibold">Generate With AI</h3>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex justify-between items-center">
                                        Generated Article:
                                        <Button variant={"ghost"} className="p-1">
                                            <Copy className="h-4 cursor-pointer" />
                                        </Button>
                                    </div>
                                    <p>
                                        asdasd
                                        asd
                                        asda
                                        sdasd
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 w-full">
                                    <div className="w-full">
                                        <Label>Enter Prompt:</Label>
                                        <Input placeholder="Enter a small conclusion paragraph" />
                                    </div>
                                    <Button variant={"ghost"} className="mt-4">
                                        <Send />
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
