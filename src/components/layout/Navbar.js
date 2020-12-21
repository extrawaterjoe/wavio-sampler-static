import styled from "styled-components";
import {ReactComponent as SunIcon} from '../../css/icons/sun.svg';
import {ReactComponent as MoonIcon} from '../../css/icons/moon.svg';

const Nav = styled.nav`
background-color: ${({ theme }) => theme.nav};
font-family: 'Roboto Mono', monospace;
font-size: 12px;
font-weight: 600;
position: fixed; 
top: 0; 
max-height: 2.5rem;
width: 100%;
display: flex;
place-items: center;
justify-content: space-between;
padding: 0.5em;
padding-left: 25px;
`

const ToggleButton = styled.button`
background: transparent;
color: ${({ theme }) => theme.text};
border-radius: 0.25rem;
border-width: 0;
display: inline-flex;
appearance: none;
-webkit-box-align: center;
align-items: center;
-webkit-box-pack: center;
justify-content: center;
transition: all 250ms ease 0s;
user-select: none;
position: relative;
white-space: nowrap;
vertical-align: middle;
line-height: 1.2;
outline: none;
height: 1.5rem;
min-width: 1.5rem;
font-size: 11px;
background-color: rgba(255, 255, 255, 0.2);
padding: 0px;
margin-left: 20px;
margin-right: 12px;
& > svg {
  height:12px; 
  width:12px;
  }
&:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
`

const NavSpace = styled.div`
  display: flex;
  place-items: center;
`

export const Navbar = ({ toggleTheme, theme }) => {

  return (
    <Nav>
      <span>Wavio Sampler Lite</span>
      <NavSpace>
        <ToggleButton onClick={toggleTheme}>
          {
            (theme === 'light') ? <MoonIcon style={{'fill': 'midnightblue'}} /> 
            : <SunIcon style={{'fill': 'yellow'}}/>
          }
        </ToggleButton>
      </NavSpace>
    </Nav>
  )
}
