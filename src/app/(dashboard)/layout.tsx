import { Sidebar } from '@/components/sidebar';
import { ChatProvider } from '@/context/ChatContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Research Dashboard',
    description: 'Find the best science, faster.',
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ChatProvider>
            <div className="flex gap-0 max-w-full h-screen">
                <Sidebar />
                <div className='flex-1'>
                    {children}
                </div>
            </div>
        </ChatProvider>
    );
}