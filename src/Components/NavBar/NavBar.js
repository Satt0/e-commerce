import React from "react";

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
        <form autoComplete="off" className={this.state.show ? "show" : "hide"}>
          <input
            id="search"
            type="text"
            required
            placeholder="search for item"
            className="input"
          />
          <input id="btn" type="submit" value="Search" className="input" />
        </form>
      </div>
    );
  }
}

export default NavBar;
