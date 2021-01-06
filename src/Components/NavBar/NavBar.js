import React ,{useRef}from "react";

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
  // const [show, toggle] = useState(false);
 
  const onSubmit=(e)=>{
    e.preventDefault()
  
    if(inputRef.current.value!=='')
    {
      dispatch({type:'sort/searchItem',payload:inputRef.current.value.toString()})
      
    }
    else{
      dispatch({type:'sort/setSort',payload:{view:'all'}})
    }

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
    <Nav className="mr-auto">
    <Nav.Link  onClick={()=>{url.push('/cart')}}> <CartCounter count={count}/></Nav.Link>

    </Nav>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link  onClick={()=>{url.push('/user')}}>{status||"loading"}</Nav.Link>
      
    </Nav>
   {location.pathname==='/'? <Form inline onSubmit={onSubmit}>
      <FormControl ref={inputRef} type="text" placeholder="Search"  className="mr-sm-2" />
      <Button variant="outline-success" type="submit" value="Submit">Search</Button>
    </Form>:<></>}
  </Navbar.Collapse>
  
</Navbar>




     
</div>
 
  );
};

export default NavBar;
