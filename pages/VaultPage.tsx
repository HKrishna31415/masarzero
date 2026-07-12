import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck, FileText, Download, Eye, EyeOff, Shield } from 'lucide-react';

// ─── File manifest (matches /public/vault/cybersecurity/) ─────────────────────
const VAULT_FILES = [
  {
    id: 'MZ-POL-001',
    title: 'Cybersecurity Governance Program',
    filename: 'MZ-POL-001_Cybersecurity_Governance_Program.pdf',
    category: 'Governance',
    date: '2025-01-15',
  },
  {
    id: 'MZ-POL-002',
    title: 'Data Privacy Policy',
    filename: 'MZ-POL-002_Data_Privacy_Policy.pdf',
    category: 'Privacy',
    date: '2025-01-15',
  },
  {
    id: 'MZ-POL-003',
    title: 'Access Control & Identity Management Policy',
    filename: 'MZ-POL-003_Access_Control_Identity_Management_Policy.pdf',
    category: 'Access Control',
    date: '2025-01-15',
  },
  {
    id: 'MZ-POL-004',
    title: 'Continuous Monitoring & Log Management',
    filename: 'MZ-POL-004_Continuous_Monitoring_Log_Management.pdf',
    category: 'Monitoring',
    date: '2025-01-15',
  },
  {
    id: 'MZ-POL-005',
    title: 'Vulnerability & Patch Management Policy',
    filename: 'MZ-POL-005_Vulnerability_Patch_Management_Policy.pdf',
    category: 'Vulnerability Mgmt',
    date: '2025-01-15',
  },
  {
    id: 'MZ-POL-006',
    title: 'Network Security Policy',
    filename: 'MZ-POL-006_Network_Security_Policy.pdf',
    category: 'Network',
    date: '2025-01-15',
  },
  {
    id: 'MZ-POL-007',
    title: 'Incident Response Plan',
    filename: 'MZ-POL-007_Incident_Response_Plan.pdf',
    category: 'Incident Response',
    date: '2025-01-15',
  },
  {
    id: 'MZ-POL-008',
    title: 'Security Awareness & Training Policy',
    filename: 'MZ-POL-008_Security_Awareness_Training_Policy.pdf',
    category: 'Training',
    date: '2025-01-15',
  },
  {
    id: 'MZ-POL-009',
    title: 'Secure Software Development Practices',
    filename: 'MZ-POL-009_Secure_Software_Development_Practices.pdf',
    category: 'Development',
    date: '2025-01-15',
  },
  {
    id: 'MZ-POL-010',
    title: 'Configuration Management & Secure Baseline',
    filename: 'MZ-POL-010_Configuration_Management_Secure_Baseline.pdf',
    category: 'Configuration',
    date: '2025-01-15',
  },
  {
    id: 'MZ-POL-011',
    title: 'Endpoint Security & MDM Policy',
    filename: 'MZ-POL-011_Endpoint_Security_MDM_Policy.pdf',
    category: 'Endpoint',
    date: '2025-01-15',
  },
  {
    id: 'MZ-POL-012',
    title: 'Business Continuity & Disaster Recovery',
    filename: 'MZ-POL-012_Business_Continuity_Disaster_Recovery.pdf',
    category: 'BCP / DR',
    date: '2025-01-15',
  },
];

// ─── Category accent colours ──────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  Governance: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
  Privacy: 'text-teal-400 bg-teal-950/40 border-teal-500/30',
  'Access Control': 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30',
  Monitoring: 'text-sky-400 bg-sky-950/40 border-sky-500/30',
  'Vulnerability Mgmt': 'text-violet-400 bg-violet-950/40 border-violet-500/30',
  Network: 'text-blue-400 bg-blue-950/40 border-blue-500/30',
  'Incident Response': 'text-rose-400 bg-rose-950/40 border-rose-500/30',
  Training: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
  Development: 'text-lime-400 bg-lime-950/40 border-lime-500/30',
  Configuration: 'text-orange-400 bg-orange-950/40 border-orange-500/30',
  Endpoint: 'text-indigo-400 bg-indigo-950/40 border-indigo-500/30',
  'BCP / DR': 'text-pink-400 bg-pink-950/40 border-pink-500/30',
};

