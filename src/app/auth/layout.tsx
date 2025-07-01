"use client"
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";


export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname()
    const router = useRouter()
    const isLogin = pathname === '/auth/login'
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5"></div>

            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-200/30 rounded-full blur-3xl"></div>

            <div className="relative z-10 w-full max-w-lg">
                <div className="w-full max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            AI Research Assistant
                        </h1>
                        <p className="text-gray-600">
                            {isLogin ? "Welcome back to your research companion" : "Join the future of research"}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="flex mb-6 p-1 bg-gray-100 rounded-lg">
                            <Button
                                variant={'secondary'}
                                onClick={() => router.push('/auth/login')}
                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 
                                    ${isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Sign In
                            </Button>
                            <Button
                                variant={'secondary'}
                                onClick={() => router.push('/auth/signup')}
                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 
                                    ${!isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Sign Up
                            </Button>
                        </div>
                        <div className="transition-all duration-300 ease-in-out">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}