"use client"

import { useState, useRef, useEffect } from "react"

const AUDIO_SERVER = "ws://76.13.243.16:8765"

export function useAudioStream() {
    const [isConnectedAudio, setIsConnectedAudio] = useState(false)
    const audioCtxRef = useRef<AudioContext | null>(null)
    const audioSocketRef = useRef<WebSocket | null>(null)

    const connectAudio = () => {
        if (audioSocketRef.current?.readyState === WebSocket.OPEN) return

        const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext)
        audioCtxRef.current = new AudioContextClass({
            sampleRate: 16000
        })

        const socket = new WebSocket(AUDIO_SERVER)
        socket.binaryType = "arraybuffer"
        audioSocketRef.current = socket
        console.log(socket);

        socket.onopen = () => {
            socket.send("LISTENER")
            console.log("Audio connected")
            setIsConnectedAudio(true)
        }

        socket.onmessage = (event) => {
            playPCM(event.data)
        }

        socket.onclose = () => setIsConnectedAudio(false)
        socket.onerror = (err) => {
            console.error("Audio socket error", err)
            setIsConnectedAudio(false)
        }
    }

    const disconnectAudio = () => {
        if (audioSocketRef.current) {
            audioSocketRef.current.close()
            audioSocketRef.current = null
        }
        if (audioCtxRef.current) {
            audioCtxRef.current.close()
            audioCtxRef.current = null
        }
        setIsConnectedAudio(false)
    }

    const playPCM = (arrayBuffer: ArrayBuffer) => {
        if (!audioCtxRef.current) return

        const int16 = new Int16Array(arrayBuffer)
        const float32 = new Float32Array(int16.length)

        for (let i = 0; i < int16.length; i++) {
            float32[i] = int16[i] / 32768
        }

        const buffer = audioCtxRef.current.createBuffer(1, float32.length, 16000)
        buffer.copyToChannel(float32, 0)

        const src = audioCtxRef.current.createBufferSource()
        src.buffer = buffer
        src.connect(audioCtxRef.current.destination)
        src.start()
    }

    useEffect(() => {
        return () => {
            audioSocketRef.current?.close()
            audioCtxRef.current?.close()
        }
    }, [])

    return {
        connectAudio,
        disconnectAudio,
        isConnectedAudio
    }
}
