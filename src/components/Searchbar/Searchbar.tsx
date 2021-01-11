import React from 'react';
import styled from 'styled-components'
type SearchbarProps = {
  triggerSearch: React.MouseEventHandler,
  setQuery: any,
  value:any,
}

const SearchAlignmentContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  margin: 0 auto;
`

const SearchInput = styled.input`
  border: none;
  border: 1px solid gray;
  border-radius: 3px;
  outline: none;
  height: 1.6em;
  text-align: center;
  font-size: 1.4rem;
  box-shadow: 0px 4px 4px rgb(47, 79, 79);
  width:70%;
  margin: 0 auto;
  &:focus {
    box-shadow: 0px 4px 1px darkslateblue;
  }
`

const SearchButton = styled.button`
  margin: 0 auto;
  cursor:pointer;
  padding: 1em;
  font-size: 1rem;
  letter-spacing:0.04em;
  font-weight:800;
  border-radius: 4px;
  outline: none;
  border: none;
  box-shadow: 0px 3px 1px darkslateblue;
  margin-top: 2em;
  width: 25%;
  margin-top:1.4em;
`

const Searchbar = (props: SearchbarProps) => {
  return (
    <SearchAlignmentContainer>
      <SearchInput type="text" value={props.value} onChange={props.setQuery}/> 
      <SearchButton onClick={props.triggerSearch}>Search Github For Users</SearchButton>  
    </SearchAlignmentContainer>
  );
};

export default Searchbar;