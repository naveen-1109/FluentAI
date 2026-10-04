import React from 'react';
import { Shield, Users, Activity, HardDrive, Cpu } from 'lucide-react';
import type { AuditLog } from '../types';
import { Badge } from '../components/common/Badge';

interface AdminDashboardPageProps {
  auditLogs: AuditLog[];
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ auditLogs }) => {
  return (
    <div className="space-y-6">
      
      {/* Admin Header */}
      <div className="glass-panel p-6 border-amber-500/20 glow-gold space-y-1">
        <Badge variant="amber" icon={<Shield className="w-3.5 h-3.5" />}>
          ADMINISTRATION CONTROL CENTER
        </Badge>
        <h1 className="text-2xl font-bold text-white">FluentAI System Overview & AI Queue</h1>
        <p className="text-xs text-slate-400">Monitor active Whisper STT jobs, PostgreSQL table counts, and system audit logs</p>
      </div>

      {/* Admin Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 border-amber-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Active Users</span>
            <Users className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">1,482</div>
          <div className="text-xs text-emerald-400 font-bold">+12% this month</div>
        </div>

        <div className="glass-panel p-5 border-sky-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Sessions Analyzed</span>
            <Activity className="w-5 h-5 text-sky-400" />
          </div>
          <div className="text-3xl font-black text-white">14,920</div>
          <div className="text-xs text-sky-400 font-bold">99.4% STT Accuracy</div>
        </div>

        <div className="glass-panel p-5 border-indigo-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">AI Worker GPUs</span>
            <Cpu className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white">4 Active</div>
          <div className="text-xs text-indigo-400 font-bold">Avg Latency: 1.2s</div>
        </div>

        <div className="glass-panel p-5 border-emerald-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Object Storage</span>
            <HardDrive className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">142.8 GB</div>
          <div className="text-xs text-emerald-400 font-bold">Cloud Storage</div>
        </div>
      </div>

      {/* System Audit Logs */}
      <div className="glass-panel p-6 space-y-4 border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-base font-bold text-white">System Security & Audit Logs</h2>
          <Badge variant="amber" size="sm">Real-time Stream</Badge>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <Badge variant="amber" size="sm">{log.action}</Badge>
                <span className="text-slate-200">{log.details}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-[11px] shrink-0">
                <span>{log.actor}</span>
                <span>•</span>
                <span>{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
