import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/userSlice';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import firebase from "firebase";
function Header() {

  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const username = useSelector(state => state.user.user.displayName)

  //kiểm tra ng dùng có login chưa
  const accessToken = JSON.parse(localStorage.getItem("accessToken"))

  const handleLogout = () => {
    firebase.auth().signOut()
    dispatch(logout())
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavLink to="/">SHOPPING CART</NavLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          </Nav>
          {
            !accessToken ? (
              <NavLink to="/login">Login</NavLink>
            ) : (
              <UncontrolledDropdown inNavbar>
              <DropdownToggle caret>
                { username }
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={handleLogout}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            )
          } 
          <NavLink to="/cart"><box-icon name='cart'></box-icon></NavLink>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
