'use client'

import FullContainer from "@/components/server/Containers";
import { useState } from "react";

const streamUrl = 'ws://192.168.1.249:8080/stream/rtsp';

export default () => {
    const [videoUrl, setVideoUrl] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const inputElement: HTMLInputElement = document.getElementById('videoUrl') as HTMLInputElement;
        setVideoUrl(inputElement.value);
    };

    const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const ws = new WebSocket(streamUrl);
        ws.onmessage = (event) => {
          const blob = new Blob([event.data], { type: 'video/webm' });
          setVideoUrl(inputElement.value);
        };
    };

    return (
        <>

            <FullContainer>
                <video src={videoUrl} autoPlay={true} playsInline={true} controls={true} />
            </FullContainer>
        </>
    )
}