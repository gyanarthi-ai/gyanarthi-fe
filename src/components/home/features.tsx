import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight, MessageSquare, Zap, Globe } from 'lucide-react'
import Link from 'next/link'
const Features = () => {
    return (
        <div className="py-16 bg-[#0B0A0F] text-white" id='features'>
            <div className="max-w-7xl mx-auto px-4 py-20">
                <h1 className="text-4xl md:text-6xl font-bold text-center mb-20">
                    Get Information Smarter,<br />
                    with Gyanarthi
                </h1>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Ask Anything Card */}
                    <div className="relative p-6 rounded-3xl bg-gradient-to-b from-[#1C1B21] to-[#131215] border border-purple-500/20">
                        <div className="absolute -top-1 -bottom-1 -left-1 -right-1 rounded-3xl bg-gradient-to-r from-purple-500/20 to-transparent -z-10" />
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-2xl font-semibold">Ask anything</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Validated Chatbot
                            </p>
                            <Link href="/chat">
                                <Button variant="ghost" className="group text-purple-400 hover:text-purple-300">
                                    EXPLORE MORE
                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Improve Everyday Card */}
                    <div className="relative p-6 rounded-3xl bg-gradient-to-b from-[#1C1B21] to-[#131215] border border-yellow-500/20">
                        <div className="absolute -top-1 -bottom-1 -left-1 -right-1 rounded-3xl bg-gradient-to-r from-yellow-500/20 to-transparent -z-10" />
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                                <Zap className="w-6 h-6 text-yellow-400" />
                            </div>
                            <h3 className="text-2xl font-semibold">Paste Responses</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Paste your responses and get validated information.
                            </p>
                            <Link href={'/paste-content'}>
                                <Button variant="ghost" className="group text-yellow-400 hover:text-yellow-300">
                                    EXPLORE MORE
                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Connect Everywhere Card */}
                    <div className="relative p-6 rounded-3xl bg-gradient-to-b from-[#1C1B21] to-[#131215] border border-green-500/20">
                        <div className="absolute -top-1 -bottom-1 -left-1 -right-1 rounded-3xl bg-gradient-to-r from-green-500/20 to-transparent -z-10" />
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                <Globe className="w-6 h-6 text-green-400" />
                            </div>
                            <h3 className="text-2xl font-semibold">Research Assistant</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Your assistant to get the most accurate and reliable information.
                            </p>
                            <Button variant="ghost" className="group text-green-400 hover:text-green-300">
                                EXPLORE MORE
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features