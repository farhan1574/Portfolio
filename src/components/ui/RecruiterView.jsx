import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  GraduationCap, 
  Code2, 
  Layers, 
  Award, 
  CheckCircle2, 
  Download, 
  Box, 
  Copy, 
  Check,
  Calendar,
  Wrench,
  Sparkles,
  Layout
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function RecruiterView({ setViewMode, onPrintResume, showToast }) {
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast(`Copied ${fieldName} to clipboard!`, 'success');
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 pt-20 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Control Bar (Hidden on print) */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-cyan-500/30 no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 uppercase font-semibold tracking-wider">
              Recruiter & ATS Verified CV View
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('3d')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700"
            >
              <Box className="w-3.5 h-3.5 text-cyan-400" />
              <span>Back to 3D Room</span>
            </button>

            <button
              onClick={onPrintResume}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-neon-cyan transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download / Print CV</span>
            </button>
          </div>
        </div>

        {/* Main CV Header */}
        <section className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-800 bg-[#0c121e]/95 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {portfolioData.personal.name}
              </h1>
              <p className="text-base text-cyan-400 font-semibold font-mono">
                {portfolioData.personal.title}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed pt-1">
                {portfolioData.personal.bio}
              </p>
            </div>

            {/* Contact Details Grid */}
            <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto font-mono text-xs">
              <div 
                onClick={() => copyToClipboard(portfolioData.personal.email, 'Email')}
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-colors"
                title="Click to copy email"
              >
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{portfolioData.personal.email}</span>
                </div>
                {copiedField === 'Email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              </div>

              <div 
                onClick={() => copyToClipboard(portfolioData.personal.mobile, 'Mobile')}
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-colors"
                title="Click to copy mobile"
              >
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>{portfolioData.personal.mobile}</span>
                </div>
                {copiedField === 'Mobile' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>linkedin.com/in/farhan010</span>
                </a>
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-cyan-400" />
                  <span>github.com/farhan1574</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION (Matching CV) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-2">
            <Code2 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white tracking-tight uppercase">Skills</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Languages */}
            <div className="p-4 rounded-2xl glass-card border border-slate-800 bg-slate-900/70 space-y-2.5">
              <h3 className="text-xs font-mono uppercase text-cyan-400 font-bold">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.languages.map((lang) => (
                  <span key={lang.name} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 font-semibold">
                    {lang.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Frameworks */}
            <div className="p-4 rounded-2xl glass-card border border-slate-800 bg-slate-900/70 space-y-2.5">
              <h3 className="text-xs font-mono uppercase text-emerald-400 font-bold">Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.frameworks.map((fw) => (
                  <span key={fw.name} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 font-semibold">
                    {fw.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools/Platforms */}
            <div className="p-4 rounded-2xl glass-card border border-slate-800 bg-slate-900/70 space-y-2.5">
              <h3 className="text-xs font-mono uppercase text-amber-400 font-bold">Tools / Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.toolsPlatforms.map((tool) => (
                  <span key={tool.name} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300 font-semibold">
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="p-4 rounded-2xl glass-card border border-slate-800 bg-slate-900/70 space-y-2.5">
              <h3 className="text-xs font-mono uppercase text-pink-400 font-bold">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.softSkills.map((soft) => (
                  <span key={soft.name} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-pink-300">
                    {soft.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION (Matching CV) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white tracking-tight uppercase">Projects</h2>
          </div>

          <div className="space-y-4">
            {portfolioData.projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 sm:p-6 rounded-2xl glass-card border border-slate-800 bg-slate-900/70 hover:border-slate-700 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-base font-bold text-white">
                      {proj.title} – {proj.subtitle}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    {proj.date}
                  </span>
                </div>

                {/* Bullet Points from CV */}
                <ul className="space-y-2 pt-1">
                  {proj.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5 inline-block" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 font-bold">Tech:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech) => (
                      <span key={tech} className="px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICATES SECTION (Matching CV) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white tracking-tight uppercase">Certificates</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {portfolioData.certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-4 rounded-2xl glass-card border border-slate-800 bg-slate-900/60 flex flex-col justify-between space-y-3"
              >
                <div>
                  <h3 className="text-xs font-bold text-white leading-snug">{cert.title} – {cert.issuer}</h3>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">{cert.description}</p>
                </div>
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {cert.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION SECTION (Matching CV) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-2">
            <GraduationCap className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold text-white tracking-tight uppercase">Education</h2>
          </div>

          <div className="space-y-3">
            {portfolioData.education.map((edu, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl glass-card border border-slate-800 bg-slate-900/60 hover:border-purple-500/30 transition-all space-y-1.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-white">
                    {edu.institution}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    {edu.location}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="text-slate-300 font-medium">
                    {edu.degree}; <strong className="text-purple-300 font-mono font-bold">{edu.score}</strong>
                  </span>
                  <span className="text-purple-400 font-mono font-semibold">
                    {edu.period}
                  </span>
                </div>

                <p className="text-xs text-slate-400 pt-0.5">
                  {edu.highlight}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
