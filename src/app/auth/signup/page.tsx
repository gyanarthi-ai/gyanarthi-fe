"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '@/lib/axios';
import { useRouter } from 'next/navigation';

const SignupForm = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (formData.password !== formData.confirmPassword) {
            toast('Passwords do not match')
            return
        }
        await axiosInstance.post('/auth/register', {
            name: formData.name,
            email: formData.email,
            password: formData.password
        })
        setIsLoading(false);
        router.push('/dashboard')
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-sm font-medium text-gray-700">
                        Full Name
                    </Label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="signup-name"
                            type="text"
                            placeholder="Dr. Jane Smith"
                            value={formData.name}
                            onChange={handleChange('name')}
                            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm font-medium text-gray-700">
                        Email Address
                    </Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="signup-email"
                            type="email"
                            placeholder="researcher@university.edu"
                            value={formData.email}
                            onChange={handleChange('email')}
                            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm font-medium text-gray-700">
                        Password
                    </Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="signup-password"
                            type="password"
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={handleChange('password')}
                            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="signup-confirm" className="text-sm font-medium text-gray-700">
                        Confirm Password
                    </Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="signup-confirm"
                            type="password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
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
                        <UserPlus className="w-4 h-4" />
                        <span>Create Account</span>
                    </>
                )}
            </Button>
        </form>
    );
};

export default SignupForm;