import React, { useState } from "react";
//
import Button from "./Button";
import Search from "./Search";
import NavLinks from "./NavLinks";
import "./NavBar.scss";
import { useLocation } from "react-router-dom";
const NavBar = () => {
  const location = useLocation();
  const [show, toggle] = useState(false);
  function toggleSearch(e) {
    e.preventDefault();
    toggle(!show);
  }

  return (
    <div className="NavBar">
      <NavLinks />
      <Button show={show} toggleSearch={toggleSearch} />
      {location.pathname === "/" ? <Search visibility={show} /> : <></>}
    </div>
  );
};

export default NavBar;
