"use client";
import axiosInstance from "@/lib/axios";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface AIFeedback {
    grammar_score: number;
    clarity_score: number;
    factual_correctness: number;
    suggestions: string;
}

export interface Research {
    id?: string;
    title: string;
    content: string;
    ai_feedback?: AIFeedback;
}
export enum LoadingStates {
    SAVE = 'save',
    REVIEW = 'review'
}

type ILoadingState = Record<LoadingStates, boolean>
interface ResearchContextType {
    research: Research | null;
    setResearch: (research: Research | null) => void;
    updateResearch: (updates: Partial<Research>) => void;
    saveResearch: () => Promise<void>;
    reviewResearch: () => Promise<void>;
    getResearchById: (id: string) => Promise<void>;
    generateParagraph: (query: string) => Promise<string>
    loadingStates: ILoadingState
}

const ResearchContext = createContext<ResearchContextType | undefined>(undefined);

export const ResearchProvider = ({ children }: { children: ReactNode }) => {
    const [research, setResearch] = useState<Research | null>(null);
    const [loadingStates, setLoadingStates] = useState<ILoadingState>({
        [LoadingStates.SAVE]: false,
        [LoadingStates.REVIEW]: false
    });
    const updateResearch = (updates: Partial<Research>) => {
        setResearch((prev) => (prev ? { ...prev, ...updates } : { ...updates } as Research));
    };
    const getResearchById = async (id: string) => {
        try {
            const res = await axiosInstance.get(`/research/written_article/${id}`)
            console.log(res.data)
            setResearch({ id: res.data.research_id, content: res.data.content, title: res.data.title, ai_feedback: res.data.ai_feedback })
        } catch (e) {
            console.log(e)
        }
    }
    const saveResearch = async () => {
        setLoadingStates(prev => ({
            ...prev,
            [LoadingStates.SAVE]: true
        }));
        if (!research) return;
        try {
            await axiosInstance.put(`/research/written_article/${research.id}`, {
                title: research.title,
                content: research.content
            })
            // setResearch(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingStates(prev => ({
                ...prev,
                [LoadingStates.SAVE]: false
            }));
        }
    };

    const reviewResearch = async () => {
        setLoadingStates(prev => ({
            ...prev,
            [LoadingStates.REVIEW]: true
        }));
        if (!research) return;
        try {
            const res = await axiosInstance.post(`/research/written_article/${research.id}/review`, {
                title: research.title,
                content: research.content
            })
            updateResearch({ ai_feedback: res.data.ai_feedback });
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingStates(prev => ({
                ...prev,
                [LoadingStates.REVIEW]: false
            }));
        }
    }
    const generateParagraph = async (query: string) => {
        if (!research) return;
        try {
            const res = await axiosInstance.post(`research/generate`, {
                research_id: research.id,
                query: query
            })
            return res.data
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <ResearchContext.Provider
            value={{ research, setResearch, updateResearch, saveResearch, reviewResearch, getResearchById, generateParagraph, loadingStates }}
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

