import React from 'react';
import { Shield, Users, Activity, HardDrive, Cpu } from 'lucide-react';
import type { AuditLog } from '../types';
import { Badge } from '../components/common/Badge';

interface AdminDashboardPageProps {
  auditLogs: AuditLog[];
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ auditLogs }) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Admin Header */}
      <div className="clinical-card p-6 space-y-1">
        <Badge variant="teal" icon={<Shield className="w-3.5 h-3.5" />}>
          ADMINISTRATION CONTROL CENTER
        </Badge>
        <h1 className="text-2xl font-bold text-slate-900">FluentAI System Overview & AI Queue</h1>
        <p className="text-xs text-slate-500">Monitor active Whisper STT jobs, database health, and system audit logs</p>
      </div>

      {/* Admin Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="clinical-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Users</span>
            <Users className="w-5 h-5 text-sky-800" />
          </div>
          <div className="text-3xl font-bold text-slate-900">1,482</div>
          <div className="text-xs text-emerald-700 font-semibold">+12% this month</div>
        </div>

        <div className="clinical-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sessions Analyzed</span>
            <Activity className="w-5 h-5 text-teal-800" />
          </div>
          <div className="text-3xl font-bold text-slate-900">14,920</div>
          <div className="text-xs text-sky-800 font-semibold">99.4% STT Accuracy</div>
        </div>

        <div className="clinical-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Workers</span>
            <Cpu className="w-5 h-5 text-slate-700" />
          </div>
          <div className="text-3xl font-bold text-slate-900">4 Active</div>
          <div className="text-xs text-slate-600 font-semibold">Avg Latency: 1.2s</div>
        </div>

        <div className="clinical-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cloud Storage</span>
            <HardDrive className="w-5 h-5 text-emerald-700" />
          </div>
          <div className="text-3xl font-bold text-slate-900">142.8 GB</div>
          <div className="text-xs text-emerald-700 font-semibold">Secure Storage</div>
        </div>
      </div>

      {/* System Audit Logs */}
      <div className="clinical-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-base font-bold text-slate-900">System Security & Audit Logs</h2>
          <Badge variant="teal" size="sm">Real-time Stream</Badge>
        </div>

        <div className="space-y-2.5 font-mono text-xs">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <Badge variant="slate" size="sm">{log.action}</Badge>
                <span className="text-slate-800 font-sans">{log.details}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-[11px] shrink-0 font-sans">
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

