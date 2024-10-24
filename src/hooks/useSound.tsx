import { useEffect, useState } from "react";

export const useSound = (audioContext: AudioContext | null, instruments: string[]) => {
    const [audioBuffers, setAudioBuffers] = useState<Map<string, AudioBuffer>>(new Map());

    useEffect(() => {
        if(!audioContext) return;

        const loadSounds = async () => {
            const buffers = new Map<string, AudioBuffer>();
            for (const instrument of instruments) {
                const response = await fetch(`./sounds/${instrument}.mp3`);
                const audioData = await response.arrayBuffer();
                const audioBuffer = await audioContext.decodeAudioData(audioData);
                buffers.set(instrument, audioBuffer); 
            }
            setAudioBuffers(buffers);
        };

        loadSounds();
    }, [audioContext]);

    const playSound = (instrument: string) => {
        if(!audioContext) return;
        const buffer = audioBuffers.get(instrument);
        if (buffer) {
            const source = audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(audioContext.destination);
            source.start(0); 
            return source; 
        }
        return null;
    };

    return { playSound };
};