import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import { useUsers } from "./store/Users"
import { useNavigate } from "react-router-dom"

function NavBar() {
  const { doSignOut, isSignedIn } = useUsers()
  const navigate = useNavigate()
  // console.log(localStorage.getItem("current_user"))
  const currentUser = JSON.parse(localStorage.getItem("current_user") || '{}')
  // console.log(currentUser)

  const handleSignOut = () => {
    doSignOut()
    navigate('/')

  }

  const capitalizeFirstLetter = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">Postify</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Posts" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/posts">All posts</NavDropdown.Item>
              <NavDropdown.Item href="/new">New post</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav>
          {isSignedIn.current && (
            <Navbar.Text className="me-2">
              Welcome, {capitalizeFirstLetter(currentUser.name)} ✨
            </Navbar.Text>
          )}
          {isSignedIn.current && (
            <Button
              className="me-2"
              type="button"
              variant="outline-danger"
              onClick={handleSignOut}
            >
              Log out
            </Button>
          )}
          {!isSignedIn.current && (
            <Button
              className="me-2"
              type="button"
              variant="outline-success"
              onClick={() => {
                navigate("/sign_in")
              }}
            >
              Log in
            </Button>
          )}
          {!isSignedIn.current && (
            <Button
              className="me-2"
              type="button"
              variant="outline-success"
              onClick={() => {
                navigate("/sign_up")
              }}
            >
              Register
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
