import React from "react";
import API from '../../API'
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.searchRef=React.createRef();
  }
  toggleSearch(e) {
    e.preventDefault();
    this.setState({
      show: !this.state.show,
    });
  }
  handleSearch(e){
    e.preventDefault();
   API.getItemByName(this.searchRef.current.value);
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
        <form autoComplete="off" className={this.state.show ? "show" : "hide"} onSubmit={this.handleSearch.bind(this)}>
          <input
            id="search"
            type="text"
            required
            placeholder="search for item"
            className="input"
            ref={this.searchRef}
          />
          <input id="btn" type="submit" value="Search" className="input" />
        </form>
      </div>
    );
  }
}

export default NavBar;
