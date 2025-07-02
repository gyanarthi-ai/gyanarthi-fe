"use client"

import { Edit, ExternalLink, MoreVertical, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface ResearchCardProps {
    id: number
    title: string
    description: string
    date: string
    status: "In Progress" | "Completed" | "Draft"
}

export function ResearchCard({ id, title, description, date, status }: ResearchCardProps) {
    const router = useRouter()

    const handleOpen = () => {
        router.push(`/research/${id}`)
    }
    const handleEdit = () => {
        router.push(`/research/${id}/edit`)
    }

    const handleDelete = () => {
        //handle delete logic
        toast(`Research ${id} deleted`)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed":
                return "bg-green-100 text-green-800"
            case "In Progress":
                return "bg-blue-100 text-blue-800"
            case "Draft":
                return "bg-gray-100 text-gray-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <Card className="group hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3" onClick={() => handleOpen()}>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="font-medium text-sm leading-tight mb-1">{title}</h3>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                            {status}
                        </span>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation()
                                handleEdit()
                            }}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={(e) => {
                                e.stopPropagation()
                                handleDelete()
                            }}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
                <p className="text-xs text-muted-foreground">{date}</p>
            </CardContent>
        </Card>
    )
}
