"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  ChevronUp,
  ChevronDown,
  Hash,
  Menu,
  LogOut,
  MessageCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useChat } from "@/context/ChatContext"
import { MessageShorthand } from "@/types/chat"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [chatHistory, setChatHistory] = useState<MessageShorthand[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { fetchMessages } = useChat()
  const menuItems = [
    { icon: Home, label: "+ New Chat", href: "/chat" },
    { icon: Briefcase, label: "Research", href: "/research" },
  ]

  useEffect(() => {
    const fetchSidebarMessages = async () => {
      const data = await fetchMessages()
      setChatHistory(data)

    }
    fetchSidebarMessages()
  }, [])
  return (
    <>
      <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden" onClick={() => setIsOpen(true)}>
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-full bg-white border-r border-gray-200",
          "transition-all duration-300 ease-in-out w-64 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:relative md:z-auto",
          className,
        )}
      >
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-4 relative">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <Hash className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm">acai</div>
              <div className="text-xs text-gray-500 truncate">admin@acai.com</div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 text-gray-400 hover:text-gray-600"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {showDropdown ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </Button>

            {showDropdown && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-10 px-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => {
                    // Handle logout logic here
                    console.log("Logout clicked")
                    setShowDropdown(false)
                  }}
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => (
            <Link key={item.href} href={item.href}>
              <Button
                key={item.href}
                variant="ghost"
                className={cn(
                  "w-full justify-start h-10 px-3 text-gray-700",
                  "hover:bg-gray-50 hover:text-gray-900",
                  "transition-all duration-200 ease-in-out",
                  "group animate-in slide-in-from-left-2",
                )}
                style={{
                  animationDelay: `${index * 75}ms`,
                  animationFillMode: "both",
                }}
              >
                <item.icon className="h-4 w-4 mr-3 transition-transform duration-200 group-hover:scale-110" />
                <span className="flex-1 text-left">{item.label}</span>
              </Button>
            </Link>
          ))}
        </nav>

        {pathname.includes('/chat') && (
          <div className="flex-1 flex flex-col min-h-0 border-t border-gray-100">
            <div className="p-4 pb-2">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Chat History</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-1">
              {chatHistory.map((chat, index) => (
                <Button
                  key={chat.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-auto p-3 text-left",
                    "hover:bg-gray-50 transition-all duration-200",
                    "animate-in slide-in-from-bottom-2 group",
                  )}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: "both",
                  }}
                  onClick={() => {
                    router.push(`/chat/${chat.id}`)
                  }}
                >
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <div className="font-medium text-sm text-gray-900 truncate group-hover:text-gray-700">
                      {chat.title}
                    </div>
                    <div className="text-xs text-gray-400">{chat.updated_at}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
