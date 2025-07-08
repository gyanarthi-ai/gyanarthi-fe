"use client"
import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                {/* Large 404 Number */}
                <div className="relative">
                    <div className="text-8xl sm:text-9xl font-bold text-gray-200 select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Search className="w-16 h-16 text-gray-400 animate-pulse" />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                        Page not found
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-transform"
                    >
                        <Home className="w-4 h-4" />
                        Go home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 duration-200 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-transform"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go back
                    </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gray-300 rounded-full opacity-50 animate-ping"></div>
                <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-gray-400 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-gray-300 rounded-full opacity-40 animate-ping" style={{ animationDelay: '1s' }}></div>
            </div>
        </div>
    );
}