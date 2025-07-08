"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ResearchCard } from "./components/research-card"
import { NewResearchDialog } from "./components/new-research-dialog"
import axiosInstance from "@/lib/axios"

// Sample research data
const initialResearches = [
    {
        id: 1,
        title: "Impact of AI on Modern Education Systems",
        description:
            "A comprehensive study analyzing how artificial intelligence is transforming educational methodologies and student learning outcomes in contemporary academic institutions.",
        date: "Dec 15, 2024",
        status: "In Progress" as const,
    },
    {
        id: 2,
        title: "Climate Change Effects on Urban Agriculture",
        description:
            "Research examining the relationship between changing climate patterns and urban farming practices, including adaptation strategies for sustainable food production.",
        date: "Dec 10, 2024",
        status: "Completed" as const,
    },
    {
        id: 3,
        title: "Blockchain Technology in Healthcare Data Management",
        description:
            "Investigating the potential applications of blockchain technology for secure and efficient management of patient health records and medical data.",
        date: "Dec 8, 2024",
        status: "Draft" as const,
    },
    {
        id: 4,
        title: "Social Media Influence on Consumer Behavior",
        description:
            "Analysis of how social media platforms shape purchasing decisions and brand loyalty among different demographic groups.",
        date: "Dec 5, 2024",
        status: "In Progress" as const,
    },
    {
        id: 5,
        title: "Renewable Energy Adoption in Developing Countries",
        description:
            "Study of barriers and opportunities for renewable energy implementation in emerging economies, focusing on policy and infrastructure challenges.",
        date: "Dec 1, 2024",
        status: "Completed" as const,
    },
    {
        id: 6,
        title: "Mental Health in Remote Work Environments",
        description:
            "Research on the psychological impacts of remote work arrangements and strategies for maintaining employee wellbeing in distributed teams.",
        date: "Nov 28, 2024",
        status: "Draft" as const,
    },
]


export default function Dashboard() {
    const [newResearchOpen, setNewResearchOpen] = useState(false)
    const [researches, setResearches] = useState(initialResearches)

    const handleNewResearch = async (data: { name: string; description: string; files: string[] }) => {
        const response = await axiosInstance.post('/research', {
            description: data.description,
            title: data.name,
            files: data.files
        })
        setResearches([response.data.research, ...researches])
    }

    const handleOpenResearch = (id: number) => {
        console.log("Opening research:", id)
        // Implement research view logic
    }

    const handleDeleteResearch = (id: number) => {
        setResearches(researches.filter((research) => research.id !== id))
    }


    return (
        <div className="min-h-screen w-full bg-background">
            {/* Navbar */}
            <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-14 items-center justify-between px-6">
                    <h1 className="text-lg font-semibold">gyanarthi</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">Dr. Sarah Chen</span>
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium">SC</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-semibold">Research Projects</h2>
                        <Button size="sm" className="gap-2" onClick={() => setNewResearchOpen(true)}>
                            <Plus className="h-4 w-4" />
                            New Research
                        </Button>
                    </div>
                    <p className="text-muted-foreground">Manage and track your research projects</p>
                </div>

                {/* Research Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {researches.map((research) => (
                        <ResearchCard
                            key={research.id}
                            id={research.id}
                            title={research.title}
                            description={research.description}
                            date={research.date}
                            status={research.status}
                        />
                    ))}
                </div>
            </main>

            <NewResearchDialog open={newResearchOpen} onOpenChange={setNewResearchOpen} onSubmit={handleNewResearch} />
        </div>
    )
}
