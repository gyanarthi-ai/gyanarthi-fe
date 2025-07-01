import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchHeader() {
  return (
    <div className="flex flex-col items-center justify-center max-w-3xl mx-auto py-16 px-4">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-3xl font-bold">Find the best science, faster.</h1>
      </div>
      <div className="w-full flex gap-2">
        <div className="flex-1 relative">
          <Input
            placeholder="Ask the research..."
            className="w-full h-12 pl-4 pr-10 rounded-lg"
          />
        </div>
        <Button size="lg" className="h-12 px-6">
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}