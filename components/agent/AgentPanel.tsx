'use client';

import { useState, useRef, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { AgentMessage } from '@/lib/types';
import SafeImage from '@/components/shared/SafeImage';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const SUGGESTIONS = [
  'Best AI tool for writing?',
  'Explain the latest GPT update',
  'I\'m a beginner, where do I start?',
];

interface AgentPanelProps {
  contextType?: string;
  onClose: () => void;
}

export default function AgentPanel({ contextType, onClose }: AgentPanelProps) {
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle slide-in animation
  useEffect(() => {
    setIsVisible(true);
    textareaRef.current?.focus();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200); // Wait for transition to complete
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 128)}px`; // Max height 32 (8rem/128px)
    }
  };

  const sendMessage = async (text?: string) => {
    const content = text ?? input.trim();
    if (!content || isLoading) return;

    // Add Context if it's the very first message
    let payloadMessage = content;
    if (messages.length === 0 && contextType) {
      payloadMessage = `[User Context: Currently viewing the ${contextType} page] ${content}`;
    }

    const userMsg: AgentMessage = { role: 'user', content };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setIsLoading(true);

    const assistantMsg: AgentMessage = { role: 'assistant', content: '' };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      const res = await fetch(`${API_URL}/api/agent/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: payloadMessage, history: messages }),
      });

      if (!res.ok) throw new Error('Agent request failed');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter((l) => l.startsWith('data: '));
          for (const line of lines) {
            const data = line.replace('data: ', '');
            if (data === '[DONE]') break;
            try {
              const parsed = JSON.parse(data);
              const token = parsed.choices?.[0]?.delta?.content ?? '';
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: 'assistant',
                  content: updated[updated.length - 1].content + token,
                };
                return updated;
              });
            } catch {
              // ignore parse errors for partial chunks
            }
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Sorry, I could not connect to the agent. Please ensure the backend is running.',
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 z-[65] transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
        onClick={handleClose}
      />

      {/* Slide-in Panel */}
      <div 
        className={`fixed right-0 top-0 h-screen w-full sm:w-[420px] z-[70] flex flex-col bg-[#13162A] border-l border-[#2A2D4A] shadow-2xl transition-transform duration-200 ease-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* HEADER */}
        <div className="flex-shrink-0 px-5 py-4 border-b border-[#2A2D4A] bg-[#13162A] flex items-center justify-between">
          <div className="flex items-center">
            <SafeImage src="/logo.png" alt="Vedix" className="h-6 w-auto" />
            <span className="text-white font-semibold text-[15px] ml-2 tracking-wide">Vedix AI</span>
            {contextType && (
              <span className="ml-3 bg-[#1A2A3A] border border-[#2A4A6A] text-[#85B7EB] text-[11px] px-2.5 py-1 rounded-full uppercase tracking-[0.05em] font-medium hidden sm:block">
                On: {contextType}
              </span>
            )}
          </div>
          <button 
            onClick={handleClose} 
            className="w-8 h-8 flex items-center justify-center text-[#8B8FA8] hover:text-white transition-colors rounded-lg hover:bg-[#1A1D35]"
          >
            <X size={20} />
          </button>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth">
          
          {/* Empty State */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <SafeImage src="/logo.png" alt="AI Agent" className="h-12 w-auto mb-4 opacity-40 grayscale" />
              <p className="text-[#5A5E7A] text-[14px]">Ask me anything about AI</p>
              
              <div className="grid grid-cols-1 gap-2 mt-6 w-full max-w-xs">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="bg-[#1A1D35] border border-[#2A2D4A] text-[#8B8FA8] text-[13px] px-4 py-3 rounded-xl cursor-pointer hover:border-[#378ADD] hover:text-white transition-all text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Thread */}
          {messages.map((msg, i) => (
            <div key={i}>
              {msg.role === 'user' ? (
                // User Message
                <div className="flex justify-end">
                  <div className="max-w-[80%] bg-[#378ADD20] border border-[#2A4A6A] rounded-2xl rounded-tr-sm px-4 py-3 text-white text-[14px] leading-[1.6]">
                    {msg.content}
                  </div>
                </div>
              ) : (
                // AI Message
                <div className="flex justify-start items-start gap-3">
                  <SafeImage src="/logo.png" alt="Vedix" className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div className="max-w-[80%] bg-[#1A1D35] border border-[#2A2D4A] rounded-2xl rounded-tl-sm px-4 py-3 text-[#8B8FA8] text-[14px] leading-[1.6]">
                    {msg.content || (
                      isLoading && i === messages.length - 1 ? (
                        <div className="flex gap-1 py-1">
                          <span className="w-1.5 h-1.5 bg-[#8B8FA8] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-1.5 h-1.5 bg-[#8B8FA8] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1.5 h-1.5 bg-[#8B8FA8] rounded-full animate-bounce"></span>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* INPUT ROW */}
        <div className="flex-shrink-0 p-4 border-t border-[#2A2D4A] bg-[#13162A]">
          <div className="flex items-end gap-3 bg-[#1A1D35] border border-[#2A2D4A] rounded-2xl px-4 py-3 focus-within:border-[#378ADD] transition-colors">
            <textarea
              ref={textareaRef}
              rows={1}
              placeholder="Ask anything about AI..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                autoResizeTextarea();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="flex-1 bg-transparent text-white text-[14px] placeholder:text-[#5A5E7A] outline-none resize-none max-h-[128px] overflow-y-auto"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="w-9 h-9 rounded-xl bg-[#378ADD] flex items-center justify-center hover:bg-[#85B7EB] hover:text-[#0D0F1A] transition-all flex-shrink-0 disabled:opacity-40 disabled:hover:bg-[#378ADD] disabled:hover:text-white"
            >
              <ArrowRight size={16} strokeWidth={2.5} className="text-white" />
            </button>
          </div>
        </div>
        
      </div>
    </>
  );
}
