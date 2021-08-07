import React, { useState } from "react";
import { useDocTitle } from '../../utils/customHooks.js'
import { Link, useLocation } from "react-router-dom";
import Auth from "../../utils/auth";
// nodejs library that concatenates strings
import classnames from "classnames";
// JavaScript plugin that hides or shows a component based on your scroll
// import Headroom from "headroom.js";
// reactstrap components
import {
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
// core components
import './nav.css';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  let location = useLocation();
  const [doctitle, setDocTitle] = useDocTitle("Babysitters Club");
  function showAuthNavigation() {
    if (Auth.loggedIn()) {
      return (
        <div>
          <NavItem>
            <NavLink
              className={location.pathname === '/me' ? 'active' : ''}
              onClick={() => setDocTitle("Babysitters Club :: My Profile")}
            ><Link to='/me'>My Profile</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={location.pathname === '/saved' ? 'active' : ''}
              onClick={() => setDocTitle("Babysitters Club :: Favourites")}
            ><Link to='/saved'>Favourites</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </NavItem>

        </div>
      );
    } else {
      return (
        <div>
          <NavItem>
            <NavLink
              className={location.pathname === '/register' ? 'active' : ''}
              onClick={() => setDocTitle("Babysitters Club :: Signup")}
            ><Link to='/register'>Register</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={location.pathname === '/login' ? 'active' : ''}
              onClick={() => setDocTitle("Babysitters Club :: Login")}
            ><Link to='/login'>Login</Link>
            </NavLink>
          </NavItem>
        </div>
      );
    }
  }
  return (
    <Container>
      <Navbar expand="md" color="faded" dark>
        <NavbarBrand href="/">Babysitters Club</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                className={location.pathname === '/home' ? 'active' : ''}
                onClick={() => setDocTitle("Babysitters Club :: Home")}
              ><Link to='/home'>Home</Link>
              </NavLink>
            </NavItem>
            {showAuthNavigation()}
          </Nav>
        </Collapse>
      </Navbar>
    </Container>
  );
}

export default Navigation;
