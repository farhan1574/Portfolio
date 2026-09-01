import React, { useState } from 'react';
import ModalContainer from './ModalContainer';
import { 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  Cpu, 
  Check, 
  Github, 
  Users, 
  Clock, 
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function FutureBrightModal({ isOpen, onClose }) {
  const project = portfolioData.projects.find(p => p.id === 'future-bright') || portfolioData.projects[1];
  
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [expandedFaq, setExpandedFaq] = useState(0);

  const timetableDayData = project.timetableDemo.find(d => d.day === selectedDay) || project.timetableDemo[0];

  const faqs = [
    { q: "How are student timetables organized?", a: "The portal organizes department timetables by day and time slots with clear period allocations and room assignments." },
    { q: "What STEM & AI curriculum is highlighted?", a: "Modules include dedicated course content for Science & Innovation, smart labs, AI-based learning, research projects, and competitions." },
    { q: "What sections are implemented in the portal?", a: "Sections include About Us, Courses, Upcoming Events, Student Timetable, FAQs, Gallery, and Testimonials." },
  ];

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title={`${project.title} – ${project.subtitle}`}
      subtitle={`Completed: ${project.date}`}
      icon={GraduationCap}
      glowColor="green"
    >
      {/* Overview & Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {project.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
              {project.badge}
            </span>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {project.date}
          </span>
        </div>

        {/* Project Bullets from CV */}
        <ul className="space-y-2 pt-1">
          {project.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5 inline-block" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack */}
        <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 font-bold">Tech:</span>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-lg text-xs font-mono bg-slate-800/80 text-emerald-300 border border-emerald-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="flex border-b border-slate-800 gap-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-2 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'overview'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Course Explorer & Smart Labs</span>
        </button>
        <button
          onClick={() => setActiveTab('timetable')}
          className={`px-3 py-2 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'timetable'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Interactive Timetable</span>
        </button>
        <button
          onClick={() => setActiveTab('faqs')}
          className={`px-3 py-2 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'faqs'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>FAQs</span>
        </button>
      </div>

      {/* Tab Content: Course Explorer & Smart Labs */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Cpu className="w-4 h-4" />
              <span>Science & Innovation</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Dedicated modules showcasing student research projects, science competitions, and state-of-the-art laboratory experimentation.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <BookOpen className="w-4 h-4" />
              <span>Smart Labs & AI-Based Learning</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Modern computer science curriculum integrating AI fundamentals, coding workshops, and interactive smart lab sessions.
            </p>
          </div>
        </div>
      )}

      {/* Tab Content: Interactive Timetable */}
      {activeTab === 'timetable' && (
        <div className="p-4 rounded-xl glass-card border border-emerald-500/30 bg-slate-900/80 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-xs font-mono uppercase text-emerald-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Student Timetable Demo
            </h4>

            <div className="flex flex-wrap gap-1">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    selectedDay === day
                      ? 'bg-emerald-500 text-black shadow-neon-green'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {timetableDayData.slots.map((slot, index) => {
              const [time, subject] = slot.split(' - ');
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-emerald-500/30 transition-colors"
                >
                  <span className="text-xs font-mono text-emerald-400 font-medium">
                    {time}
                  </span>
                  <span className="text-xs font-semibold text-slate-200">
                    {subject}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab Content: FAQs */}
      {activeTab === 'faqs' && (
        <div className="space-y-2">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-3 text-left text-xs font-semibold text-slate-200 hover:text-emerald-300 transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedFaq === idx ? 'rotate-180 text-emerald-400' : 'text-slate-500'}`} />
              </button>
              {expandedFaq === idx && (
                <div className="p-3 pt-0 text-xs text-slate-400 leading-relaxed border-t border-slate-800/50 bg-slate-950/40">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800">
        <a
          href={portfolioData.personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <Github className="w-4 h-4" />
          <span>github.com/farhan1574</span>
        </a>

        <a
          href={portfolioData.personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all shadow-neon-green active:scale-95"
        >
          <Github className="w-3.5 h-3.5" />
          <span>View Source on GitHub</span>
        </a>
      </div>
    </ModalContainer>
  );
}
