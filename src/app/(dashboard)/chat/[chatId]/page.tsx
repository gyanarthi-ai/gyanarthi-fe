"use client";

import { SearchForm } from "@/components/search/search-form";
import { ChatView } from "@/components/chat/chat-view";
import { useChat } from "@/context/ChatContext";
import { useParams } from "next/navigation"
import { useEffect, useRef } from "react";

export default function ChatPage() {
    const { chatId } = useParams<{ chatId: string }>()
    const { messages, sendMessage, fetchMessagesById, firstText, isLoading } = useChat()

    const ranRef = useRef(false)

    useEffect(() => {
        if (!chatId || ranRef.current) return
        ranRef.current = true

        const sendFirstText = async () => {
            if (firstText) await sendMessage(chatId, firstText)
            else await fetchMessagesById(chatId)
        }
        sendFirstText()
    }, [chatId])

    const handleSearch = async (query: string) => {
        await sendMessage(chatId, query)
    };


    return (
        <div className="flex h-screen">
            <main className="flex h-full max-w-[800px] mx-auto flex-1 flex-col overflow-hidden">
                <div className="flex h-full flex-1 flex-col">
                    <ChatView
                        messages={messages}
                        isLoading={isLoading}
                    />
                    <div className="border-t p-4">
                        <div className="mx-auto max-w-3xl">
                            <SearchForm onSubmit={handleSearch} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
