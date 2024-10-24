import styled from "styled-components";

interface ButtonProps {
    alignSelf?: string;
}

const Button = styled.button<ButtonProps>`
    background-color: var(--selected);
    border: 2px solid var(--active);
    color: white;
    padding: 5px 40px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.1s ease;
    width: fit-content;
    align-self: ${({ alignSelf }) => alignSelf || 'auto'};

    &:hover {
        background-color: var(--hover);
        border-color: var(--selected-active);
    }

    &:active {
        background-color: var(--selected-active);
        border-color: var(--selected-active);
        transform: scale(0.95);
    }

    &:focus {
        outline: none;
    }
`;


export default Button;
