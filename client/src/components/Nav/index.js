import React from "react";
import {useDocTitle} from '../../utils/customHooks.js'
import { Link, useLocation } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";
// JavaScript plugin that hides or shows a component based on your scroll
// import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";
// core components

function Navigation() {
  // const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [bodyClick, setBodyClick] = React.useState(false);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  let location = useLocation();
  const [doctitle, setDocTitle] = useDocTitle("Babysitters Club");
  // React.useEffect(() => {
  //   let headroom = new Headroom(document.getElementById("navbar-main"));
  //   // initialise
  //   headroom.init();
  //   const updateNavbarColor = () => {
  //     if (
  //       document.documentElement.scrollTop > 499 ||
  //       document.body.scrollTop > 499
  //     ) {
  //       setNavbarColor("");
  //     } else if (
  //       document.documentElement.scrollTop < 500 ||
  //       document.body.scrollTop < 500
  //     ) {
  //       setNavbarColor("navbar-transparent");
  //     }
  //   };
  //   window.addEventListener("scroll", updateNavbarColor);
  //   return function cleanup() {
  //     window.removeEventListener("scroll", updateNavbarColor);
  //   };
  // });
  
  return (
    <>
      {bodyClick ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setBodyClick(false);
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar
        className={classnames("fixed-top")}
        expand="lg"
        id="navbar-main"
      >
        <Container>
          <div className="navbar-translate">
            <NavbarBrand id="navbar-brand" to="/login" tag={Link}>
              Babysitter's Club
            </NavbarBrand>
            <button
              className="navbar-toggler"
              id="navigation"
              type="button"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setBodyClick(true);
                setCollapseOpen(true);
              }}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
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
              <NavLink
                className={location.pathname === '/login' ? 'active' : ''}
                onClick={() => setDocTitle("Babysitters Club :: Login")}
              ><Link to='/login'>Login</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={location.pathname === '/signup' ? 'active' : ''}
                onClick={() => setDocTitle("Babysitters Club :: Signup")}
              ><Link to='/signup'>Singup</Link>
              </NavLink>
            </NavItem>
            
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
