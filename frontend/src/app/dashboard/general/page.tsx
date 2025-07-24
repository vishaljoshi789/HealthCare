"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, User, Bot, Sparkles } from "lucide-react";
import useAxios from "@/app/hooks/UseAxios";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface QuickQuestion {
  id: string;
  text: string;
}

const HealthConsultationChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      text: "Hello! I'm your child health assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const api = useAxios();

  const quickQuestions: QuickQuestion[] = [
    { id: "q1", text: "What foods should I avoid for my child?" },
    { id: "q2", text: "How can I manage my child's morning sickness?" },
    { id: "q3", text: "When should I contact my child's doctor immediately?" },
    { id: "q4", text: "What exercise is safe for my child?" },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateUniqueId = (prefix: string): string => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to the chat
    const newUserMessage: Message = {
      id: generateUniqueId("user"),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    const currentMessage = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    try {
      const result = await api.post("/ai/", { message: currentMessage, type: "Consultation" });
      const responseText = typeof result.data === "object" && result.data.response ? result.data.response : String(result.data);

      const aiMessage: Message = {
        id: generateUniqueId("ai"),
        text: responseText,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: generateUniqueId("error"),
        text: "Sorry, I couldn't process your request. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    inputRef.current?.focus();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-[92vh] overflow-hidden bg-blue-50">
      <div className="bg-gradient-to-l from-blue-200 to-blue-300 shadow-md p-4 flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Bot className="h-5 w-5 text-blue-600" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full" />
          </div>
          <div>
            <h1 className="font-semibold text-base text-blue-700">
              Child Care Assistant
            </h1>
            <p className="text-xs text-blue-700">Online | Pediatric AI Support</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-2 border-b border-blue-200">
        <p className="text-xs text-blue-600 mb-1 flex items-center">
          <Sparkles className="h-3 w-3 mr-1" />
          Suggested Questions
        </p>
        <div className="flex flex-wrap gap-1">
          {quickQuestions.map((q) => (
            <button
              key={q.id}
              className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs border border-blue-100 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleQuickQuestion(q.text)}
            >
              {q.text}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 p-2 overflow-y-auto bg-white"
        style={{
          height: "calc(100vh - 200px)",
          maxHeight: "calc(100vh - 200px)",
        }}
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex mb-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-xs md:max-w-md ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                    message.sender === "user" ? "bg-blue-100 ml-1" : "bg-blue-100 mr-1"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="h-3 w-3 text-blue-600" />
                  ) : (
                    <Bot className="h-3 w-3 text-blue-600" />
                  )}
                </div>
                <div>
                  <div
                    className={`p-2 rounded-lg text-sm ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white rounded-tr-none"
                        : "bg-gray-100 text-gray-800 rounded-tl-none"
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user" ? "text-right" : ""
                    } text-gray-500`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <div key="loading-indicator" className="flex mb-2 justify-start">
              <div className="flex max-w-xs md:max-w-md flex-row">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 mr-1 flex items-center justify-center">
                  <Bot className="h-3 w-3 text-blue-600" />
                </div>
                <div className="p-2 rounded-lg bg-gray-100 rounded-tl-none">
                  <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
                </div>
              </div>
            </div>
          )}

          {isTyping && (
            <div key="typing-indicator" className="flex mb-2 justify-start">
              <div className="flex max-w-xs md:max-w-md flex-row">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 mr-1 flex items-center justify-center">
                  <Bot className="h-3 w-3 text-blue-600" />
                </div>
                <div className="p-2 rounded-lg bg-gray-100 rounded-tl-none flex items-center">
                  <div className="flex space-x-1">
                    <div
                      className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="h-1.5 w-1.5 bg-blue-600 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messageEndRef} />
        </AnimatePresence>
      </div>

      {/* Input area */}
      <div className="p-3 bg-white border-t border-blue-100">
        <div className="flex items-center bg-blue-50 rounded-full overflow-hidden pl-3 pr-1 py-2 border border-blue-100">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your child health question here..."
            className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
            disabled={isLoading || isTyping}
          />
          <button
            className={`p-1.5 rounded-full ${
              inputMessage.trim() && !isLoading && !isTyping
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300"
            }`}
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading || isTyping}
          >
            <Send
              className={`h-4 w-4 ${
                inputMessage.trim() && !isLoading && !isTyping
                  ? "text-white"
                  : "text-gray-500"
              }`}
            />
          </button>
        </div>
        <p className="text-center text-xs text-gray-500 mt-1">
          This is an AI assistant. For medical emergencies, call your healthcare provider.
        </p>
      </div>
    </div>
  );
};

export default HealthConsultationChat;
