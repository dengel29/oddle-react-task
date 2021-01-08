import React from 'react';

type SearchbarProps = {
  triggerSearch: React.MouseEventHandler,
  setQuery: any,
  value:any,
}

const Searchbar = (props: SearchbarProps) => {
  return (
    <React.Fragment>
      <input type="text" value={props.value} onChange={props.setQuery}/> 
      <button onClick={props.triggerSearch}>Bounce that boy</button>  
    </React.Fragment>
  );
};

export default Searchbar;