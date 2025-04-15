
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/components/ChatMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { generateResponse, setApiKey, hasApiKey, initializeOpenAI } from "@/services/openai-service";
import { SendIcon } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiKeySet, setApiKeySet] = useState(hasApiKey());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
    // Initialize OpenAI on component mount
    initializeOpenAI();
  }, []);

  // Handle API key submission
  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    setApiKeySet(true);
    initializeOpenAI();
    
    // Add system message about API key
    setMessages(prev => [...prev, {
      id: `system-${Date.now()}`,
      text: "OpenAI API key has been set. You can now ask me anything!",
      isUser: false,
      timestamp: new Date()
    }]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Create user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    // Add user message and reset input
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    
    // Show typing indicator
    setIsTyping(true);

    try {
      // Generate AI response
      const responseText = await generateResponse(userMessage.text);
      
      // Add short delay to simulate thinking
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create AI message
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      };

      // Add AI message and hide typing indicator
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Sorry, I'm having trouble processing your request. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md mx-auto bg-gray-50 rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="bg-chatbot-primary text-white p-4 flex items-center justify-between shadow-sm">
        <h1 className="text-xl font-medium">Business Assistant</h1>
        <ApiKeyInput onKeySubmit={handleApiKeySubmit} hasKey={apiKeySet} />
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-indigo-50 to-gray-50">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question here..."
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-chatbot-primary hover:bg-chatbot-dark"
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-2 text-xs text-center text-gray-500">
          {apiKeySet 
            ? "Powered by OpenAI • Ask me anything about our business" 
            : "Limited to FAQ answers • Set API key for full AI capability"}
        </div>
      </div>
    </div>
  );
}
