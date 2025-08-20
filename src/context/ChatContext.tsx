"use client"
import axiosInstance from "@/lib/axios";
import { uuidv4 } from "@/lib/utils";
import { Message, MessageShorthand } from "@/types/chat";
import React, { createContext, useContext, useState, ReactNode } from "react";



interface ChatContextType {
    messages: Message[];
    createChat: (query: string) => Promise<string>;
    sendMessage: (chatId: string, text: string) => Promise<void>;
    fetchMessages: () => Promise<MessageShorthand[]>;
    fetchMessagesById: (chatId: string) => Promise<void>
    firstText: string | undefined
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);
export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) throw new Error("useChat must be used within a ChatProvider");
    return context;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [firstText, setFirstText] = useState<undefined | string>(undefined)
    const createChat = async (query: string): Promise<string> => {
        setFirstText(query)
        setMessages([])
        try {
            const res = await axiosInstance.post('/chat/create', {
                title: 'New Chat'
            })
            return res.data.id
        } catch (e) {
            console.error(e)
        }
        return ""
    };

    const sendMessage = async (chatId: string, text: string): Promise<void> => {
        setFirstText(undefined)
        const userData: Message = { id: uuidv4(), content: text, role: 'user', timestamp: 12 }
        setMessages(prev => [...prev, userData]);
        const res = await axiosInstance.post('/chat/stream', {
            session_id: chatId,
            content: text
        })
        const formattedData: Message = { ...res.data, id: res.data._id }
        setMessages(prev => [...prev, formattedData]);
    };
    const fetchMessagesById = async (chatId: string): Promise<void> => {
        const res = await axiosInstance.get(`/chat/history/${chatId}`)
        setMessages(res.data)
    };
    const fetchMessages = async (): Promise<MessageShorthand[]> => {
        const res = await axiosInstance.get('/chat/histories')
        return res.data.map((item: { _id: any; }) => {
            return { ...item, id: item._id }
        });
    };

    return (
        <ChatContext.Provider
            value={{ messages, createChat, sendMessage, fetchMessages, fetchMessagesById, firstText }}
        >
            {children}
        </ChatContext.Provider>
    );
};