// ─── Password gate ─────────────────────────────────────────────────────────────
const PasswordScreen: React.FC<{
  onLogin: (password: string) => void;
  error: string;
}> = ({ onLogin, error }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#000212]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-10 rounded-2xl text-center max-w-sm w-full"
      >
        {/* Icon cluster */}
        <div className="flex items-center justify-center mb-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Shield size={32} className="text-emerald-400" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#000212] border border-emerald-500/40 flex items-center justify-center">
              <Lock size={12} className="text-emerald-300" />
            </div>
          </div>
        </div>

        <div className="px-2 py-0.5 rounded bg-emerald-950/30 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 uppercase inline-block mb-3 tracking-widest">
          Restricted Access
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Security Vault</h2>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          Enter your credentials to access cybersecurity policy documents.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Access password"
              autoComplete="current-password"
              className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2.5 pr-10 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-center text-white placeholder:text-gray-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-sm mt-2"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="w-full mt-6 relative aurora-border font-semibold px-6 py-3 rounded-full hover:bg-emerald-400/20 transition-all duration-300 text-white"
          >
            Authenticate
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// ─── Vault document list ───────────────────────────────────────────────────────
const VaultView: React.FC = () => {
  return (
    <section className="min-h-screen bg-[#000212] pt-40 pb-20 text-gray-200 font-sans selection:bg-emerald-500/30">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Page header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="px-2 py-0.5 rounded bg-emerald-950/30 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                Confidential
              </div>
              <span className="text-xs text-gray-500 font-mono">MASAR ZERO · Cybersecurity</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
              Security Vault
            </h1>
            <p className="text-gray-400 mt-3 max-w-xl">
              Official cybersecurity governance and policy documents. All files are confidential and intended for authorised personnel only.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <ShieldCheck size={20} className="text-emerald-400" />
            <span className="text-sm text-emerald-400 font-mono">Authenticated</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Documents', value: String(VAULT_FILES.length) },
            { label: 'Classification', value: 'Confidential' },
            { label: 'Format', value: 'PDF' },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#0c1222] border border-white/10 rounded-xl p-4 text-center"
            >
              <div className="text-xl font-black text-white">{s.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Document table */}
        <div className="bg-[#0c1222] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-white/10 bg-white/5 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <div className="col-span-1 hidden md:block">ID</div>
            <div className="col-span-7 md:col-span-6">Document</div>
            <div className="col-span-3 hidden md:block">Category</div>
            <div className="col-span-5 md:col-span-2 text-right pr-2">Download</div>
          </div>

          {/* Rows */}
          {VAULT_FILES.map((doc, i) => {
            const categoryClass =
              CATEGORY_COLORS[doc.category] ??
              'text-gray-400 bg-white/5 border-white/10';

            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-white/5 items-center hover:bg-white/5 transition-colors group last:border-b-0"
              >
                {/* ID */}
                <div className="col-span-1 hidden md:block">
                  <span className="text-[10px] font-mono text-gray-500">{doc.id}</span>
                </div>

                {/* Title */}
                <div className="col-span-7 md:col-span-6 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-emerald-500 group-hover:text-white group-hover:bg-emerald-500 transition-colors shrink-0">
                    <FileText size={16} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors block leading-snug">
                      {doc.title}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono md:hidden">
                      {doc.category}
                    </span>
                  </div>
                </div>

                {/* Category badge */}
                <div className="col-span-3 hidden md:flex items-center">
                  <span
                    className={`text-[10px] font-mono px-2 py-1 rounded border ${categoryClass}`}
                  >
                    {doc.category}
                  </span>
                </div>

                {/* Download */}
                <div className="col-span-5 md:col-span-2 text-right pr-2">
                  <a
                    href={`/vault/cybersecurity/${doc.filename}`}
                    download={doc.filename}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-white bg-transparent hover:bg-emerald-500 border border-emerald-500/40 hover:border-emerald-500 px-3 py-1.5 rounded-lg transition-all duration-200"
                  >
                    <Download size={13} />
                    <span className="hidden sm:inline">PDF</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-600 mt-8 font-mono">
          These documents are the confidential property of MASAR ZERO. Unauthorised distribution is prohibited.
        </p>
      </div>
    </section>
  );
};

// ─── Page shell (auth gate) ────────────────────────────────────────────────────
const VaultPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const correctPassword = 'Se&69}?O4N+bfg';

  const handleLogin = (password: string) => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isAuthenticated ? (
        <motion.div
          key="vault-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VaultView />
        </motion.div>
      ) : (
        <motion.div
          key="vault-password"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PasswordScreen onLogin={handleLogin} error={error} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VaultPage;
