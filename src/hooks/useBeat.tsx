import { useState, useEffect } from "react";

export const useBeat = (playing: boolean, totalSteps: number, beatInterval: number) => {
    const [currentStep, setCurrentStep] = useState(-1);

    useEffect(() => {
        if (!playing) return;

        const interval = setInterval(() => {
            setCurrentStep(prevStep => (prevStep + 1) % totalSteps);
        }, beatInterval);

        return () => {
            setCurrentStep(-1);
            clearInterval(interval);
        };
    }, [playing, totalSteps, beatInterval]);

    return { currentStep };
};
