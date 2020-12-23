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
      This application is currently only compatible on desktop browsers. I'm working on mobile compatability. Thank you.  
    </MobileMessage>
  )
}

export default Mobile
