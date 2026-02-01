'use client';

import React, { useState } from 'react';
import { 
  Shield,
  AlertTriangle, 
  Lock,
  TrendingDown,
  Activity,
  CheckCircle2,
  Mail,
  Loader2,
  Server,
  Database,
  Info
} from 'lucide-react';
import OutcomeCard from '@/components/features/OutcomeCard';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState("You're on the list! Watch your inbox.");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setErrorMessage('');
    setSuccessMessage("You're on the list! Watch your inbox.");

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const payload = await res.json();
      if (!res.ok) {
        setStatus('error');
        setErrorMessage(payload?.error || 'Failed to sign up.');
        return;
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error('Error submitting email:', err);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className='min-h-screen bg-background selection:bg-indigo-500/30 overflow-x-hidden font-mono max-w-7xl mx-auto'>
      
      {/* Navbar - Minimal */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-background/50 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center border border-indigo-500/30 group-hover:border-indigo-500/50 transition-colors">
             <Activity size={18} className="text-indigo-400" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">Quota</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-sm text-secondary">
          <span>Private Beta</span>
          <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
          <span className="flex items-center gap-2 text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Waitlist open
          </span>
        </div>
      </nav>

      <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 opacity-60 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] -z-10 opacity-40"></div>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center relative z-20 mb-20">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-8 hover:bg-white/10 transition-colors cursor-default">
            <Lock size={12} />
            <span>Invite Only Access</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.05]">
            Forensic API cost monitoring that protects your runway
          </h1>

          <p className="text-2xl text-secondary max-w-3xl mx-auto mb-6 leading-relaxed">
            Quota surfaces API spend across Stripe, OpenAI, Twilio and AWS so you can find redundant calls, stop runaway loops, and reduce bills without guesswork.
          </p>

          <h2 className="text-xl text-indigo-300 font-semibold max-w-2xl mx-auto mb-8">
            Real-time usage visibility • Billing insights • Kill-switches for runaway demand
          </h2>

          {/* Email Capture */}
          <div className="max-w-md mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            {status === 'success' ? (
              <div className="relative bg-[#0F0F0F] border border-emerald-500/30 rounded-xl p-4 flex items-center justify-center gap-3 text-emerald-400 animate-in fade-in zoom-in duration-300">
                <CheckCircle2 size={24} />
                <span className="font-medium">{successMessage}</span>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <form onSubmit={handleSubmit} className={`relative bg-[#0F0F0F] rounded-xl p-1.5 flex items-center border shadow-2xl transition-colors duration-300 ${status === 'error' ? 'border-red-500/50' : 'border-white/10'}`}>
                  <div className={`pl-4 transition-colors ${status === 'error' ? 'text-red-400' : 'text-secondary'}`}>
                    {status === 'error' ? <AlertTriangle size={20} /> : <Mail size={20} />}
                  </div>
                  <input 
                    aria-label="Your email address to join the Quota waitlist"
                    name="email"
                    type="email" 
                    placeholder="cto@startup.com" 
                    className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-white placeholder:text-gray-600 h-12 px-4"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    disabled={status === 'loading'}
                  />
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="h-10 px-6 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : 'Join'}
                  </button>
                </form>
                
                {status === 'error' && errorMessage && (
                  <div className="text-red-400 text-xs text-left pl-2 animate-in slide-in-from-top-1 fade-in">
                    {errorMessage}
                  </div>
                )}
              </div>
            )}
            
            {status !== 'success' && (
              <div className="mt-4 flex flex-col items-center justify-center gap-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <p>Trusted by engineering teams for API cost visibility — <span className="text-white font-mono">200+</span> developers joined.</p>
                </div>
                <p className="text-indigo-400 font-medium animate-pulse">
                  Join the waitlist for early access and launch discounts.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Value Proposition Grid - Outcome Focused */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          
          <OutcomeCard 
            icon={<TrendingDown size={24} />}
            title="Slash your bill by 20%"
            description="Save up to 20% by identifying redundant database calls, unused Twilio numbers, and unoptimized polling."
            accent="emerald"
          />

          <OutcomeCard 
            icon={<AlertTriangle size={24} />}
            title="Panic Button Included"
            description="Auto-kill switches for runaway loops. Never wake up to a $5,000 surprise bill from a recursive function or testing script again."
            accent="rose"
          />

          <OutcomeCard 
            icon={<Shield size={24} />}
            title="Client-Side Encryption"
            description="We don't want your keys. Whether it's AWS, SendGrid, or GPT-4, they stay in your browser's local storage. We just visualize the damage."
            accent="indigo"
          />
          
        </div>

        {/* Pricing Section */}
        <div className="max-w-5xl mx-auto mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Projected Pricing</h2>
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded text-xs text-yellow-200/80">
              <Info size={12} />
              <span>Pricing is currently undergoing analysis and is subject to change based on beta usage.</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
             {/* Card 1 */}
             <div className="bg-surface/30 border border-white/5 rounded-xl p-6 flex flex-col">
                <div className="mb-4">
                  <h3 className="font-semibold text-white">Hobby</h3>
                  <div className="text-3xl font-bold mt-2">$0 <span className="text-sm text-secondary font-normal">/mo</span></div>
                  <p className="text-xs text-secondary mt-2">Perfect for side projects.</p>
                </div>
                <ul className="space-y-3 text-sm text-secondary mb-8 flex-1">
                   <li className="flex gap-2"><CheckCircle2 size={16} className="text-zinc-600 shrink-0" /> 1 API Provider</li>
                   <li className="flex gap-2"><CheckCircle2 size={16} className="text-zinc-600 shrink-0" /> 24h Data Retention</li>
                   <li className="flex gap-2"><CheckCircle2 size={16} className="text-zinc-600 shrink-0" /> Basic Usage Alerts</li>
                </ul>
                <button disabled className="w-full py-2 border border-white/10 rounded-lg text-sm text-zinc-500 cursor-not-allowed">Waitlist Only</button>
             </div>

             {/* Card 2 - Featured */}
             <div className="bg-surface/80 border border-indigo-500/30 rounded-xl p-6 flex flex-col relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <div className="mb-4 relative">
                  <h3 className="font-semibold text-white">Pro</h3>
                  <div className="text-3xl font-bold mt-2 text-indigo-100">$19 <span className="text-sm text-secondary font-normal">/mo</span></div>
                   <p className="text-xs text-indigo-200/60 mt-2">For growing startups.</p>
                </div>
                <ul className="space-y-3 text-sm text-gray-300 mb-8 flex-1 relative">
                   <li className="flex gap-2"><CheckCircle2 size={16} className="text-indigo-400 shrink-0" /> Unlimited Providers</li>
                   <li className="flex gap-2"><CheckCircle2 size={16} className="text-indigo-400 shrink-0" /> 30-Day History</li>
                   <li className="flex gap-2"><CheckCircle2 size={16} className="text-indigo-400 shrink-0" /> Real-time Kill-switches</li>
                   <li className="flex gap-2"><CheckCircle2 size={16} className="text-indigo-400 shrink-0" /> Slack & Email Alerts</li>
                </ul>
                <button disabled className="w-full py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-sm text-indigo-200 font-medium cursor-not-allowed relative">Waitlist Only</button>
             </div>
          </div>
        </div>

        {/* The "Hook" Section - Teaser Visual */}
        <div className="max-w-5xl mx-auto relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center w-full">
             <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl inline-block shadow-2xl">
                <Lock size={48} className="mx-auto text-indigo-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Classified Dashboard</h3>
                <p className="text-secondary mb-6 max-w-sm mx-auto">
                  Only 50 seats released per week to ensure stability.
                  Secure your spot in line now.
                </p>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-white border-b border-indigo-500 pb-0.5 hover:text-indigo-400 transition-colors"
                >
                  Join the waitlist &rarr;
                </button>
             </div>
           </div>

           {/* Blurred Dashboard Background */}
           <div className="opacity-30 blur-sm pointer-events-none select-none border border-white/5 rounded-xl overflow-hidden bg-surface">
              <div className="border-b border-border bg-surfaceHighlight/50 p-4 flex gap-4">
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                 </div>
                 <div className="flex-1 flex justify-center opacity-50">
                    <div className="bg-black/50 text-xs font-mono text-secondary py-1 px-32 rounded-lg border border-white/5 flex items-center gap-2">
                       <Lock size={10} /> Quota
                    </div>
                 </div>
              </div>
              <div className="p-8 grid grid-cols-12 gap-6 h-[400px] relative">
                 {/* Mock Sidebar */}
                 <div className="col-span-3 bg-white/5 rounded-lg h-full flex flex-col gap-4 p-4">
                    <div className="h-8 w-full bg-white/10 rounded"></div>
                    <div className="h-4 w-20 bg-white/5 rounded"></div>
                    <div className="h-4 w-16 bg-white/5 rounded"></div>
                    <div className="mt-auto h-12 w-full bg-white/5 rounded"></div>
                 </div>
                 {/* Mock Main Content */}
                 <div className="col-span-9 grid grid-rows-2 gap-6">
                    <div className="grid grid-cols-3 gap-6">
                       <div className="bg-white/5 rounded-lg h-32 flex flex-col p-4 justify-between">
                          <div className="flex justify-between">
                            <div className="h-8 w-8 bg-white/10 rounded-full"></div>
                            <Activity size={16} className="text-white/20" />
                          </div>
                          <div className="h-4 w-16 bg-white/10 rounded"></div>
                       </div>
                       <div className="bg-white/5 rounded-lg h-32 flex flex-col p-4 justify-between">
                          <div className="flex justify-between">
                             <div className="h-8 w-8 bg-white/10 rounded-full"></div>
                             <Server size={16} className="text-white/20" />
                          </div>
                          <div className="h-4 w-16 bg-white/10 rounded"></div>
                       </div>
                       <div className="bg-white/5 rounded-lg h-32 flex flex-col p-4 justify-between">
                          <div className="flex justify-between">
                            <div className="h-8 w-8 bg-white/10 rounded-full"></div>
                            <Database size={16} className="text-white/20" />
                          </div>
                          <div className="h-4 w-16 bg-white/10 rounded"></div>
                       </div>
                    </div>
                    <div className="bg-white/5 rounded-lg h-full p-4">
                      <div className="h-full w-full flex items-end gap-2">
                        {[40, 65, 30, 80, 50, 90, 40, 70, 55, 60, 45, 85].map((h, i) => (
                          <div key={i} style={{ height: `${h}%`}} className="flex-1 bg-white/10 rounded-t-sm"></div>
                        ))}
                      </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-sm text-secondary">
              &copy; {new Date().getFullYear()} Quota. All rights reserved.
           </div>
           <div className="flex gap-6 text-sm text-secondary">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
