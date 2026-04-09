import { CheckCircle2 } from "lucide-react"

export function SystemStatus() {
  return (
    <footer className="mt-8 border-t py-6 text-sm text-muted-foreground">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>AI Systems: Online</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>Backend Health: 99.9%</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>WebSocket: Connected</span>
        </div>
        <div className="text-right">
          Last Sync: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </footer>
  )
}
