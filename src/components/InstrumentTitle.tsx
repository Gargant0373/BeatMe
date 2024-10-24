import styled from "styled-components";

const InstrumentTitle = styled.a`
    display: block;
    min-width: 100px;
    color: #FFF;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
    user-select: none;
    font-size: 20px;

    &:hover {
        color: var(--hover);
        font-size: 22px;
    }
`;

export default InstrumentTitle;