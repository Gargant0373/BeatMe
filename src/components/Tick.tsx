import styled from "styled-components";

interface TickProps {
    active: number;
    selected: number;
    pitch: string;
}

function getActiveColor(props: TickProps) {
    if (props.active && props.selected)
        return 'var(--selected-active)';
    if (props.active) return 'var(--active)';
    if (props.selected) return 'var(--selected)';
    return 'var(--default)';
}

const Tick = styled.a<TickProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 30px;
    background-color: ${props => getActiveColor(props)};
    border-radius: 5%;
    transition: background-color 0.3s;
    cursor: pointer;
    &:hover {
        background-color: var(--hover);
    }

    span {
        font-size: 10px;
        color: ${props => (props.selected ? 'white' : 'black')};
        pointer-events: none; // Disable interaction with the text
    }
`;

export default Tick;
