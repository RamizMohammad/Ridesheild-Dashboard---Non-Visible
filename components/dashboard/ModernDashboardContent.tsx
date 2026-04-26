"use client"

import React, { useEffect, useState } from 'react';
import { KPIGrid, DashboardStats } from './KPIGrid';
import { FleetActivityChart } from './FleetActivityChart';
import { SecurityPostureChart } from './SecurityPostureChart';
import { SecurityViolationsTable } from './SecurityViolationsTable';

export function ModernDashboardContent() {
    const [stats, setStats] = useState<DashboardStats | undefined>(undefined)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/dashboard/stats")
                if (res.ok) {
                    const data = await res.json()
                    setStats(data)
                }
            } catch (e) {
                console.error("Stats fetch failed", e)
            }
        }
        fetchStats()
        // Optional: Poll every 30s
        const interval = setInterval(fetchStats, 30000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="space-y-10 transition-colors duration-500">
            <KPIGrid stats={stats} />
            <div className="w-full">
                <FleetActivityChart />
                {/* <SecurityPostureChart /> */}
            </div>
            <SecurityViolationsTable />
        </div>
    );
}
