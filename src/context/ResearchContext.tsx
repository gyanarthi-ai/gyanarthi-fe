"use client";
import axiosInstance from "@/lib/axios";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface AIFeedback {
    grammar_score?: number;
    clarity_score?: number;
    factual_correctness?: number;
    suggestions?: string;
}

export interface Research {
    id?: string;
    research_id?: string;
    title: string;
    content: string;
    ai_feedback?: AIFeedback;
}

interface ResearchContextType {
    research: Research | null;
    setResearch: (research: Research | null) => void;
    updateResearch: (updates: Partial<Research>) => void;
    saveResearch: () => Promise<void>;
    reviewResearch: () => Promise<void>;
}

const ResearchContext = createContext<ResearchContextType | undefined>(undefined);

export const ResearchProvider = ({ children }: { children: ReactNode }) => {
    const [research, setResearch] = useState<Research | null>(null);
    const updateResearch = (updates: Partial<Research>) => {
        setResearch((prev) => (prev ? { ...prev, ...updates } : { ...updates } as Research));
    };
    const getResearchById = async (id: string) => {
        try {
            const res = await axiosInstance.get("")
            setResearch(res.data)
        } catch (e) {
            console.log(e)
        }
    }
    const saveResearch = async () => {
        if (!research) return;
        try {
            const res = await fetch("/api/research/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(research),
            });
            if (!res.ok) throw new Error("Failed to save research");
            const data = await res.json();
            setResearch(data);
        } catch (err) {
            console.error(err);
        }
    };

    const reviewResearch = async () => {
        if (!research) return;
        try {
            const res = await fetch("/api/research/review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: research.content }),
            });
            if (!res.ok) throw new Error("Failed to get AI feedback");
            const feedback: AIFeedback = await res.json();
            updateResearch({ ai_feedback: feedback });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <ResearchContext.Provider
            value={{ research, setResearch, updateResearch, saveResearch, reviewResearch }}
        >
            {children}
        </ResearchContext.Provider>
    );
};

export const useResearch = (): ResearchContextType => {
    const context = useContext(ResearchContext);
    if (!context) throw new Error("useResearch must be used within a ResearchProvider");
    return context;
};

