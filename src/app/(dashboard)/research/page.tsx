"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { ResearchCard } from "./components/research-card";
import { NewResearchDialog } from "./components/new-research-dialog";

export default function Dashboard() {
  const [newResearchOpen, setNewResearchOpen] = useState(false);
  const [researches, setResearches] = useState<any[]>([]);

  useEffect(() => {
    handleGetResearh();
  }, []);

  const handleNewResearch = async (data: {
    name: string;
    description: string;
    files: string[];
  }) => {
    const response = await axiosInstance.post("/research", {
      description: data.description,
      title: data.name,
      pdf_url: data.files,
      date: new Date().toISOString().split("T")[0],
    });
    setResearches([response.data.research, ...researches]);
  };
  const handleGetResearh = async () => {
    const response = await axiosInstance.get("/research");
    console.log(response.data);
    setResearches(response.data);
  };

  const handleDeleteResearch = (id: number) => {
    setResearches(researches.filter((research) => research.id !== id));
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-6">
          <h1 className="text-lg font-semibold">gyanarthi</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Dr. Sarah Chen
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
              <span className="text-sm font-medium">SC</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Research Projects</h2>
            <Button
              size="sm"
              className="gap-2"
              onClick={() => setNewResearchOpen(true)}
            >
              <Plus className="h-4 w-4" />
              New Research
            </Button>
          </div>
          <p className="text-muted-foreground">
            Manage and track your research projects
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {researches.map((research, index) => (
            <ResearchCard
              key={index}
              id={research.id}
              title={research.title}
              description={research.description}
              date={research.date}
              status={research.status}
            />
          ))}
        </div>
      </main>

      <NewResearchDialog
        open={newResearchOpen}
        onOpenChange={setNewResearchOpen}
        onSubmit={handleNewResearch}
      />
    </div>
  );
}
