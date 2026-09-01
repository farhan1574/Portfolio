import React, { useState, useRef, useEffect } from 'react';
import ModalContainer from './ModalContainer';
import { 
  Terminal as TerminalIcon, 
  Code2, 
  Database, 
  Wrench, 
  GraduationCap, 
  Send, 
  Sparkles, 
  Layout
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function TerminalModal({ isOpen, onClose, showToast }) {
  const [activeTab, setActiveTab] = useState('terminal'); // 'terminal' | 'matrix'
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'output', text: "⚡ FarhanOS v2.4 (x86_64-antigravity-linux)" },
    { type: 'output', text: "Type 'help' or click command chips below to inspect Farhan Ahmad's skills and background." },
  ]);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'terminal') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory, activeTab]);

  const handleCommand = (cmdString) => {
    const rawCmd = cmdString.trim();
    if (!rawCmd) return;
    const cmd = rawCmd.toLowerCase();

    const newHistory = [...terminalHistory, { type: 'input', text: rawCmd }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available commands:
  - skills       : Print technical skills (Languages, Frameworks, Tools)
  - projects     : List Threadly (Aug 2026) & Future Bright (Apr 2026)
  - education    : Show LPU B.Tech CSE (CGPA: 8.07) & academic background
  - certs        : List Infosys Springboard & Neo Colab credentials
  - contact      : Show email, mobile & social links
  - clear        : Clear terminal screen
  - sudo hire farhan : Instant recruitment handshake protocol 🚀`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `[Languages]
  • C++ (92%) - OOP, STL, Memory & Algorithmic Problem Solving
  • JavaScript (88%) - ES6+, DOM Manipulation, Async/Await
  • C (84%) - Core Fundamentals, Pointers & Memory Management
  • Python (80%) - Data Logic, Scripting & Problem Solving

[Frameworks]
  • HTML (95%) | CSS (92%)

[Tools / Platforms]
  • MySQL (85%) | Git (88%) | GitHub (90%)

[Soft Skills]
  • Problem-Solving Skills, Team Player, Time Management, Adaptability`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `1. Threadly – E-Commerce Clothing Website (August 2026)
   - Tech: HTML, CSS, JavaScript, JSON
   - Features: Product browsing, categories, wishlist, cart, saved addresses, coupon functionality, simulated checkout
   
2. Future Bright – School Management & Information Website (April 2026)
   - Tech: HTML, CSS, JavaScript
   - Features: About Us, Courses (Science & Innovation, Smart Labs, AI learning), Timetable, FAQs, Gallery, Testimonials`
        });
        break;

      case 'education':
      case 'lpu':
        newHistory.push({
          type: 'output',
          text: `🎓 Bachelor of Technology - Computer Science and Engineering
   Institution: Lovely Professional University, Punjab, India
   Period: Since August 2025
   Performance: CGPA: 8.07

• Intermediate: Z.A Islamia College, Siwan (Percentage: 75%, April 2021 - March 2022)
• Matriculation: MJVP High School, Siwan (Percentage: 75.8%, April 2016 - March 2018)`
        });
        break;

      case 'certs':
      case 'certificates':
        newHistory.push({
          type: 'output',
          text: `📜 Verified Certifications:
  1. Introduction to Python – Infosys Springboard (February 2026)
  2. Introduction to Cyber Security – Infosys Springboard (March 2026)
  3. Computer Programming – Neo Colab (NIIT Venture) (January 2026)`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `📬 Contact Farhan Ahmad:
  • Email: farhan94012@gmail.com
  • Mobile: +91-8969087973
  • LinkedIn: https://www.linkedin.com/in/farhan010/
  • GitHub: https://github.com/farhan1574`
        });
        break;

      case 'sudo hire farhan':
      case 'hire':
        newHistory.push({
          type: 'output',
          text: `🎉 EXCELLENT DECISION!
[SUCCESS] Interview invitation handshake initiated.
[INFO] Farhan is ready to bring high performance, modern UI & C++ logic to your engineering team.
Email directly at farhan94012@gmail.com or call +91-8969087973.`
        });
        showToast("Handshake successful! Farhan is ready to interview 🚀", "success");
        break;

      case 'whoami':
        newHistory.push({
          type: 'output',
          text: "guest@farhan-portfolio ~ Authorized Recruiter & Tech Explorer"
        });
        break;

      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `command not found: "${rawCmd}". Type 'help' for available commands.`
        });
        break;
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleCommand(terminalInput);
  };

  const quickCommands = ['help', 'skills', 'projects', 'education', 'certs', 'sudo hire farhan', 'clear'];

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title="Skills & Coding Terminal"
      subtitle="Interactive FarhanOS CLI & Skill Proficiency Matrix"
      icon={TerminalIcon}
      glowColor="purple"
    >
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-800 gap-2">
        <button
          onClick={() => setActiveTab('terminal')}
          className={`px-3 py-2 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'terminal'
              ? 'border-purple-400 text-purple-300 bg-purple-500/10'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <TerminalIcon className="w-3.5 h-3.5" />
          <span>Interactive Terminal</span>
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-3 py-2 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'matrix'
              ? 'border-purple-400 text-purple-300 bg-purple-500/10'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>CV Skills Matrix & Education</span>
        </button>
      </div>

      {activeTab === 'terminal' ? (
        <div className="space-y-3">
          <div className="rounded-xl bg-[#090d16] border border-purple-500/30 font-mono text-xs overflow-hidden shadow-inner flex flex-col h-[320px]">
            {/* Terminal Window Bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-slate-400 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                <span className="text-[11px] font-mono ml-2 text-slate-300">bash — farhan@portfolio:~</span>
              </div>
              <span className="text-[10px] text-purple-400 font-mono">UTF-8</span>
            </div>

            {/* Terminal Output Area */}
            <div className="p-3.5 overflow-y-auto space-y-2 flex-1 scrollbar-thin">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="leading-relaxed">
                  {item.type === 'input' ? (
                    <div className="flex items-center gap-2 text-cyan-300">
                      <span className="text-purple-400">farhan@portfolio:~$</span>
                      <span>{item.text}</span>
                    </div>
                  ) : item.type === 'error' ? (
                    <div className="text-rose-400 font-mono whitespace-pre-wrap">{item.text}</div>
                  ) : (
                    <div className="text-slate-300 font-mono whitespace-pre-wrap">{item.text}</div>
                  )}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Terminal Command Input Form */}
            <form onSubmit={handleFormSubmit} className="flex items-center px-3 py-2 bg-slate-950 border-t border-slate-800 gap-2">
              <span className="text-purple-400 font-mono font-bold">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type a command (e.g. skills, lpu, sudo hire farhan)..."
                className="flex-1 bg-transparent text-slate-100 font-mono text-xs focus:outline-none placeholder-slate-600"
                autoFocus
              />
              <button
                type="submit"
                className="p-1 rounded bg-purple-500/20 text-purple-300 hover:bg-purple-500 hover:text-black transition-colors"
                title="Execute Command"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Quick Command Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] font-mono text-slate-500 mr-1">Quick Run:</span>
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 text-[11px] font-mono transition-all active:scale-95"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* CV Skills Matrix & Education */
        <div className="space-y-5">
          {/* LPU Card */}
          <div className="p-4 rounded-xl glass-card border border-purple-500/30 bg-purple-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Lovely Professional University (Punjab, India)</h4>
                <p className="text-xs text-slate-300 font-mono">Bachelor of Technology - Computer Science and Engineering (Since August 2025)</p>
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-purple-500 text-black font-extrabold text-xs shadow-neon-purple shrink-0">
              CGPA: 8.07
            </div>
          </div>

          {/* Languages Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-purple-400" />
              Languages
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {portfolioData.skills.languages.map((skill) => (
                <div key={skill.name} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-200">{skill.name}</span>
                    <span className="text-purple-400 font-mono">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">{skill.experience}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Frameworks & Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h5 className="text-xs font-mono uppercase text-emerald-400 flex items-center gap-1">
                <Layout className="w-3 h-3" />
                Frameworks
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {portfolioData.skills.frameworks.map((f) => (
                  <span key={f.name} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-950 border border-slate-800 text-emerald-300 font-semibold">
                    {f.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h5 className="text-xs font-mono uppercase text-amber-400 flex items-center gap-1">
                <Wrench className="w-3 h-3" />
                Tools / Platforms
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {portfolioData.skills.toolsPlatforms.map((t) => (
                  <span key={t.name} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-950 border border-slate-800 text-amber-300 font-semibold">
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Soft Skills */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h5 className="text-xs font-mono uppercase text-pink-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Soft Skills
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {portfolioData.skills.softSkills.map((s) => (
                <div key={s.name} className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                  <span className="text-xs font-bold text-pink-300 block">{s.name}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </ModalContainer>
  );
}
