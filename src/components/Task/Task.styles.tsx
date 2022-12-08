import styled from 'styled-components';

export const Container = styled.div`
    overflow: hidden;
    margin-bottom: .6rem; 
    
    ${props=> props.expanded?`
        height: 10rem;
        background-color: #F2F2F2;
        border-radius: 20px;
    ` : `
        height: 2.7rem;
        :hover {
            border-radius: 20px;
        }
        
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    `};
    padding: 20px, 14px, 14px, 12px;

    transition: all .1s ease-out;

    font-family: 'Recoleta DEMO';
`;

export const TaskTitle = styled.h1`
    ${props=> props.expanded?`
        font-size: 20px;
        font-weight: 500;
    ` : `
        font-size: 16px;
        font-weight: 400;
        
        cursor: pointer;
        :hover {
            border-radius: 20px;
            background-color: #F2F2F2;
            transform: translate(8px, 0);
        } 
    `};

    transition: all .1s ease-out;
    display: flex;
    flex-direction: row;
    align-items: center;

    position: relative;
`;

export const TaskIndicator = styled.img`
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translate(0, -50%);

    ${props=> props.image=='dot'?'width: 6px; border-radius: 50%':''};
    ${props=> props.image=='sharp'?'left: 8px;':''};
`;

export const TaskTitleText = styled.div`
    padding-left: 2.4rem;
`;

export const TaskDescriptionWrapper = styled.div`
    display: block;
    box-sizing: border-box;
    ${props=> !props.expanded?'margin-bottom: 1rem;':''};
`;


export const TaskDescription = styled.textarea`
    ${props=> props.expanded?`
        color: #00000040;
        background-color: #F2F2F2;
    `:`
        color: transparent;
        display: none;
    `};
    border: 0;
    font-size: 16px;

    width: 85%;
    height: 57px;
    padding: 0 2.4rem 0 2.4rem;

    :focus {
        outline: none !important;
        border: 0;
        box-shadow: 0;
    }
`;

export const TaskButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    margin-top: .4rem;
`;

export const TaskButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 16px;
    gap: 6px;

    width: 141.67px;
    height: 30px;

    border: 0;
    border-radius: 8px;
    
    font-weight: 500;
    font-size: 16px;

    ${props => props.model == 'discard' ?  'background: #E7D6D6;': 'background:#DADEE9'};
`;