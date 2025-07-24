import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, User, Bot, X, Sparkles, Calendar, Clock, Heart } from 'lucide-react';
import Image from 'next/image';

// Define TypeScript interfaces
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface QuickQuestion {
  id: string;
  text: string;
}

const HealthConsultationChat = () => {
  // State hooks
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your pregnancy health assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Quick questions that pregnant women commonly ask
  const quickQuestions: QuickQuestion[] = [
    { id: 'q1', text: 'What foods should I avoid during pregnancy?' },
    { id: 'q2', text: 'How can I manage morning sickness?' },
    { id: 'q3', text: 'When should I contact my doctor immediately?' },
    { id: 'q4', text: 'What exercise is safe during pregnancy?' },
  ];

  // Sample AI responses (in a real app, these would come from an API)
  const aiResponses = {
    'What foods should I avoid during pregnancy?': 
      "You should avoid: raw or undercooked meat/eggs, unpasteurized dairy, high-mercury fish (shark, swordfish, king mackerel), raw sprouts, excessive caffeine, and alcohol. Also limit processed foods high in sugar and salt.",
    'How can I manage morning sickness?': 
      "Try eating small, frequent meals; avoiding triggers (strong smells, spicy foods); staying hydrated; getting fresh air; wearing acupressure wristbands; and trying ginger tea or candies. If severe, talk to your doctor about medication options.",
    'When should I contact my doctor immediately?': 
      "Contact your doctor immediately if you experience: vaginal bleeding, severe abdominal pain, severe headaches or dizziness, changes in vision, sudden swelling, decreased fetal movement, contractions before 37 weeks, fever over 100.4°F, or persistent vomiting.",
    'What exercise is safe during pregnancy?': 
      "Safe exercises include walking, swimming, stationary cycling, prenatal yoga, and modified strength training. Avoid contact sports, activities with falling risks, hot yoga, or exercises that require lying flat on your back after the first trimester. Always consult your doctor first.",
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    // Simulate AI thinking and typing
    setTimeout(() => {
      setIsLoading(false);
      setIsTyping(true);
      
      // Simulate AI response after typing
      setTimeout(() => {
        setIsTyping(false);
        
        // Check if we have a prepared response, otherwise give a default
        let responseText = "I understand your concern. This is something you should discuss with your healthcare provider at your next appointment. Is there anything else I can help with?";
        
        // Check for prepared responses
        Object.entries(aiResponses).forEach(([question, answer]) => {
          if (inputMessage.toLowerCase().includes(question.toLowerCase().substring(0, 10))) {
            responseText = answer;
          }
        });
        
        const aiMessage: Message = {
          id: Date.now().toString(),
          text: responseText,
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
      }, 1500);
    }, 1000);
  };

  // Handle pressing Enter to send message
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Handle clicking a quick question
  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    inputRef.current?.focus();
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <motion.div 
        className="bg-white shadow-md p-4 flex items-center justify-between"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
            <Bot className="h-6 w-6 text-purple-600" />
            <motion.div 
              className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
          <div>
            <h1 className="font-bold text-lg text-purple-800">Maternal Health Assistant</h1>
            <p className="text-xs text-gray-500">Online | Hospital AI Support</p>
          </div>
        </div>
        <motion.button 
          className="rounded-full p-2 hover:bg-gray-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="h-5 w-5 text-gray-500" />
        </motion.button>
      </motion.div>

      {/* Chat messages area */}
      <motion.div 
        className="flex-1 p-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-xs md:max-w-md ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-blue-100 ml-2' : 'bg-purple-100 mr-2'}`}>
                  {message.sender === 'user' ? 
                    <User className="h-4 w-4 text-blue-600" /> : 
                    <Bot className="h-4 w-4 text-purple-600" />
                  }
                </div>
                <div>
                  <div className={`p-3 rounded-2xl ${message.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white shadow-md rounded-tl-none'}`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-right' : ''} text-gray-500`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex mb-4 justify-start"
            >
              <div className="flex max-w-xs md:max-w-md flex-row">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 mr-2 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-purple-600" />
                </div>
                <div className="p-3 rounded-2xl bg-white shadow-md rounded-tl-none">
                  <Loader2 className="h-5 w-5 text-purple-600 animate-spin" />
                </div>
              </div>
            </motion.div>
          )}

          {/* AI is typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex mb-4 justify-start"
            >
              <div className="flex max-w-xs md:max-w-md flex-row">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 mr-2 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-purple-600" />
                </div>
                <div className="p-3 rounded-2xl bg-white shadow-md rounded-tl-none flex items-center">
                  <motion.div className="flex space-x-1">
                    <motion.div 
                      className="h-2 w-2 bg-purple-400 rounded-full" 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                    />
                    <motion.div 
                      className="h-2 w-2 bg-purple-500 rounded-full" 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: 0.15 }}
                    />
                    <motion.div 
                      className="h-2 w-2 bg-purple-600 rounded-full" 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: 0.3 }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messageEndRef} />
        </AnimatePresence>
      </motion.div>

      {/* Quick questions carousel */}
      <motion.div 
        className="px-4 py-2 bg-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <p className="text-xs text-gray-500 mb-2 flex items-center">
          <Sparkles className="h-3 w-3 mr-1 text-purple-500" />
          Suggested Questions
        </p>
        <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
          {quickQuestions.map((q) => (
            <motion.button
              key={q.id}
              className="flex-shrink-0 bg-purple-50 text-purple-700 px-3 py-2 rounded-full text-sm border border-purple-100 hover:bg-purple-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuickQuestion(q.text)}
            >
              {q.text}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Health trackers */}
      <motion.div 
        className="px-4 py-3 bg-white border-t border-gray-100"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs font-semibold text-gray-500">HEALTH TRACKERS</h3>
          <motion.button 
            className="text-xs text-purple-600"
            whileHover={{ scale: 1.05 }}
          >
            View All
          </motion.button>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-1 hide-scrollbar">
          <motion.div 
            className="flex-shrink-0 bg-blue-50 p-3 rounded-xl flex items-center space-x-2 border border-blue-100"
            whileHover={{ y: -5 }}
          >
            <Calendar className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500">Weeks</p>
              <p className="font-bold text-blue-700">24 Weeks</p>
            </div>
          </motion.div>
          <motion.div 
            className="flex-shrink-0 bg-pink-50 p-3 rounded-xl flex items-center space-x-2 border border-pink-100"
            whileHover={{ y: -5 }}
          >
            <Clock className="h-5 w-5 text-pink-500" />
            <div>
              <p className="text-xs text-gray-500">Due Date</p>
              <p className="font-bold text-pink-700">Jul 15, 2025</p>
            </div>
          </motion.div>
          <motion.div 
            className="flex-shrink-0 bg-green-50 p-3 rounded-xl flex items-center space-x-2 border border-green-100"
            whileHover={{ y: -5 }}
          >
            <Heart className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-xs text-gray-500">Next Visit</p>
              <p className="font-bold text-green-700">Mar 14, 2025</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Input area */}
      <motion.div 
        className="p-4 bg-white border-t border-gray-200 shadow-lg"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex items-center bg-gray-100 rounded-full overflow-hidden pl-4 pr-2 py-1">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your health question here..."
            className="flex-1 bg-transparent outline-none text-gray-700"
            disabled={isLoading || isTyping}
          />
          <motion.button
            className={`p-2 rounded-full ${inputMessage.trim() ? 'bg-purple-600' : 'bg-gray-300'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading || isTyping}
          >
            <Send className={`h-5 w-5 ${inputMessage.trim() ? 'text-white' : 'text-gray-500'}`} />
          </motion.button>
        </div>
        <p className="text-center text-xs text-gray-500 mt-2">
          This is an AI assistant. For medical emergencies, please call your healthcare provider.
        </p>
      </motion.div>

      {/* Custom styles */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HealthConsultationChat;