"use client"

import React from 'react';
import { KPIGrid } from './KPIGrid';
import { FleetActivityChart } from './FleetActivityChart';
import { SecurityPostureChart } from './SecurityPostureChart';
import { SecurityViolationsTable } from './SecurityViolationsTable';

export function ModernDashboardContent() {
    return (
        <div className="space-y-10 transition-colors duration-500">
            <KPIGrid />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <FleetActivityChart />
                <SecurityPostureChart />
            </div>
            <SecurityViolationsTable />
        </div>
    );
}
