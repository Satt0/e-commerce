import React from "react";
// 
import Button from './Button'
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
        <Button show={this.state.show} toggleSearch={this.toggleSearch.bind(this)}/>
        <Search visibility={this.state.show}/>
      </div>
    );
  }
}

export default NavBar;
