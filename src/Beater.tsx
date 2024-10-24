import { useEffect, useState } from "react";
import Application from "./components/Application";
import Button from "./components/Button";
import Container from "./components/Container";
import InstrumentTitle from "./components/InstrumentTitle";
import NumberSelector from "./components/NumberSelector";
import Row from "./components/Row";
import Subtitle from "./components/Subtitle";
import Tick from "./components/Tick";
import TickWrapper from "./components/TickWrapper";
import Title from "./components/Title";
import { useBeat } from "./hooks/useBeat";
import { useSound } from "./hooks/useSound";
import { useAudioRecorder } from "./hooks/useAudioRecorder";
import DownloadContainer from "./components/DownloadContainer";

const TOTAL_ROWS = 4;
const TOTAL_STEPS = 16;

function Beater() {
    const [selected, setSelected] = useState<boolean[][]>(Array(TOTAL_STEPS).fill(Array(TOTAL_STEPS).fill(false)));
    const instruments = ['kick', 'snare', 'hi-hat', 'clap'];
    const [bpm, setBPM] = useState<number>(120);
    const [playing, setPlaying] = useState<boolean>(false);
    const { currentStep } = useBeat(playing, TOTAL_STEPS, 60000 / bpm);
    const { startRecording, stopRecording, isRecording, audioURL, connectToRecorder, audioContext } = useAudioRecorder();
    const { playSound } = useSound(audioContext, instruments);

    const [recordingStarted, setRecordingStarted] = useState(false);
    const [cycleCount, setCycleCount] = useState(0);

    useEffect(() => {
        instruments.forEach((inst, rowIndex) => {
            if (selected[rowIndex][currentStep]) {
                const source = playSound(inst);
                if (source) {
                    connectToRecorder(source);
                }
            }
        });

        if (currentStep === 0 && recordingStarted) {
            setCycleCount((prev) => prev + 1);
        }
    }, [currentStep]);

    useEffect(() => {
        if (cycleCount >= 2 && recordingStarted) {
            stopRecording();
            setRecordingStarted(false);
            setPlaying(false);
            setCycleCount(0);
        }
    }, [cycleCount, recordingStarted]);

    const handleTickClick = (columnIndex: number, stepIndex: number) => {
        setSelected(prevSelected => {
            const newSelected = prevSelected.map(row => [...row]);
            newSelected[columnIndex][stepIndex] = !newSelected[columnIndex][stepIndex];
            return newSelected;
        });
    };

    const togglePlay = () => {
        setPlaying(!playing);
    };

    const toggleRecord = () => {
        if (!recordingStarted) {
            setPlaying(true);
            startRecording();
            setRecordingStarted(true);
            setCycleCount(0);
        }
    };

    return (
        <Application>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", width: "100%" }}>
                <Title>BEAT ME</Title>
                <Subtitle>Click the Ticks to generate beats!</Subtitle>
            </div>
            <Container>
                <NumberSelector label="BPM" value={bpm} setValue={setBPM} min={0} max={300} />
                {Array.from({ length: TOTAL_ROWS }).map((_, rowIndex) => (
                    <Row key={"row" + rowIndex}>
                        <InstrumentTitle key={rowIndex + "a"} onClick={() => playSound(instruments[rowIndex])}>
                            {instruments[rowIndex]}
                        </InstrumentTitle>
                        <TickWrapper key={rowIndex}>
                            {Array.from({ length: TOTAL_STEPS }).map((_, stepIndex) => (
                                <Tick
                                    key={stepIndex}
                                    active={currentStep === stepIndex ? 1 : 0}
                                    selected={selected[rowIndex][stepIndex] ? 1 : 0}
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        handleTickClick(rowIndex, stepIndex);
                                    }}
                                />
                            ))}
                        </TickWrapper>
                    </Row>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button onClick={togglePlay}>{playing ? "STOP" : "START"}</Button>
                    <Button onClick={toggleRecord}>{isRecording ? "RECORDING..." : "RECORD"}</Button>
                </div>
                {audioURL && (
                    <DownloadContainer audioURL={audioURL}>
                        <p>Download your beat:</p>
                        <a href={audioURL} download="beat.wav">Download</a>
                    </DownloadContainer>
                )}
            </Container>
        </Application>
    );
}

export default Beater;
