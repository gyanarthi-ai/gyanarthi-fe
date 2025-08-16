"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"
import axiosInstance from "@/lib/axios"

interface NewResearchDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (data: { name: string; description: string; files: string[] }) => void
}

export function NewResearchDialog({ open, onOpenChange, onSubmit }: NewResearchDialogProps) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [files, setFiles] = useState<string[]>([])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({ name, description, files })
        setName("")
        setDescription("")
        setFiles([])
        onOpenChange(false)
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (!selectedFile) return;
        const formData = new FormData()
        formData.append('file', selectedFile)
        const response = await axiosInstance.post('/research/upload-pdf', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
        )
        setFiles(val => [...val, response.data.url])
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Research</DialogTitle>
                    <DialogDescription>Add a new research project with relevant articles and documentation.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Research Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter research title"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your research project"
                                rows={3}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="article">Upload Article</Label>
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
                                    {/* {files ? file.name : "Choose file"} */}
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">Supported formats: PDF, DOC, DOCX, TXT</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Create Research</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
