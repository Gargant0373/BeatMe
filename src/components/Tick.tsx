import styled from "styled-components";

interface TickProps {
    active: number;
    selected: number;
}

const Tick = styled.a<TickProps>`
    display: block;
    width: 20px;
    height: 30px;
    background-color: ${props => props.selected ? props.active ? 'var(--selected-active)' : "var(--selected)" : 'var(--active)'};
    border-radius: 5%;
    transition: background-color 0.3s;
    cursor: pointer;
    &:hover {
        background-color: #FFF;
    }
`;

export default Tick;