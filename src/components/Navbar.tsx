import React from 'react'
import styled from 'styled-components'

import {ThemeProps} from '../types';

// redux
import { useDispatch } from 'react-redux'
import usersDisplaySlice from '../store/usersSlice';
const { toggleTheme } = usersDisplaySlice.actions;

const ThemeToggler = styled.button<ThemeProps> `
  height: 2em;
  width: 2em;
  background: ${props => props.theme === "LIGHT" ? "darkslateblue" : "white"};
  border: none;
  align-content: center;
  border-radius: 5px;
  display:flex;
  justify-content: center;
  margin-right: 0.4em;
  font-size: 24px;
  text-align: center;
  align-items: center;
  `;
  const NavContainer = styled.div<ThemeProps> `
  width: 100%;
  align-items:center;
  background-color: ${props => props.theme === "LIGHT" ? "white" : "darkslateblue"};
  display:flex;
  h3 {
    color: ${props => props.theme === "LIGHT" ? "darkslateblue" : "white"};
  }
  flex-direction:row;
  justify-content: space-between;
  margin-bottom:1.4em;
  `;

const Navbar = (props: any) => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <NavContainer theme={props.theme}>
        <h3>Oddle React Github Task from Dan Engel</h3>
        <ThemeToggler onClick={() => dispatch(toggleTheme())} theme={props.theme}>
          ☀️
        </ThemeToggler>
      </NavContainer>
    </React.Fragment>
  );
}

export default Navbar;