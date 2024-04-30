import { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { NavLink as RRNavLink, useNavigate } from "react-router-dom";
import "./Navbar.css"; // You can define custom styles in Navbar.css

export const NavBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={RRNavLink} to="/" className="navbar-brand">
          Stowaway Records
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/records">
                Records
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu className="custom-dropdown-menu" right>
                <DropdownItem>
                  <NavLink tag={RRNavLink} to="/records/new">
                    New Record
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={RRNavLink} to="/my-records">
                    My Records
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
        <Nav className="ml-auto align-items-center justify-content-end" navbar>
          {" "}
          <NavItem>
            <button
              className="btn-logout ml-auto"
              onClick={() => {
                localStorage.removeItem("user_token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};
