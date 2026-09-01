import React from 'react';
import ModalContainer from './ModalContainer';
import { Award, ShieldCheck, Calendar, CheckCircle2, FileCheck, Code2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function CertificatesModal({ isOpen, onClose, showToast }) {
  const getCertIcon = (iconName) => {
    switch (iconName) {
      case 'python':
        return <Code2 className="w-5 h-5 text-amber-400" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'code':
        return <Award className="w-5 h-5 text-purple-400" />;
      default:
        return <FileCheck className="w-5 h-5 text-cyan-400" />;
    }
  };

  const handleCopyCert = (title) => {
    navigator.clipboard.writeText(title);
    showToast(`Copied "${title}" to clipboard!`, 'success');
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title="Certificates & Accreditations"
      subtitle="Industry-verified professional credentials and technical achievements"
      icon={Award}
      glowColor="amber"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {portfolioData.certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-2xl glass-card border border-amber-500/20 hover:border-amber-500/50 bg-slate-900/80 transition-all space-y-3 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 mt-0.5 group-hover:scale-110 transition-transform">
                    {getCertIcon(cert.icon)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors">
                      {cert.title} – {cert.issuer}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs font-mono font-semibold text-amber-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {cert.date}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Credential
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleCopyCert(`${cert.title} – ${cert.issuer} (${cert.date})`)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-black text-slate-300 text-xs font-mono transition-colors shrink-0"
                  title="Copy Certificate Title"
                >
                  Copy Ref
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {cert.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                {cert.skillsGained.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModalContainer>
  );
}
