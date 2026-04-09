"use client"

import { Mic, MicOff, Play } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useAudioStream } from "./useAudioStream"

export function AudioMonitor() {
    const { connectAudio, disconnectAudio, isConnectedAudio } = useAudioStream()

    return (
        <div className="glass p-4 rounded-2xl border border-black/5 dark:border-white/5 flex items-center gap-4 shrink-0">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isConnectedAudio ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}>
                <Mic className={`w-6 h-6 ${isConnectedAudio ? "animate-pulse" : ""}`} />
            </div>

            <div className="flex-1">
                <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Cabin Audio</span>
                    <span className="text-xs font-mono text-slate-500">
                        {isConnectedAudio ? "LIVE" : "OFFLINE"}
                    </span>
                </div>
                {/* Visualizer */}
                <div className="flex items-end gap-1 h-8">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className={`flex-1 rounded-t-sm transition-all duration-75 ${isConnectedAudio ? "bg-blue-500" : "bg-slate-200 dark:bg-slate-700"}`}
                            style={{
                                height: isConnectedAudio ? `${Math.random() * 100}%` : '10%',
                                opacity: isConnectedAudio ? 1 : 0.5
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-3 pl-4 border-l border-black/5 dark:border-white/5">
                {!isConnectedAudio ? (
                    <Button
                        size="sm"
                        onClick={connectAudio}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20"
                    >
                        <Play className="w-3 h-3 mr-1.5" />
                        Connect
                    </Button>
                ) : (
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">ON</span>
                        <Switch
                            checked={isConnectedAudio}
                            onCheckedChange={(checked) => !checked && disconnectAudio()}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
