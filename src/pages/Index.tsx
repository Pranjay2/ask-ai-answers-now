
import { ChatInterface } from "@/components/ChatInterface";
import { faqData } from "@/services/openai-service";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI-Powered Business FAQ Chatbot</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A smart assistant that answers your customers' questions with AI precision. Simply ask a question and get instant responses.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 order-2 md:order-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Sample FAQs</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0">
                    <h3 className="font-medium text-chatbot-primary mb-1">{faq.question}</h3>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="text-sm font-semibold text-blue-700 mb-2">About this demo</h3>
                <p className="text-xs text-blue-600">
                  This chatbot can answer the sample FAQs listed here. To enable AI-powered responses for custom questions, 
                  set your OpenAI API key in the openai-service.ts file.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 order-1 md:order-2">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
