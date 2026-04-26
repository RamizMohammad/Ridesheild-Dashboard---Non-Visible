import { CheckCircle2, Wifi, Server, Cpu, User, Car, Database, Activity } from "lucide-react"

const services = [
    { label: 'Rider API', status: '24ms', icon: User, color: 'text-emerald-400', dot: 'bg-emerald-400' },
    { label: 'Driver Feed', status: '15ms', icon: Car, color: 'text-emerald-400', dot: 'bg-emerald-400' },
    { label: 'Backend Core', status: '8ms', icon: Database, color: 'text-emerald-400', dot: 'bg-emerald-400' },
    { label: 'Monitor Node', status: '12ms', icon: Activity, color: 'text-blue-400', dot: 'bg-blue-400' },
];

export function SystemStatus() {
    return (
        <footer className="mt-2 py-4 border-t border-black/5 dark:border-white/5">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                {services.map(({ label, status, icon: Icon, color, dot }) => (
                    <div key={label} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${dot} shadow-[0_0_6px_currentColor]`} />
                        <Icon className={`h-3.5 w-3.5 ${color}`} />
                        <span className="text-[12px] font-medium text-slate-500">
                            {label}: <span className={`font-semibold ${color}`}>{status}</span>
                        </span>
                    </div>
                ))}
                <div className="ml-auto text-[11px] mono text-slate-600">
                    Last sync: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
            </div>
        </footer>
    )
}
