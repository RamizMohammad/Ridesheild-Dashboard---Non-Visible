"use client"

import { useState, useRef, useEffect } from "react"

const VIDEO_SERVER = "ws:/76.13.243.16:5656"

export function useVideoStream() {
    const [isConnectedVideo, setIsConnectedVideo] = useState(false)
    const videoSocketRef = useRef<WebSocket | null>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)

    const connectVideo = () => {
        console.log("Connecting to video server...");
        if (videoSocketRef.current?.readyState === WebSocket.OPEN) return
        console.log("Video server not connected");

        const socket = new WebSocket(VIDEO_SERVER)
        socket.binaryType = "blob"
        videoSocketRef.current = socket

        socket.onopen = () => {
            socket.send("VIEWER")
            console.log("Video connected")
            setIsConnectedVideo(true)
        }

        socket.onmessage = (event) => {
            const url = URL.createObjectURL(event.data)
            if (imgRef.current) {
                imgRef.current.src = url
            }
        }

        socket.onclose = () => setIsConnectedVideo(false)
        socket.onerror = (err) => {
            console.error("Video socket error", err)
            setIsConnectedVideo(false)
        }
    }

    const disconnectVideo = () => {
        if (videoSocketRef.current) {
            videoSocketRef.current.close()
            videoSocketRef.current = null
        }
        setIsConnectedVideo(false)
    }

    useEffect(() => {
        return () => {
            videoSocketRef.current?.close()
        }
    }, [])

    return {
        imgRef,
        connectVideo,
        disconnectVideo,
        isConnectedVideo
    }
}
