import React from 'react';

const accentColors: Record<string, string> = {
  emerald: 'text-emerald-400 group-hover:bg-emerald-500/10 border-emerald-500/20',
  rose: 'text-rose-400 group-hover:bg-rose-500/10 border-rose-500/20',
  indigo: 'text-indigo-400 group-hover:bg-indigo-500/10 border-indigo-500/20',
};

export const OutcomeCard = ({ icon, title, description, accent }: { icon: React.ReactNode; title: string; description: string; accent: 'emerald' | 'rose' | 'indigo' }) => {
  return (
    <div className="group p-8 rounded-2xl bg-surface border border-border border-white/20 transition-all duration-300">
      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 transition-colors ${accentColors[accent]}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform">{title}</h3>
      <p className="text-secondary leading-relaxed">{description}</p>
    </div>
  );
};

export default OutcomeCard;
