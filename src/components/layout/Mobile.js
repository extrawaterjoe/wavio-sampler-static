import styled from "styled-components";

const MobileMessage = styled.div`
  grid-row-start: 1;
  grid-row-end: 8;
  grid-column-start: 2;
  grid-column-end: 15;
  min-height: 95%;
  place-content: center;
`

const Mobile = () => {
  return (
    <MobileMessage>
      This application does not currently support mobile use. 
    </MobileMessage>
  )
}

export default Mobile
