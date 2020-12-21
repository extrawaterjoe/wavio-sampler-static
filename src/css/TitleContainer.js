import styled from 'styled-components';

export const TitleContainer= styled.div`
display: flex;
min-height: 1.5em;
place-items: center;
padding: 0.2rem 0.5rem;
justify-content: space-between;
background-color: ${({ theme }) => theme.nav};
margin: 0.5em;
border-radius: 0.25em;
`
