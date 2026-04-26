export type ActiveRide = {
  id: string
  userMasked: string
  driverMasked: string
  userName?: string
  userEmail?: string
  driverName?: string
  driverEmail?: string
  stage: 0 | 1 | 2 | 3
  location: string
  lastEvent: string
  status: "Normal" | "Monitoring" | "Emergency"
  timestamp: string
  pickup: string
  dropoff: string
  startTime: string
  endTime: string
  pickupCoords?: { lat: number, lng: number }
  dropoffCoords?: { lat: number, lng: number }
}

export type SystemLog = {
  id: string
  rideId: string
  type: "transition" | "audio" | "video" | "cooldown" | "dispatch"
  message: string
  severity: "default" | "warning" | "destructive"
  timestamp: string
}



export const mockSystemLogs: SystemLog[] = [
  {
    id: "LOG-001",
    rideId: "RIDE-9921",
    type: "dispatch",
    message: "Emergency dispatch contacted",
    severity: "destructive",
    timestamp: "14:32:05"
  },
  {
    id: "LOG-002",
    rideId: "RIDE-9921",
    type: "transition",
    message: "Escalated to Stage 3 (SOS)",
    severity: "destructive",
    timestamp: "14:31:50"
  },
  {
    id: "LOG-003",
    rideId: "RIDE-3822",
    type: "video",
    message: "Video feed connection established",
    severity: "warning",
    timestamp: "14:30:12"
  },
  {
    id: "LOG-004",
    rideId: "RIDE-3822",
    type: "transition",
    message: "Escalated to Stage 2 (Video)",
    severity: "warning",
    timestamp: "14:30:05"
  },
  {
    id: "LOG-005",
    rideId: "RIDE-7731",
    type: "audio",
    message: "Audio threshold exceeded (>85dB)",
    severity: "default",
    timestamp: "14:28:45"
  }
]


