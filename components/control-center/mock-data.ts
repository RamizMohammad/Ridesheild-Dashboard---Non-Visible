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
}

export type SystemLog = {
  id: string
  rideId: string
  type: "transition" | "audio" | "video" | "cooldown" | "dispatch"
  message: string
  severity: "default" | "warning" | "destructive"
  timestamp: string
}

export const mockActiveRides: ActiveRide[] = [
  {
    id: "RIDE-9921",
    userMasked: "Ravi K.",
    driverMasked: "Suresh T.",
    userName: "Ravi Kumar",
    userEmail: "ravi.kumar99@gmail.com",
    driverName: "Suresh Thakur",
    driverEmail: "suresh.t_drive@ola.in",
    stage: 3,
    location: "Connaught Place, Inner Circle",
    lastEvent: "SOS Triggered",
    status: "Emergency",
    timestamp: "Now",
    pickup: "Connaught Place",
    dropoff: "Gurgaon Cyber Hub",
    startTime: "14:10",
    endTime: "15:30"
  },
  {
    id: "RIDE-3822",
    userMasked: "Priya S.",
    driverMasked: "Rajesh M.",
    userName: "Priya Sharma",
    userEmail: "priya.sharma22@outlook.com",
    driverName: "Rajesh Mishra",
    driverEmail: "rajesh.mishra88@uber.com",
    stage: 2,
    location: "Noida Sector 18",
    lastEvent: "Video Activated",
    status: "Monitoring",
    timestamp: "2m ago",
    pickup: "Sector 62, Noida",
    dropoff: "Sector 18, Noida",
    startTime: "14:25",
    endTime: "14:45"
  },
  {
    id: "RIDE-7731",
    userMasked: "Amit V.",
    driverMasked: "Vikram S.",
    userName: "Amit Verma",
    userEmail: "amit.verma@tech.in",
    driverName: "Vikram Singh",
    driverEmail: "vikram.singh@drive.in",
    stage: 1,
    location: "Hauz Khas Village",
    lastEvent: "Audio Spike",
    status: "Monitoring",
    timestamp: "5m ago",
    pickup: "Green Park",
    dropoff: "Saket Select City",
    startTime: "14:15",
    endTime: "14:50"
  },
  {
    id: "RIDE-1120",
    userMasked: "Sneha G.",
    driverMasked: "Manoj K.",
    userName: "Sneha Gupta",
    userEmail: "sneha.g@gmail.com",
    driverName: "Manoj Kumar",
    driverEmail: "manoj.k@rides.in",
    stage: 0,
    location: "Greater Kailash I",
    lastEvent: "Route Update",
    status: "Normal",
    timestamp: "1m ago",
    pickup: "GK II",
    dropoff: "Nehru Place",
    startTime: "14:40",
    endTime: "14:55"
  },
  {
    id: "RIDE-5512",
    userMasked: "Arjun R.",
    driverMasked: "Dinesh P.",
    userName: "Arjun Reddy",
    userEmail: "arjun.r@yahoo.com",
    driverName: "Dinesh Patel",
    driverEmail: "dinesh.p@cabs.in",
    stage: 0,
    location: "Indira Gandhi Int. Airport (T3)",
    lastEvent: "Pickup",
    status: "Normal",
    timestamp: "10m ago",
    pickup: "T3 Terminal",
    dropoff: "Vasant Vihar",
    startTime: "14:20",
    endTime: "15:00"
  }
]

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

export function getRideById(id: string): ActiveRide | undefined {
  return mockActiveRides.find(ride => ride.id === id)
}
