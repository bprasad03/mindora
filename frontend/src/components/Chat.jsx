import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Sparkles, Moon, Sun, Menu, LogOut, Quote, Lightbulb, Activity, Bot, User } from 'lucide-react';

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const theme = {
    bg: isDarkMode ? 'bg-dark-bg' : 'bg-slate-50',
    text: isDarkMode ? 'text-white' : 'text-slate-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-slate-500',
    border: isDarkMode ? 'border-dark-border' : 'border-slate-200',
    surface: isDarkMode ? 'bg-dark-surface' : 'bg-white shadow-sm',
    surfaceHover: isDarkMode ? 'hover:bg-dark-surface' : 'hover:bg-slate-100',
    inputArea: isDarkMode ? 'bg-gradient-to-t from-dark-bg via-dark-bg to-transparent' : 'bg-gradient-to-t from-slate-50 via-slate-50 to-transparent',
  };

const suggestedPrompts = [
    "I'm feeling so stressed and overwhelmed with my workload right now.",
    "I've had a really great day and I'm feeling so happy!",
    "I'm feeling a bit sad and lonely today. Can we talk?",
    "I'm just so frustrated and angry about how things went today!"
  ];

  // Helper function to color-code the emotion badges
  const getEmotionStyle = (emotion) => {
    switch(emotion?.toLowerCase()) {
      case 'happy': 
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'sadness': case 'sad': 
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'stress': case 'anger': 
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: 
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;
    
    // 1. Add user message to UI immediately
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput("");
    setIsTyping(true);

    try {
      // 2. Send the message to your Flask backend
      const response = await fetch('http://127.0.0.1:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error('Backend connection failed');
      }

      // 3. Get the real AI response and detected emotion
      const data = await response.json();

      // 4. Update the UI with the real data
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: data.reply,
        emotion: data.detected_emotion 
      }]);

    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: "I'm having trouble connecting to my thoughts right now. Please make sure the Flask backend is running on port 5000.",
        emotion: "neutral" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`flex h-screen ${theme.bg} ${theme.text} font-sans overflow-hidden`}>
      
      {/* SIDEBAR */}
      <div className={`${isSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 flex flex-col ${theme.border} ${theme.bg} shrink-0 overflow-hidden z-20`}>
        <button onClick={() => navigate('/')} className="p-6 flex items-center gap-3 hover:opacity-80 transition-opacity text-left">
          <div className="text-brand"><Activity size={28} /></div>
          <div>
            <h1 className="text-xl font-semibold tracking-wide">Mindora</h1>
            <p className="text-[11px] text-gray-400">Your mental health Assistant</p>
          </div>
        </button>

        <div className="px-6 mb-4">
          {/* Removed new session flow; chat persistence is handled in the current conversation. */}
        </div>

        <div className="flex-1 px-6 py-4 overflow-y-auto space-y-8">
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Quote size={14} className="text-brand" /> Daily Motivation
            </h3>
            <div className={`p-5 rounded-2xl ${theme.surface}/50 ${theme.border} relative overflow-hidden`}>
              <div className="absolute top-0 left-0 w-1 h-full bg-brand"></div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-slate-700'} italic leading-relaxed`}>
                "Healing isn't a straight line. It's perfectly okay to have days where you just rest and reset. You are doing better than you think."
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Lightbulb size={14} className="text-yellow-400" /> Today's Tip
            </h3>
            <div className={`p-5 rounded-2xl ${theme.border} ${isDarkMode ? 'border-brand/20 bg-brand/5' : 'border-blue-200 bg-blue-50'}`}>
              <h4 className="text-brand text-sm font-semibold mb-2">The 4-7-8 Technique</h4>
              <p className={`text-sm ${theme.textMuted} leading-relaxed`}>
                Inhale quietly through your nose for 4 seconds, hold your breath for 7 seconds, and exhale completely through your mouth for 8 seconds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col relative bg-glow-gradient">
        
        {/* Top Navbar */}
        <div className={`h-20 flex items-center justify-between px-8 ${theme.border} ${theme.bg}/80 backdrop-blur-md z-10`}>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`${theme.textMuted} hover:${theme.text} transition-colors`}>
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-8 text-sm font-medium text-gray-300">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`${theme.textMuted} hover:${theme.text} transition-colors`}>
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => navigate('/')} className={`flex items-center gap-2 px-5 py-2.5 rounded-full ${theme.border} ${theme.surfaceHover} transition-colors ${theme.text}`}>
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto flex flex-col items-center p-6 relative scroll-smooth">
          
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mt-10 animate-fade-in">
              <div className={`w-16 h-16 rounded-2xl ${theme.surface} ${theme.border} flex items-center justify-center mb-6`}>
                <Sparkles size={32} className="text-brand" />
              </div>
              <h2 className="text-3xl font-semibold mb-3">AI Therapist</h2>
              <p className={`${theme.textMuted} mb-12`}>How can I assist you today?</p>
              
              <div className="w-full space-y-3">
                {suggestedPrompts.map((prompt, idx) => (
                  <button key={idx} onClick={() => handleSend(prompt)} className={`w-full text-left p-4 rounded-2xl ${theme.border} ${theme.surface}/30 ${theme.surfaceHover} hover:border-gray-500 transition-all ${theme.textMuted} text-sm flex items-center justify-between group`}>
                    {prompt}
                    <Sparkles size={16} className="text-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full max-w-4xl space-y-8 pb-20 pt-6">
              {messages.map((msg, idx) => (
                 <div key={idx} className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                    
                    {/* BOT MESSAGE LAYOUT */}
                    {msg.sender === 'bot' && (
                      <>
                        <div className="w-10 h-10 rounded-full bg-dark-surface border border-dark-border flex items-center justify-center shrink-0 mt-1">
                          <Bot size={20} className="text-brand" />
                        </div>
                        <div className="flex flex-col items-start gap-1.5 max-w-[80%]">
                          <div className="flex items-center gap-3 ml-1">
                            <span className={`text-sm font-medium ${theme.textMuted}`}>AI Therapist</span>
                            {msg.emotion && (
                              <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${getEmotionStyle(msg.emotion)}`}>
                                {msg.emotion}
                              </span>
                            )}
                          </div>
                          <div className={`px-5 py-4 ${theme.surface} ${theme.border} ${isDarkMode ? 'text-gray-200' : 'text-slate-800'} rounded-2xl rounded-tl-sm text-[15px] leading-relaxed shadow-sm`}>
                            {msg.text}
                          </div>
                        </div>
                      </>
                    )}

                    {/* USER MESSAGE LAYOUT */}
                    {msg.sender === 'user' && (
                      <>
                        <div className="flex flex-col items-end gap-1.5 max-w-[80%]">
                          <span className={`text-sm font-medium ${theme.textMuted} mr-1`}>You</span>
                          <div className="px-5 py-4 bg-brand text-[#0c1a2e] rounded-2xl rounded-tr-sm font-medium text-[15px] leading-relaxed shadow-sm">
                            {msg.text}
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-dark-surface border border-dark-border flex items-center justify-center shrink-0 mt-1">
                          <User size={20} className="text-purple-400" />
                        </div>
                      </>
                    )}

                 </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start gap-4 animate-fade-in">
                  <div className="w-10 h-10 rounded-full bg-dark-surface border border-dark-border flex items-center justify-center shrink-0 mt-1">
                    <Bot size={20} className="text-brand" />
                  </div>
                  <div className="flex flex-col items-start gap-1.5">
                    <span className={`text-sm font-medium ${theme.textMuted} ml-1`}>AI Therapist</span>
                    <div className={`px-5 py-4 ${theme.surface} ${theme.border} flex items-center gap-2 rounded-2xl rounded-tl-sm`}>
                      <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Field Area */}
        <div className={`p-6 ${theme.inputArea}`}>
          <div className="max-w-4xl mx-auto relative flex items-center">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend(input)}
              placeholder="Ask me anything..."
              className={`w-full ${theme.surface} ${theme.border} rounded-full pl-6 pr-14 py-4 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 ${theme.text} ${isDarkMode ? 'placeholder-gray-500' : 'placeholder-slate-400'} transition-all shadow-lg`}
            />
            <button 
              onClick={() => handleSend(input)}
              className={`absolute right-2 p-3 rounded-full transition-all flex items-center justify-center ${
                input.trim() ? 'bg-brand text-[#0c1a2e] scale-100 hover:bg-brand-light' : `${theme.border} ${theme.textMuted} scale-95`
              }`}
            >
              <Send size={18} className="ml-0.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}