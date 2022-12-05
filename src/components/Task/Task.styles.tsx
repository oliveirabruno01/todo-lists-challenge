import styled from 'styled-components';

export const Container = styled.div`
    overflow: hidden;

    ${props=> props.expanded?`
        height: 10rem;
        background-color: #F2F2F2;
        border-radius: 20px; 
        margin-bottom: .6rem; 
    ` : `
        height: 2.8rem;
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
            margin: .1rem 0;
            padding: .4rem 0;
            font-size: 17px;
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

    ${props=> props.image=='todo'?'width: 6px; border-radius: 50%':''};
    ${props=> props.image=='done'?'left: 8px;':''};
`;

export const TaskTitleText = styled.div`
    padding-left: 2.4rem;
`;

export const TaskDescriptionWrapper = styled.div`
    display: block;
    box-sizing: border-box;
`;


export const TaskDescription = styled.textarea`
    ${props=> props.expanded?`
        color: #00000040;
        background-color: #F2F2F2;
    `:'color: transparent;'};
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