import { ModernMonitorConsole } from "@/components/monitor/modern/ModernMonitorConsole"
import { getRideById } from "@/components/control-center/mock-data"
import { notFound } from "next/navigation"

export default async function MonitorPage({ params }: { params: Promise<{ rideId: string }> }) {
  const rideId = (await params).rideId
  const ride = getRideById(rideId)

  if (!ride) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] gap-4">
        <h1 className="text-2xl font-bold">Ride Not Found</h1>
        <p className="text-muted-foreground">ID: {rideId}</p>
        <a href="/dashboard/control-center" className="text-primary hover:underline">Return to Control Center</a>
      </div>
    )
  }

  return (
    <div className="p-6  overflow-hidden bg-slate-50 dark:bg-slate-950/50">
      <ModernMonitorConsole ride={ride} />
    </div>
  )
}
