export const useSound = () => {
    const playSound = (instrument: string) => {
        const audio = new Audio(`/sounds/${instrument}.mp3`);
        audio.play();
    };

    return { playSound };
};
