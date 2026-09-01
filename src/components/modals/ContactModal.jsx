import React, { useState } from 'react';
import ModalContainer from './ModalContainer';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Copy, 
  Check, 
  Send, 
  Sparkles, 
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../../data/portfolioData';

export default function ContactModal({ isOpen, onClose, showToast }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopiedEmail(true);
    showToast('Email copied: farhan94012@gmail.com 📬', 'success');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(portfolioData.personal.mobile);
    setCopiedPhone(true);
    showToast('Mobile copied: +91-8969087973 📞', 'success');
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!senderName || !message) {
      showToast('Please enter your name and message', 'info');
      return;
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f2fe', '#10b981', '#a855f7', '#ec4899', '#f59e0b']
    });

    setIsSent(true);
    showToast('Message sent! Farhan will get back to you promptly 🚀', 'success');
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title="Get In Touch"
      subtitle="Connect directly for software engineering opportunities, collaborations or inquiries"
      icon={Mail}
      glowColor="pink"
    >
      <div className="space-y-5">
        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Email Card */}
          <div className="p-3.5 rounded-2xl glass-card border border-pink-500/30 bg-slate-900/80 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-pink-500/20 text-pink-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Email</span>
                <span className="text-xs font-semibold text-white truncate max-w-[170px] block">
                  {portfolioData.personal.email}
                </span>
              </div>
            </div>
            <button
              onClick={copyEmail}
              className="p-2 rounded-xl bg-slate-800 hover:bg-pink-500 hover:text-black text-slate-300 transition-colors"
              title="Copy Email"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Card */}
          <div className="p-3.5 rounded-2xl glass-card border border-pink-500/30 bg-slate-900/80 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-pink-500/20 text-pink-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Mobile</span>
                <span className="text-xs font-semibold text-white block">
                  {portfolioData.personal.mobile}
                </span>
              </div>
            </div>
            <button
              onClick={copyPhone}
              className="p-2 rounded-xl bg-slate-800 hover:bg-pink-500 hover:text-black text-slate-300 transition-colors"
              title="Copy Mobile"
            >
              {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 flex items-center justify-center gap-2 text-xs font-semibold text-slate-200 hover:text-blue-400 transition-all group"
          >
            <Linkedin className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            <span>LinkedIn Profile</span>
          </a>

          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-center gap-2 text-xs font-semibold text-slate-200 hover:text-cyan-400 transition-all group"
          >
            <Github className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>GitHub Profile</span>
          </a>
        </div>

        {/* Quick Contact Form */}
        <div className="p-4 rounded-2xl glass-card border border-pink-500/20 bg-slate-950/60 space-y-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-pink-400" />
            <h4 className="text-xs font-mono uppercase text-slate-300">Send Direct Message</h4>
          </div>

          {isSent ? (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
              <Sparkles className="w-6 h-6 text-emerald-400 mx-auto" />
              <p className="text-xs font-bold text-emerald-300">Thank you for reaching out!</p>
              <p className="text-[11px] text-slate-400">
                You can also email Farhan directly at <span className="text-cyan-400 font-mono">farhan94012@gmail.com</span>.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="text-xs text-slate-400 underline hover:text-white pt-1"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder="Your Name / Organization"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Contact Email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
              </div>
              <textarea
                placeholder="Hi Farhan, we would love to discuss a Software Engineer role / collaborate with you..."
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500 resize-none"
                required
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs shadow-neon-pink transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message & Trigger Confetti 🎊</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </ModalContainer>
  );
}
