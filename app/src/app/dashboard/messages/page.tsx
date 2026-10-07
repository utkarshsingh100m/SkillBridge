"use client";

import { useState } from "react";
import {
  Send,
  Sparkles,
  Paperclip,
  Calendar,
  Search,
  MoreVertical,
  CheckCheck,
  Code,
  Smile,
  Bot,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { conversations as initialConversations, chatMessages as initialMessages, currentUser } from "@/lib/data";

interface ChatMessage {
  id: string;
  senderId: string;
  senderName?: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConvId, setActiveConvId] = useState("c1");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      senderId: "m1",
      senderName: "Rahul Sharma",
      content: "Hey Utkarsh! How is the matching algorithm for SkillBridge coming along?",
      timestamp: "10:24 AM",
      isOwn: false,
    },
    {
      id: "m2",
      senderId: "u1",
      senderName: "Utkarsh",
      content: "Hey Rahul! We have built the explainable compatibility engine with cosine similarity. We're tuning the weights for skill gaps and hackathon availability.",
      timestamp: "10:26 AM",
      isOwn: true,
    },
    {
      id: "m3",
      senderId: "m1",
      senderName: "Rahul Sharma",
      content: "Great progress! For multi-hop queries, try using HyDE (Hypothetical Document Embeddings) or chunk reranking with Cohere/BGE. Let me review your code in our session today.",
      timestamp: "10:28 AM",
      isOwn: false,
    },
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const quickPrompts = [
    "Could you review our RAG retrieval latency?",
    "Can you check our hackathon pitch deck?",
    "Let's schedule our 30-min mentor sync.",
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMsg("");

    // Simulate smart mentor response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyMsg: ChatMessage = {
        id: `reply_${Date.now()}`,
        senderId: activeConv.participantId,
        senderName: activeConv.participantName,
        content: `Got it! I will look into that right away. You are on track for Build with Bharat 4.0. Keep pushing!`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: false,
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1400);
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)] bg-white rounded-3xl border border-border shadow-sm flex overflow-hidden animate-fade-in">
      {/* Left Chat Sidebar */}
      <div className="w-80 border-r border-border flex flex-col bg-surface/50 shrink-0">
        <div className="p-4 border-b border-border">
          <h2 className="text-base font-bold text-sb-dark">Messages &amp; Mentors</h2>
          <div className="relative mt-2.5">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-9 pr-3 py-1.5 bg-white rounded-xl text-xs border border-border focus:outline-none focus:border-sb-green"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-border/60">
          {conversations.map((conv) => {
            const isActive = conv.id === activeConvId;
            return (
              <button
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`w-full p-3.5 text-left flex items-start gap-3 transition-colors ${
                  isActive ? "bg-sb-bg/70" : "hover:bg-surface"
                }`}
              >
                <div className="relative shrink-0">
                  <Avatar src={conv.participantAvatar} name={conv.participantName} size="md" />
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-sb-green border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-sb-dark truncate">{conv.participantName}</h4>
                    <span className="text-[10px] text-text-muted">{conv.lastMessageTime}</span>
                  </div>
                  <p className="text-[11px] text-text-secondary truncate mt-0.5">{conv.lastMessage}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Top Bar */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <Avatar src={activeConv.participantAvatar} name={activeConv.participantName} size="md" />
            <div>
              <h3 className="text-sm font-bold text-sb-dark">{activeConv.participantName}</h3>
              <p className="text-[11px] text-sb-green font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sb-green" />
                Active Now • Mentorship Mode
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-sb-bg border border-sb-wash text-sb-dark text-xs font-semibold rounded-lg flex items-center gap-1.5 hover:bg-sb-wash transition-all">
              <Calendar size={13} className="text-sb-green" /> Schedule Session
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-surface/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div
                className={`max-w-md rounded-2xl p-3.5 text-xs leading-relaxed space-y-1 ${
                  msg.isOwn
                    ? "bg-sb-dark text-white rounded-br-xs shadow-xs"
                    : "bg-white text-text-primary border border-border rounded-bl-xs shadow-xs"
                }`}
              >
                {!msg.isOwn && (
                  <p className="text-[10px] font-bold text-sb-green">{msg.senderName}</p>
                )}
                <p className="whitespace-pre-line">{msg.content}</p>
                <div
                  className={`flex items-center justify-end gap-1 text-[10px] ${
                    msg.isOwn ? "text-white/70" : "text-text-muted"
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.isOwn && <CheckCheck size={12} className="text-sb-pale" />}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-text-muted animate-pulse">
              <Avatar src={activeConv.participantAvatar} name={activeConv.participantName} size="sm" />
              <span>{activeConv.participantName} is typing...</span>
            </div>
          )}
        </div>

        {/* AI Quick Prompts */}
        <div className="px-4 py-2 border-t border-border bg-white flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-semibold text-sb-dark flex items-center gap-1 shrink-0">
            <Sparkles size={12} className="text-sb-gold" /> AI Prompts:
          </span>
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 bg-surface hover:bg-sb-bg border border-border hover:border-sb-wash text-[11px] text-text-secondary hover:text-sb-dark rounded-full shrink-0 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-4 border-t border-border bg-white flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Type your message or ask for architecture guidance..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            className="flex-1 p-2.5 bg-surface rounded-xl text-xs border border-border focus:outline-none focus:border-sb-green transition-all"
          />
          <button
            type="submit"
            disabled={!inputMsg.trim()}
            className="p-2.5 bg-sb-dark hover:bg-sb-green text-white rounded-xl disabled:opacity-50 transition-colors shadow-sm"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
