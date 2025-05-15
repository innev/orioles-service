"use client"

import type React from "react";

import FullContainer from "@/components/server/Containers";
import { useState, useEffect, useRef } from "react";

export default () => {
  const [videoUrl, setVideoUrl] = useState("")
  const [inputUrl, setInputUrl] = useState("")
  const wsRef = useRef<WebSocket | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, []);

  const connectToStream = (streamUrl: string) => {
    // Close existing connection if any
    if (wsRef.current) {
      wsRef.current.close()
    }

    try {
      const ws = new WebSocket(streamUrl)
      wsRef.current = ws

      ws.onopen = () => {
        console.log("WebSocket connection established")
      }

      ws.onmessage = (event) => {
        // Handle binary data from WebSocket
        if (event.data instanceof Blob) {
          const blob = new Blob([event.data], { type: "video/webm" })
          const url = URL.createObjectURL(blob)

          // Update video source
          setVideoUrl(url)

          // Clean up previous object URL to avoid memory leaks
          if (videoRef.current && videoRef.current.src && videoRef.current.src !== url) {
            URL.revokeObjectURL(videoRef.current.src)
          }
        }
      }

      ws.onerror = (error) => {
        console.error("WebSocket error:", error)
      }

      ws.onclose = () => {
        console.log("WebSocket connection closed")
      }
    } catch (error) {
      console.error("Failed to connect to WebSocket:", error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputUrl) {
      connectToStream(inputUrl)
    }
  }

  return (
    <FullContainer>
      <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Video Stream Player</h1>

        <form onSubmit={handleSubmit} className="w-full mb-6">
          <div className="flex gap-2">
            <input
              id="videoUrl"
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Enter WebSocket stream URL (ws://...)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Connect
            </button>
          </div>
        </form>

        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
          {videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              playsInline
              controls
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">No stream connected</div>
          )}
        </div>
      </div>
    </FullContainer>
  )
}