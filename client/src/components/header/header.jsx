import React from "react";
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
import useHeader from "./hooks/useHeader";
const Header = () => {
  const { user, menu, location, toggle, isOpen, logout, profile } = useHeader();
  return (
    <header>
      <Navbar expand="md" className="Navbar">
        <NavbarBrand href="/">
          <h1 className="Navbar-logo">Boooker</h1>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="mr-auto Navbar-nav">
            {!user ? (
              <>
                {menu.map((item) => (
                  <NavItem key={item?.key}>
                    <NavLink
                      className={
                        item.url === location.pathname
                          ? "Navbar-nav-link actived "
                          : "Navbar-nav-link"
                      }
                      href={item?.url}
                    >
                      {item?.title}
                    </NavLink>
                  </NavItem>
                ))}
              </>
            ) : (
              <>
                <NavItem className="Navbar-nav-item">
                  <NavLink
                    href="/"
                    className={
                      "/" === location.pathname
                        ? "Navbar-nav-link actived "
                        : "Navbar-nav-link"
                    }
                  >
                    Home
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {user?.result.name} {user?.result.surname}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={() => profile(user)}>
                      My Profile
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => logout()}>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};
export default Header;
