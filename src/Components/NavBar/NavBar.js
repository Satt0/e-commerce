import React from "react";
// 
import Search from './Search';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };

  }
  toggleSearch(e) {
    e.preventDefault();
    this.setState({
      show: !this.state.show,
    });
    
  }
 
  render() {
    return (
      <div className="NavBar">
        <div className="links">
          <ul>
            <li>Home</li>
            <li>Cart</li>
            <li>Contact</li>
          </ul>
        </div>
        <button onClick={this.toggleSearch.bind(this)}>
          {this.state.show ? "hide" : "show"}
        </button>
        <Search visibility={this.state.show}/>
      </div>
    );
  }
}

export default NavBar;
