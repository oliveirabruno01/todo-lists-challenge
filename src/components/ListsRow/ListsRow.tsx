import React from 'react';
import styled from "styled-components";


const StyledRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export class ListsRow extends React.Component <any, any>  {
    render() {
        return <StyledRow>
            { this.props.children }
        </StyledRow>
    }
}

export default ListsRow;