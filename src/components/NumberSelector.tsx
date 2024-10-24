import styled from "styled-components";

interface NumberSelectorProps {
    label: string;
    value: number;
    setValue: (value: number) => void;
    min?: number;
    max?: number;
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
`;

const Label = styled.label`
    font-size: 1rem;
    color: #FFF;
`;

const Input = styled.input`
    width: min-content;
    padding: 5px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;
    background-color: transparent;
    color: #FFF;

    &:focus {
        border-color: var(--selected);
    }

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &::-moz-inner-spin-button,
    &::-moz-outer-spin-button {
        -moz-appearance: none;
        margin: 0;
    }
`;

function NumberSelector(props: NumberSelectorProps) {
    return (
        <Container>
            <Label htmlFor="number-selector">{props.label}:</Label>
            <Input
                type="number"
                id="number-selector"
                name="number-selector"
                min={props.min}
                max={props.max}
                value={props.value}
                onChange={(e) => props.setValue(Number(e.target.value))}
            />
        </Container>
    );
}

export default NumberSelector;