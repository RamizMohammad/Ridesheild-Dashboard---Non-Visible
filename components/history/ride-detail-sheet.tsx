import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { AlertTriangle, Clock, MapPin, Shield, FileText, User, Car } from "lucide-react"

interface RideDetailSheetProps {
  ride: any // Replace with proper type later
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RideDetailSheet({ ride, open, onOpenChange }: RideDetailSheetProps) {
  if (!ride) return null

  const getStageColor = (stage: number) => {
    switch (stage) {
      case 3: return "bg-red-500 hover:bg-red-600 border-transparent text-white"
      case 2: return "bg-orange-500 hover:bg-orange-600 border-transparent text-white"
      case 1: return "bg-yellow-500 hover:bg-yellow-600 border-transparent text-black"
      default: return "bg-green-500 hover:bg-green-600 border-transparent text-white"
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto pl-6 pr-6">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-bold">Ride Details</SheetTitle>
            <Badge className={getStageColor(ride.stage)}>
              Stage {ride.stage}
            </Badge>
          </div>
          <SheetDescription>
            ID: <Link href={`/dashboard/monitor/${ride.id}`} className="font-mono text-foreground hover:underline">{ride.id}</Link>
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-8">
          {/* A. Ride Summary */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Car className="h-5 w-5" /> Summary
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Driver</p>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3" />
                    <span className="font-medium">{ride.driverName || ride.driverMasked}</span>
                  </div>
                  {ride.driverEmail && <span className="text-xs text-muted-foreground ml-5">{ride.driverEmail}</span>}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">User</p>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3" />
                    <span className="font-medium">{ride.userName || ride.userMasked}</span>
                  </div>
                  {ride.userEmail && <span className="text-xs text-muted-foreground ml-5">{ride.userEmail}</span>}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Start Time</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  <span>{ride.startTime}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">End Time</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  <span>{ride.endTime}</span>
                </div>
              </div>
              <div className="col-span-2 space-y-1">
                <p className="text-muted-foreground">Location</p>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span>{ride.location}</span>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* B. Escalation Timeline */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5" /> Escalation Timeline
            </h3>
            <div className="relative pl-6 border-l-2 border-muted space-y-6">
              {ride.timeline?.map((event: any, index: number) => (
                <div key={index} className="relative">
                  <div className={`absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-background ${getStageColor(event.stage)}`} />
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Stage {event.stage}: {event.label}</p>
                      <span className="text-xs text-muted-foreground">{event.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* C. Trigger Explanation Panel */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> Trigger Analysis
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Audio Flags Detected</span>
                <Badge variant="outline">High Confidence</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                System detected elevated voice patterns consistent with aggressive behavior at 14:32:15.
              </p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">Loud Voices</Badge>
                <Badge variant="secondary">Keywords</Badge>
              </div>
            </div>
          </section>

          <Separator />

          {/* 5. System Decision Summary */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5" /> System Decision
            </h3>
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg text-sm space-y-2">
              <p>
                <strong>Why escalation happened:</strong> Rapid transition from Stage 1 to Stage 2 due to sustained high-decibel audio inputs combined with route deviation.
              </p>
              <p>
                <strong>Cooldown ignored:</strong> Severity of audio triggers overrode standard cooldown period.
              </p>
            </div>
          </section>

          <Separator />

          {/* D. Logs & Evidence (Read-Only) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" /> System Logs
              </h3>
              <Badge variant="outline" className="text-xs">Read-Only</Badge>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded text-xs text-amber-800 dark:text-amber-200 mb-2">
              Privacy Notice: Media playback is disabled for this audit view.
            </div>

            <ScrollArea className="h-[200px] w-full rounded-md border p-4 font-mono text-xs">
              {ride.logs?.map((log: string, i: number) => (
                <div key={i} className="mb-1 border-b border-border/50 pb-1 last:border-0">
                  {log}
                </div>
              ))}
            </ScrollArea>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  )
}

