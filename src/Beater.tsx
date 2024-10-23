import { useEffect, useState } from "react";
import Application from "./components/Application";
import Container from "./components/Container";
import InstrumentTitle from "./components/InstrumentTitle";
import NumberSelector from "./components/NumberSelector";
import Row from "./components/Row";
import Tick from "./components/Tick";
import TickWrapper from "./components/TickWrapper";
import Title from "./components/Title";
import { useBeat } from "./hooks/useBeat";
import { useSound } from "./hooks/useSound";

const TOTAL_ROWS = 4;
const TOTAL_STEPS = 16;

function Beater() {
    const [selected, setSelected] = useState<boolean[][]>(Array(TOTAL_STEPS).fill(Array(TOTAL_STEPS).fill(false)));
    const instruments = [
        'kick',
        'snare',
        'hi-hat',
        'clap',
    ];
    const [bpm, setBPM] = useState<number>(120);
    const { currentStep } = useBeat(TOTAL_STEPS, 60000 / bpm);
    const { playSound } = useSound();

    useEffect(() => {
        instruments.forEach((inst, rowIndex) => {
            if (selected[rowIndex][currentStep]) {
                playSound(inst);
            }
        });
    }, [currentStep]);

    const handleTickClick = (columnIndex: number, stepIndex: number) => {
        setSelected(prevSelected => {
            const newSelected = prevSelected.map(row => [...row]);
            newSelected[columnIndex][stepIndex] = !newSelected[columnIndex][stepIndex];
            return newSelected;
        });
    };

    return (
        <Application>
            <Title>BEAT ME</Title>
            <Container>
                <NumberSelector label="BPM: " value={bpm} setValue={setBPM} min={0} max={300} />
                <Container>
                    {Array.from({ length: TOTAL_ROWS }).map((_, rowIndex) => (<Row key={"row" + rowIndex}>
                        <InstrumentTitle key={rowIndex + "a"}>
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
                                        handleTickClick(rowIndex, stepIndex)
                                    }}
                                />
                            ))}
                        </TickWrapper>
                    </Row>
                    ))}
                </Container>
            </Container>
        </Application>
    );
}

export default Beater;
