import { ModernDashboardContent } from "@/components/dashboard/ModernDashboardContent"
import { SystemStatus } from "@/components/dashboard/system-status"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 mt-6">
      <ModernDashboardContent />
      <SystemStatus />
    </div>
  )
}
