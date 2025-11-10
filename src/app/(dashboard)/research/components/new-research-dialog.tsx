"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react"; // Added X icon for deletion
import axiosInstance from "@/lib/axios";

// Updated file structure to include both name and the uploaded URL
interface UploadedFile {
  name: string;
  url: string;
}

interface NewResearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Updated onSubmit to accept an array of uploaded file URLs (or the whole object if needed, but the original only used the 'file' string)
  onSubmit: (data: {
    name: string;
    description: string;
    files: string[];
  }) => Promise<void>;
}

export function NewResearchDialog({
  open,
  onOpenChange,
  onSubmit,
}: NewResearchDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // State for multiple files
  const [files, setFiles] = useState<UploadedFile[]>([]);
  // Removed fileName state as it's now part of the files array
  const [isFileUploadLoading, setIsFileUploadLoading] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Extract only the URLs for the onSubmit function
    const fileUrls = files.map((f) => f.url);
    await onSubmit({ name, description, files: fileUrls });
    setIsLoading(false);
    setName("");
    setDescription("");
    setFiles([]); // Reset files array
    onOpenChange(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setIsFileUploadLoading(true);
    // Clear the input's value so the same file can be selected again after deletion
    e.target.value = "";

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Upload the file
      const response = await axiosInstance.post(
        "/research/upload-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // Add the new file name and URL to the files array
      const newFile: UploadedFile = {
        name: selectedFile.name,
        url: response.data.url, // Assuming the response has a 'url' field with the uploaded file's URL
      };
      setFiles((prevFiles) => [...prevFiles, newFile]);
    } catch (error) {
      console.error("File upload failed:", error);
      // Optionally show an error message to the user
    } finally {
      setIsFileUploadLoading(false);
    }
  };

  const handleFileRemove = (urlToRemove: string) => {
    // Filter out the file with the matching URL (unique identifier for removal)
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.url !== urlToRemove),
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Research</DialogTitle>
          <DialogDescription>
            Add a new research project with relevant articles and documentation.
          </DialogDescription>
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
              <Label htmlFor="article-upload">Upload Article(s)</Label>
              <div className="flex items-center gap-2">
                {/* Use a unique ID for the file input */}
                <Input
                  id="article-upload"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                  disabled={isFileUploadLoading}
                />
                <Button
                  disabled={isFileUploadLoading}
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("article-upload")?.click()
                  }
                  className="w-full justify-start gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {isFileUploadLoading ? "Uploading..." : "Choose file(s)"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Supported formats: PDF, DOC, DOCX, TXT
              </p>

              {/* Display the list of uploaded files */}
              {files.length > 0 && (
                <div className="mt-2 space-y-2">
                  {files.map((file) => (
                    <div
                      key={file.url}
                      className="flex items-center justify-between rounded-md border bg-gray-50 p-2 text-sm dark:bg-gray-700"
                    >
                      <span className="truncate pr-2">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFileRemove(file.url)}
                        className="h-auto p-1"
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            {/* Optionally disable if no files are uploaded and they are required */}
            <Button
              type="submit"
              disabled={
                isLoading ||
                isFileUploadLoading ||
                name === "" ||
                description === ""
              }
            >
              {isLoading ? "Creating..." : "Create Research"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
