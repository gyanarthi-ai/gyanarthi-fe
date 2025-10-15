import { Sidebar } from '@/components/sidebar'
import { ChatProvider } from '@/context/ChatContext'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
        <ChatProvider>
            <div className="flex gap-0 max-w-full h-screen">
                <Sidebar />
                <div className='flex-1'>
                    <Outlet/>
                </div>
            </div>
        </ChatProvider>
  )
}
