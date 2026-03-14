import { Video, Maximize2, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useVideoStream } from "./useVideoStream"

export function VideoFeed() {
    const { imgRef, connectVideo, isConnectedVideo } = useVideoStream()

    return (
        <div className="relative flex-1 bg-black rounded-[2rem] border border-black/10 overflow-hidden group shadow-2xl flex flex-col">

            {/* The actual video element (now an img tag for MJPEG/Blob stream) */}
            <img
                ref={imgRef}
                className="absolute inset-0 w-full h-full object-cover bg-black"
                alt="Live Feed"
            />

            {/* Overlay UI when not connected */}
            {!isConnectedVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 transition-opacity duration-500 hover:bg-black/40">
                    <div className="text-center space-y-6 w-full max-w-sm px-6 py-8 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10">
                        <div className="relative mx-auto w-16 h-16 mb-4">
                            <div className="absolute inset-0 bg-red-500 blur-2xl opacity-20 animate-pulse" />
                            <Video className="h-16 w-16 text-white/50 relative z-10 mx-auto" />
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={connectVideo}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 text-lg rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <Play className="mr-2 h-5 w-5" />
                                Connect Video
                            </Button>
                        </div>

                        <p className="text-white/40 text-xs font-mono tracking-widest mt-4">
                            READY TO CONNECT
                        </p>
                    </div>
                </div>
            )}

            {/* Live Indicator */}
            {isConnectedVideo && (
                <div className="absolute top-6 right-6 z-20">
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-lg text-white text-xs font-bold animate-pulse shadow-lg shadow-red-600/20">
                        <div className="w-2 h-2 bg-white rounded-full" />
                        LIVE
                    </div>
                </div>
            )}

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 to-transparent p-8 flex justify-between items-end z-20 pointer-events-none">
                <div className="text-white/80 font-mono text-xs pointer-events-auto">
                    CAM-01 • <span className="text-white font-bold">{new Date().toLocaleTimeString()}</span>
                </div>
                <Button size="icon" variant="secondary" className="rounded-xl bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-md pointer-events-auto transition-colors">
                    <Maximize2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
