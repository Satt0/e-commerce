import React, { useState ,useRef} from "react";

import "./NavBar.scss";

import {useSelector,useDispatch} from 'react-redux'
import {Form,Nav,
  // NavDropdown,
  
  FormControl,Button,Navbar,
  // Spinner
} from 'react-bootstrap'
import CartCounter from './smallerComponents/CartCounter'
import { useLocation ,useHistory} from "react-router-dom";
const NavBar = () => {
  const count=useSelector(state=>state.items).filter(e=>e.cart).length
  const inputRef=useRef(null)
  const dispatch=useDispatch()
  const location = useLocation();
  const url=useHistory()
  const [show, toggle] = useState(false);
 
  const onSubmit=(e)=>{
    e.preventDefault()
  
    dispatch({type:'searchItem',payload:inputRef.current.value.toString()})


  }
  const user=useSelector(state=>state.user)
  let status;
  switch(user.loggedIn){
    case null:status='please wait';break;
    case 'in':status='User: '+user.name;break;
    case "out":status="login";break;
  }

  return (



<div className="NavBar-container">
<Navbar bg="light" expand="md">
  <Navbar.Brand style={{cursor:'pointer'}}  onClick={()=>{url.push('/')}}>Webshop-by-Tan</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link onClick={()=>{url.push('/cart')}}> <CartCounter count={count}/></Nav.Link>
      <Nav.Link  onClick={()=>{url.push('/user')}}>{status||"loading"}</Nav.Link>
      {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
    </Nav>
   {location.pathname==='/'? <Form inline onSubmit={onSubmit}>
      <FormControl ref={inputRef} type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success" type="submit" value="Submit">Search</Button>
    </Form>:<></>}
  </Navbar.Collapse>
  
</Navbar>




     
</div>
 
  );
};

export default NavBar;
