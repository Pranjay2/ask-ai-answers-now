
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  const formattedTime = timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit'
  });
  
  return (
    <div className={cn(
      "flex w-full mb-4 message-animation",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-3 shadow-sm",
        isUser 
          ? "bg-chatbot-primary text-white rounded-tr-none" 
          : "bg-white border border-gray-200 rounded-tl-none"
      )}>
        <p className="text-sm break-words">{message}</p>
        <div className={cn(
          "text-xs mt-1 text-right",
          isUser ? "text-indigo-100" : "text-gray-500"
        )}>
          {formattedTime}
        </div>
      </div>
    </div>
  );
}
