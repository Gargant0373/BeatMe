import styled from 'styled-components';

interface DownloadContainerProps {
    audioURL: string | null;
}

const DownloadContainer = styled.div<DownloadContainerProps>`
    display: ${({ audioURL }) => (audioURL ? 'block' : 'none')};
    margin-top: 20px;
    text-align: center;

    p {
        font-size: 18px;
        color: var(--default);
    }

    a {
        display: inline-block;
        padding: 10px 20px;
        background-color: var(--active);
        color: white;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: var(--hover);
        }
    }
`;

export default DownloadContainer;
