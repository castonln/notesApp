import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { User } from "../models/user";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import NavBarLoggedInView from "./NavBarLogggedInView";

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
                <Navbar.Brand as={Link} to={"/"} className="d-flex align-items-center text-white">
                    <img
                        alt=""
                        src={require("../logo.png")}
                        width="40"
                        height="40"
                        className="d-inline-block align-middle me-2"
                    />{' '}
                    <h4>Sticky Notes</h4>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto d-flex align-items-center">
                        <Button className="d-flex align-items-center me-3" onClick={onThemeClick}>
                            {isDarkMode
                                ? <> <div className="me-2">Light Mode</div> <MdLightMode /> </>
                                : <> <div className="me-2">Dark Mode</div> <MdDarkMode /> </>}
                        </Button>
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