
import OpenAI from 'openai';

// Storage key for the OpenAI API key
const API_KEY_STORAGE_KEY = 'openai-api-key';

// Get API key from localStorage if available
const getApiKey = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(API_KEY_STORAGE_KEY);
  }
  return null;
};

// Set API key to localStorage
export const setApiKey = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
  }
};

// Check if API key is set
export const hasApiKey = (): boolean => {
  return !!getApiKey();
};

// Sample FAQ data for the chatbot
export const faqData = [
  {
    question: "What are your business hours?",
    answer: "Our standard business hours are Monday through Friday, 9:00 AM to 6:00 PM Eastern Time. We are closed on weekends and major holidays."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee on all our products. If you're not satisfied with your purchase, please contact our customer service team to process your refund."
  },
  {
    question: "How can I track my order?",
    answer: "You can track your order by logging into your account on our website and viewing your order history. Alternatively, you can use the tracking number provided in your order confirmation email."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay. For larger orders, we also offer wire transfers and purchase orders."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 100 countries worldwide. International shipping rates and delivery times vary by location. You can calculate shipping costs during checkout before completing your purchase."
  },
  {
    question: "How do I change or cancel my order?",
    answer: "To change or cancel an order, please contact our customer service team as soon as possible. We can usually accommodate changes if the order hasn't been processed yet. Once an order has shipped, it cannot be changed or canceled."
  },
  {
    question: "What is your privacy policy?",
    answer: "Our privacy policy outlines how we collect, use, and protect your personal information. We are committed to maintaining the confidentiality of your data and never share your information with third parties without your consent. You can find our complete privacy policy on our website."
  }
];

// Initialize OpenAI client with current API key
let openai: OpenAI | null = null;

// Initialize immediately with any stored key
if (typeof window !== 'undefined') {
  setTimeout(() => initializeOpenAI(), 0);
}

// Function to initialize or update the OpenAI client
export const initializeOpenAI = (): void => {
  const apiKey = getApiKey();
  if (apiKey) {
    openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Note: In production, API calls should go through a backend
    });
  } else {
    openai = null;
  }
};

export async function generateResponse(userQuestion: string): Promise<string> {
  // Initialize OpenAI if not already done
  initializeOpenAI();
  
  // Simple matching with the FAQ data first
  const lowerCaseQuestion = userQuestion.toLowerCase();
  
  // Check if any FAQ matches the question
  for (const faq of faqData) {
    if (faq.question.toLowerCase().includes(lowerCaseQuestion) || 
        lowerCaseQuestion.includes(faq.question.toLowerCase().split('?')[0])) {
      return faq.answer;
    }
  }

  // If API key is set, use OpenAI
  if (openai) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful customer service chatbot for a business. Answer questions concisely and professionally. If you don't know the answer, suggest contacting customer service."
          },
          {
            role: "user",
            content: userQuestion
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      });

      return response.choices[0].message.content || "I'm not sure how to answer that. Please contact our customer service for assistance.";
    } catch (error) {
      console.error("OpenAI API error:", error);
      return "I'm having trouble connecting to my knowledge base. Please try again later or contact our customer service directly.";
    }
  }

  // Fallback for when no API key is provided
  return "To enable AI-powered responses for custom questions, please set your OpenAI API key using the 'Set API Key' button in the top right. For now, I can only answer questions from our FAQ database. If your question isn't covered, please contact our customer service team for assistance.";
}
