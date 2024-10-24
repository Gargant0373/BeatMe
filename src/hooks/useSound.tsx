import { useEffect, useState } from "react";

export enum MusicalNote {
    C4 = "C4",
    CSharp4 = "C#4",
    D4 = "D4",
    DSharp4 = "D#4",
    E4 = "E4",
    F4 = "F4",
    FSharp4 = "F#4",
    G4 = "G4",
    GSharp4 = "G#4",
    A4 = "A4",
    ASharp4 = "A#4",
    B4 = "B4",
    C5 = "C5",
}

const noteFrequencies = {
    [MusicalNote.C4]: -9,
    [MusicalNote.CSharp4]: -8,
    [MusicalNote.D4]: -7,
    [MusicalNote.DSharp4]: -6,
    [MusicalNote.E4]: -5,
    [MusicalNote.F4]: -4,
    [MusicalNote.FSharp4]: -3,
    [MusicalNote.G4]: -2,
    [MusicalNote.GSharp4]: -1,
    [MusicalNote.A4]: 0,    
    [MusicalNote.ASharp4]: 1,
    [MusicalNote.B4]: 2,
    [MusicalNote.C5]: 3,
};

const getFrequency = (note: MusicalNote) => {
    const semitoneDistance = noteFrequencies[note];
    return 440 * Math.pow(2, semitoneDistance / 12);  
};

const convertFrequencyToPlaybackRate = (targetFrequency: number, originalFrequency: number) => {
    return targetFrequency / originalFrequency;
};

export const useSound = (audioContext: AudioContext | null, instruments: string[]) => {
    const [audioBuffers, setAudioBuffers] = useState<Map<string, AudioBuffer>>(new Map());

    useEffect(() => {
        if (!audioContext) return;

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
    }, [audioContext, instruments]);

    const playSound = (instrument: string, note: MusicalNote = MusicalNote.A4) => {
        if (!audioContext) return;
        const buffer = audioBuffers.get(instrument);
        if (buffer) {
            const source = audioContext.createBufferSource();
            source.buffer = buffer;

            const originalFrequency = 440; 
            const targetFrequency = getFrequency(note);
            const playbackRate = convertFrequencyToPlaybackRate(targetFrequency, originalFrequency);

            source.playbackRate.value = playbackRate; 
            source.connect(audioContext.destination);
            source.start(0); 
            return source; 
        }
        return null;
    };

    return { playSound };
};
