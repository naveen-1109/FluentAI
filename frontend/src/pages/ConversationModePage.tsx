import React, { useState } from 'react';
import { MessageSquare, Send, User as UserIcon, Bot } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const ConversationModePage: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello Alex! I'm your AI Speech Conversation partner. Let's practice speaking naturally today. What topic would you like to discuss?"
    },
    {
      sender: 'user',
      text: "Hi! I want to practice presenting software system architecture smoothly."
    },
    {
      sender: 'ai',
      text: "Great choice! Imagine you're explaining a microservices database strategy to a peer. How do you approach data consistency across services?"
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const aiReply = {
        sender: 'ai',
        text: "Excellent phrasing! Notice how maintaining a 1.5s pause after complex concepts improves listener comprehension. Let's continue!"
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 border-sky-500/20 space-y-1">
        <Badge variant="sky" icon={<MessageSquare className="w-3.5 h-3.5" />}>
          AI DIALOGUE PARTNER
        </Badge>
        <h1 className="text-2xl font-bold text-white">Interactive Speech & Dialogue Practice</h1>
        <p className="text-xs text-slate-400">Engage in fluid conversational dialogue with real-time feedback</p>
      </div>

      {/* Chat Workspace */}
      <div className="glass-panel p-6 flex flex-col h-[520px] border-slate-800">
        
        {/* Messages list */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                m.sender === 'ai' 
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30' 
                  : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
              }`}>
                {m.sender === 'ai' ? <Bot className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-2xl max-w-lg text-xs leading-relaxed ${
                m.sender === 'user' 
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-tr-none shadow-md shadow-sky-500/10' 
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Form input */}
        <form onSubmit={handleSend} className="mt-4 flex gap-2 pt-4 border-t border-slate-800">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or speak your conversational response..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-500 placeholder-slate-500"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={<Send className="w-4 h-4" />}
          >
            Send
          </Button>
        </form>

      </div>
    </div>
  );
};
