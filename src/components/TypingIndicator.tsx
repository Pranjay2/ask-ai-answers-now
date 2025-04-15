
export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 max-w-[80%] message-animation">
      <div className="w-2 h-2 bg-chatbot-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
      <div className="w-2 h-2 bg-chatbot-primary rounded-full animate-bounce" style={{ animationDelay: "200ms" }} />
      <div className="w-2 h-2 bg-chatbot-primary rounded-full animate-bounce" style={{ animationDelay: "400ms" }} />
    </div>
  );
}
