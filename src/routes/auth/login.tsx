import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axiosInstance from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { LogIn, Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function useLogin() {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
        setIsLoading(true)
      const res = await axiosInstance.post('/auth/login', { email, password })
      setIsLoading(false)
      return res.data
    },
    onSuccess: () => {
      router.navigate({ to: '/dashboard/chat' })
    },
    onError: () => {
      toast('Error Logging In')
    },
  })
}

  return (
    <form onSubmit={useLogin} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-sm font-medium text-gray-700">
                        Email Address
                    </Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="login-email"
                            type="email"
                            placeholder="researcher@university.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-sm font-medium text-gray-700">
                        Password
                    </Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="login-password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="remember" className="rounded border-gray-300" />
                    <label htmlFor="remember" className="text-sm text-gray-600">
                        Remember me
                    </label>
                </div>
                <button type="button" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                    Forgot password?
                </button>
            </div>

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <LogIn className="w-4 h-4" />
                        <span>Sign In</span>
                    </>
                )}
            </Button>
        </form>
  )
}
