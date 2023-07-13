import React, { useContext, useRef } from "react";
import { store } from '../../contexts/PageContextStore';

import './index.scss'

interface HeaderProps { enableSearch?: boolean; }

const Header: React.FC<HeaderProps> = ({ enableSearch }) => {
  const { setPageData } = useContext(store);
  const searchInputRef = useRef<HTMLInputElement>(null);

  //search by input text
  const search = () => {
    const searchText = searchInputRef.current?.value;
    setPageData({ searchText });
  }
  //trigger search 
  const handleKeypress = (e: {
    which: number;
    keyCode: number;
  }) => {
    //it triggers by pressing the enter key
    if (e.keyCode || e.which === 13) {
      search();
    }
  };

  return (
    <div className="header">
      <div className="nav">
        <a className="nav-item" href="/">Home</a>
      </div>
      {enableSearch && <div className="search">
        <input className="search-input" ref={searchInputRef} onKeyPress={handleKeypress} />
        <button className="search-button" onClick={search}>Search</button>
      </div>}
    </div>
  );
};

export default Header;
