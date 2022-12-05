import styled, { keyframes } from "styled-components";

const font_color = "#212121";

export const AppBackground = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: radial-gradient(117.04% 95.93% at 50% 0%, #FBFBFB 0%, #E8E8E8 100%);
`; 

const AppLogoSpin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;

export const AppLogo = styled.img`
    width: 112px;
    height: 108px;
    pointer-events: none;

    @media (prefers-reduced-motion: no-preference) {
        animation: ${AppLogoSpin} infinite 20s linear;
    }
`;

export const AppHeader = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 65px 90px 90px;

    font-size: calc(10px + 2vmin);
    color: ${font_color};
`;

export const AppWelcome = styled.h1`
    font-weight: 500;
    font-size: 36px;
    line-height: 49px;
    text-align: center;
    text-shadow: 0px 0px 30px #FFFFFF;
    margin-bottom: .2rem;

    font-family: "Recoleta DEMO";
`;

export const AppSplash = styled.p`
    font-family: 'Untitled Sans';
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    margin-top: 0;
    
    text-shadow: 0px 0px 30px #FFFFFF;
    font-family: "Untitled Sans test";
`;