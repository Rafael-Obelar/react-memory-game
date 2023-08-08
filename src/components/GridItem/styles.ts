import styled from "styled-components";

type ContainerProp = {
    showBackground: boolean;
}

export const Container = styled.div<ContainerProp>`
    display: flex;
    height: 100px;
    cursor: pointer;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.showBackground ? '#1550ff' : '#e2e3e3'};
`;

type IconProp = {
    opacity?: number;
}

export const Icon = styled.img<IconProp>`
    widget: 50px;
    height: 50px;
    opacity: ${props => props.opacity ??  1};
`;