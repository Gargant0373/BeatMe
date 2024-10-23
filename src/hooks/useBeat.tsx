import { useState, useEffect } from "react";

export const useBeat = (totalSteps: number, beatInterval: number) => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep(prevStep => (prevStep + 1) % totalSteps);
        }, beatInterval);

        return () => clearInterval(interval);
    }, [totalSteps, beatInterval]);

    return { currentStep };
};
