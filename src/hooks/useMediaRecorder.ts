import { recorderWAV } from "@/utils/NLSClient";
import { useState } from "react";

const useMediaRecorder = () => {
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioBlob, setAudioBlob] = useState<Blob>();
    const [audioBlobUrl, setAudioBlobUrl] = useState<string>();
    const [recording, setRecording] = useState(false);

    let chunks: Array<Blob> = [];

    const startRecord = async () => {
        if (recording && mediaRecorder) {
            console.info("Recording...");
            return true;
        }

        const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        console.debug("Got UserMedia success.");

        setRecording(true);
        // const recorder = new MediaRecorder(stream, recorderPCM);
        const recorder = new MediaRecorder(stream);

        recorder.addEventListener('dataavailable', event => {
            console.debug("Recorder dataavailable:", event.data);

            chunks.push(event.data);
        });

        recorder.addEventListener('stop', () => {
            // const _audioBlob: Blob = new Blob(chunks, { type: recorderPCM.mimeType });
            const _audioBlob: Blob = new Blob(chunks, { type: recorderWAV.mimeType });
            console.debug("Recorder stop success.", _audioBlob);

            setAudioBlob(_audioBlob);
            setAudioBlobUrl(URL.createObjectURL(_audioBlob));
            chunks = [];
            setRecording(false);
        });

        recorder.addEventListener('error', error => {
            console.error("Recorder error:", error);
        });

        console.debug("Set record start.");
        recorder.start();
        setMediaRecorder(recorder);
    };

    const stopRecord = () => {
        if (mediaRecorder instanceof MediaRecorder) {
            console.debug("Set record stop.");

            mediaRecorder.stop();
            setMediaRecorder(null);
        } else {
            console.warn("MediaRecorder not found!");
        }
    };

    const startOrStop = () => {
        if (!recording && !mediaRecorder) {
            startRecord();
        } else if (recording) {
            stopRecord();
        } else {
            console.warn("Start or Stop method error!");
        }
    };

    return { startOrStop, startRecord, stopRecord, audioBlobUrl, audioBlob, recording }
};

export default useMediaRecorder;