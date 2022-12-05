import React from 'react';
import styled from "styled-components";


const StyledRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const ListsRow: React.FC = ({
    children,
}) => (
    <StyledRow>
        {children}
    </StyledRow>
)

export default ListsRow;