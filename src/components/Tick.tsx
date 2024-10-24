import styled from "styled-components";

interface TickProps {
    active: number;
    selected: number;
}

function getActiveColor(props: TickProps) {
    if(props.active && props.selected)
        return 'var(--selected-active)';
    if(props.active) return 'var(--active)';
    if(props.selected) return 'var(--selected)';
    return 'var(--default)';
}

const Tick = styled.a<TickProps>`
    display: block;
    width: 20px;
    height: 30px;
    background-color: ${props => getActiveColor(props)};
    border-radius: 5%;
    transition: background-color 0.3s;
    cursor: pointer;
    &:hover {
        background-color: var(--hover);
    }
`;

export default Tick;