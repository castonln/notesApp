import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { User } from "../models/user";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import NavBarLoggedInView from "./NavBarLogggedInView";
import { MdDarkMode, MdLightMode } from "react-icons/md";

interface NavBarProps {
    loggedInUser: User | null,  // could be logged in, could not
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
    onThemeClick: () => void,
    isDarkMode: boolean,
}

const NavBar = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful, onThemeClick, isDarkMode }: NavBarProps) => {
    return (
        <Navbar bg="primary" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to={"/"} className="text-white">
                    Cool Notes App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} to="/privacy" className="text-white">
                            Privacy
                        </Nav.Link>
                        <Button className="d-flex align-items-center" onClick={onThemeClick}>
                            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
                        </Button>
                    </Nav>
                    <Nav className="ms-auto">
                        {loggedInUser
                            ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />
                            : <NavBarLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} /> // prop drilling
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;