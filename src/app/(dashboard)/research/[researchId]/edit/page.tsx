"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, FileText, Save } from "lucide-react"

// Sample research data (in a real app, this would come from a database)
const researches = [
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

export default function EditResearchPage() {
    const params = useParams()
    const router = useRouter()
    const researchId = Number.parseInt(params.researchId as string)

    const [research, setResearch] = useState(researches.find((r) => r.id === researchId))
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (research) {
            setTitle(research.title)
            setDescription(research.description)
        }
    }, [research])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        // Simulate save delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        console.log("Saving research:", { title, description, file })

        setIsSaving(false)

        router.push("/dashboard")
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null
        setFile(selectedFile)
    }

    const handleBack = () => {
        router.push("/dashboard")
    }

    if (!research) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold mb-2">Research Not Found</h1>
                    <p className="text-muted-foreground mb-4">The research you're looking for doesn't exist.</p>
                    <Button onClick={handleBack}>Back to Dashboard</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-14 items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Dashboard
                        </Button>
                        <div className="h-4 w-px bg-border" />
                        <h1 className="text-lg font-semibold">Edit Research</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">Dr. Sarah Chen</span>
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium">SC</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container max-w-4xl mx-auto p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Research Details</h2>
                    <p className="text-muted-foreground">Update your research information and upload new articles</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Research Title</Label>
                                        <Input
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Enter research title"
                                            required
                                            className="text-base"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Describe your research project"
                                            rows={8}
                                            required
                                            className="text-base resize-none"
                                        />
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Button type="button" variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="flex-1 gap-2" disabled={isSaving}>
                                            {isSaving ? (
                                                <>
                                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="h-4 w-4" />
                                                    Save Changes
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Research Articles</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/50">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">research-article.pdf</p>
                                        <p className="text-xs text-muted-foreground">Current article</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="article">Upload New Article</Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            id="article"
                                            type="file"
                                            onChange={handleFileChange}
                                            accept=".pdf,.doc,.docx,.txt"
                                            className="hidden"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => document.getElementById("article")?.click()}
                                            className="w-full justify-start gap-2"
                                        >
                                            <Upload className="h-4 w-4" />
                                            {file ? file.name : "Choose new file"}
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Supported: PDF, DOC, DOCX, TXT</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Research Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <Label className="text-xs font-medium text-muted-foreground">STATUS</Label>
                                    <p className="text-sm font-medium">{research.status}</p>
                                </div>
                                <div>
                                    <Label className="text-xs font-medium text-muted-foreground">CREATED</Label>
                                    <p className="text-sm font-medium">{research.date}</p>
                                </div>
                                <div>
                                    <Label className="text-xs font-medium text-muted-foreground">LAST MODIFIED</Label>
                                    <p className="text-sm font-medium">Today</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
