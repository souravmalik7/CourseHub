/*=======================================================
 Author: [Abhishek Pareshbhai Pethani] (ab823206@dal.ca)
 Author: [Aditya Bakshi] (aditya.bakshi@dal.ca)
========================================================= */
import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarComp = () => {
  const userId = localStorage.getItem("logged_in_user");
  const [isAdmin, setAdmin] = useState(
    (localStorage.getItem("isAdmin") || "false") === "true"
  );

  return (
    <div>
      {!isAdmin && (
        <div>
          <Navbar
            style={{ backgroundColor: "#3f51b5" }}
            variant={"dark"}
            ForgotPassword
            expand="lg"
          >
            <Container fluid>
              <Navbar.Brand as={Link} to={"/home"}>
                CourseHub
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link style={{ color: "white" }} as={Link} to={"/home"}>
                    {" "}
                    Home{" "}
                  </Nav.Link>
                  {/* <Nav.Link disabled="true"
                    style={{ color: "white" }}
                    as={Link}
                    to={"/my-courses"}
                  >
                    {" "}
                    My Courses{" "}
                  </Nav.Link> */}
                  <Nav.Link
                    style={{ color: "white" }}
                    as={Link}
                    to={"/my-account"}
                  >
                    {" "}
                    My Account{" "}
                  </Nav.Link>
                  <Nav.Link
                    style={{ color: "white" }}
                    as={Link}
                    to={"/discount"}
                  >
                    {" "}
                    Discounts{" "}
                  </Nav.Link>
                  <Nav.Link style={{ color: "white" }} as={Link} to={"/discussion"}>
                    {" "}
                    Discussion Forum{" "}
                  </Nav.Link>
                  {/* <Nav.Link
                    style={{ color: "white" }}
                    as={Link}
                    to={"/authenticate/login"}
                  >
                    {" "}
                    Login{" "}
                  </Nav.Link> */}
                  <Nav.Link style={{ color: "white" }} as={Link} to={"/order"}>
                    {" "}
                    My Orders{" "}
                  </Nav.Link>
                  <Nav.Link style={{ color: "white" }} as={Link} to={"/wishlist"}>
                    {" "}
                    Wishlist{" "}
                  </Nav.Link>
                  <Nav.Link style={{ color: "white" }} as={Link} to={"/cart"}>
                    {" "}
                    Cart{" "} 
                  </Nav.Link>

                  {userId !== '' && <Nav.Link style={{ color: "white" }} as={Link} to={"/logout"}>
                    {" "}
                    Logout{" "}
                  </Nav.Link> }
                  {userId === '' && <Nav.Link style={{ color: "white" }} as={Link} to={"/login"}>
                    {" "}
                    Login{" "}
                  </Nav.Link>}
                  {/* <Nav.Link
                    style={{ color: "white" }}
                    as={Link}
                    to={"/authenticate/register"}
                  >
                    {" "}
                    Register{" "}
                  </Nav.Link> */}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      )}
    </div>
  );
};

export default NavbarComp;
