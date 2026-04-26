"use client"

import { useEffect, useState } from "react"
import { Activity, Clock, AlertTriangle, CheckCircle2 } from "lucide-react"

export function ModernEmergencyStats() {
    const [stats, setStats] = useState({
        activeSOS: 0,
        avgResponse: "1m 12s",
        resolved: 0,
        totalEvents: 0
    });

    useEffect(() => {
        async function loadStats() {
            try {
                const res = await fetch("/api/emergencies");
                const data = await res.json();
                if (Array.isArray(data)) {
                    const active = data.filter(i => i.status === "Active").length;
                    const resolved = data.filter(i => i.status === "Resolved").length;
                    setStats({
                        activeSOS: active,
                        avgResponse: active > 0 ? "Under Review" : "Nominal",
                        resolved: resolved,
                        totalEvents: data.length
                    });
                }
            } catch (err) {
                console.error(err);
            }
        }
        loadStats();
    }, []);

    const statCards = [
        {
            label: 'Active SOS',
            value: stats.activeSOS.toString(),
            sub: stats.activeSOS > 0 ? 'INTERVENTION REQ' : 'ALL CLEAR',
            subColor: stats.activeSOS > 0 ? 'text-red-400' : 'text-emerald-400',
            icon: AlertTriangle,
            iconBg: 'bg-red-500/10',
            iconColor: 'text-red-400',
            borderAccent: 'border-t-red-500/60',
            glowColor: 'rgba(239,68,68,0.12)',
            pulse: stats.activeSOS > 0,
        },
        {
            label: 'System Status',
            value: stats.avgResponse,
            sub: 'Operations Feed',
            subColor: 'text-slate-400',
            icon: Clock,
            iconBg: 'bg-blue-500/10',
            iconColor: 'text-blue-400',
            borderAccent: 'border-t-blue-500/60',
            glowColor: 'rgba(59,130,246,0.1)',
            pulse: false,
        },
        {
            label: 'Resolved Issues',
            value: stats.resolved.toString(),
            sub: 'Closed incidents',
            subColor: 'text-emerald-400',
            icon: CheckCircle2,
            iconBg: 'bg-emerald-500/10',
            iconColor: 'text-emerald-400',
            borderAccent: 'border-t-emerald-500/60',
            glowColor: 'rgba(16,185,129,0.1)',
            pulse: false,
        },
        {
            label: 'Total Incidents',
            value: stats.totalEvents.toString(),
            sub: 'Logged overall',
            subColor: 'text-slate-400',
            icon: Activity,
            iconBg: 'bg-orange-500/10',
            iconColor: 'text-orange-400',
            borderAccent: 'border-t-orange-500/60',
            glowColor: 'rgba(249,115,22,0.1)',
            pulse: false,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {statCards.map((s, i) => (
                <div
                    key={i}
                    className={`group relative glass-bright rounded-2xl border-t-2 ${s.borderAccent} overflow-hidden card-lift`}
                    style={{ animation: `float-up 0.5s ease both`, animationDelay: `${i * 0.07}s` }}
                >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(circle at 50% 0%, ${s.glowColor} 0%, transparent 70%)` }} />

                    <div className="relative p-5">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-10 h-10 rounded-xl ${s.iconBg} ${s.iconColor} flex items-center justify-center`}>
                                <s.icon className={`w-5 h-5 ${s.pulse ? 'animate-pulse' : ''}`} />
                            </div>
                        </div>
                        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1">{s.label}</p>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{s.value}</p>
                        <p className={`text-[12px] font-semibold mt-1 ${s.subColor}`}>{s.sub}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
