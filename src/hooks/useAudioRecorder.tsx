import { useRef, useState, useEffect } from 'react';

export function useAudioRecorder() {
    const audioContextRef = useRef<AudioContext | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const destinationRef = useRef<MediaStreamAudioDestinationNode | null>(null); // Ref for the destination node
    const audioChunks = useRef<Blob[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);

    useEffect(() => {
        // Initialize the audio context and destination for recording
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;
        destinationRef.current = audioContext.createMediaStreamDestination();
    }, []);

    const startRecording = () => {
        if (!isRecording && destinationRef.current) {
            mediaRecorderRef.current = new MediaRecorder(destinationRef.current.stream);

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunks.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setAudioURL(url);
                audioChunks.current = []; // Reset chunks
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    // Function to connect an audio node (e.g., a sound being played) to the recorder
    const connectToRecorder = (source: AudioNode) => {
        if (destinationRef.current) {
            source.connect(destinationRef.current); // Connect the sound source to the destination for recording
        }
    };

    return { startRecording, stopRecording, isRecording, audioURL, connectToRecorder, audioContext: audioContextRef.current };
}
