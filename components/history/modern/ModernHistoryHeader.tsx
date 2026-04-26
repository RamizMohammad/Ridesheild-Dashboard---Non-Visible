"use client"

import { Download, Search, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ModernHistoryHeader({ rides = [] }: { rides?: any[] }) {
    const handleExportCSV = () => {
        if (!rides || rides.length === 0) {
            alert("No data available to export.");
            return;
        }

        const headers = ["Ride ID", "Rider", "Driver", "Location", "Duration", "Completed At"];
        const csvRows = [headers.join(",")];

        rides.forEach(r => {
            const row = [
                r.id || "",
                `"${r.userName || r.userMasked || ""}"`,
                `"${r.driverName || r.driverMasked || ""}"`,
                `"${r.location || ""}"`,
                r.duration || "N/A",
                `"${r.completedAt || ""}"`
            ];
            csvRows.push(row.join(","));
        });

        const csvString = csvRows.join("\n");
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `ride_summary_${new Date().toISOString().slice(0, 10)}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between p-6 glass rounded-[2rem] border border-black/5 dark:border-white/5 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10" />

            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20 text-white">
                    <History className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Ride Summary</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Review, analyze, and export ride data.</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button 
                    variant="outline" 
                    onClick={handleExportCSV}
                    className="bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 rounded-xl"
                >
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                </Button>
            </div>
        </div>
    )
}

