import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap'
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (

      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#"><h1>Site-Logo</h1></Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link href="#">Menu1</Nav.Link>
          <Nav.Link href="#">Menu2</Nav.Link>
          <Nav.Link href="#">Menu3</Nav.Link>
        </Nav>

      </Navbar>
    );
  }
}

export default Header;