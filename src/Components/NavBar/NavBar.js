import React from "react";
// 
import Search from './Search';
import NavLinks from './NavLinks'
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
       
        <NavLinks/>
        <button onClick={this.toggleSearch.bind(this)} className={this.state.show?"have-border":''}>
          
          <div className={this.state.show?"hamburgur top":"hamburgur"}></div>
          <div className={this.state.show?"hamburgur middle":"hamburgur"}></div>
          <div className={this.state.show?"hamburgur bottom":"hamburgur"}></div>
        </button>
        <Search visibility={this.state.show}/>
      </div>
    );
  }
}

export default NavBar;
