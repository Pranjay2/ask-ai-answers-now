
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { KeyIcon, CheckIcon } from "lucide-react";

interface ApiKeyInputProps {
  onKeySubmit: (key: string) => void;
  hasKey: boolean;
}

export function ApiKeyInput({ onKeySubmit, hasKey }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (apiKey.trim()) {
      onKeySubmit(apiKey.trim());
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={hasKey ? "outline" : "default"} 
          size="sm" 
          className={hasKey ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800" : ""}
        >
          {hasKey ? (
            <>
              <CheckIcon className="h-4 w-4 mr-1" /> API Key Set
            </>
          ) : (
            <>
              <KeyIcon className="h-4 w-4 mr-1" /> Set API Key
            </>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
          <DialogDescription>
            Enter your OpenAI API key to enable AI-powered responses for any question. Your key is stored only in your browser and never sent to our servers.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Input
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full"
            type="password"
          />
          <p className="mt-2 text-xs text-gray-500">
            Don't have an API key? Get one from{" "}
            <a 
              href="https://platform.openai.com/api-keys" 
              target="_blank" 
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              OpenAI's website
            </a>.
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!apiKey.trim()}>
            Save Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
