import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { User } from "../models/user";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import NavBarLoggedInView from "./NavBarLogggedInView";
import styles from "../styles/NavBar.module.css";

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
                        className={styles.logo}
                    />{' '}
                    <h4>Sticky Notes</h4>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto d-flex align-items-center">
                        <Button className="d-flex align-items-center me-3" onClick={onThemeClick}>
                            {isDarkMode
                                ? <> <div className="me-2">Light Mode</div> <MdLightMode className={styles.modeIcon} /> </>
                                : <> <div className="me-2">Dark Mode</div> <MdDarkMode className={styles.modeIcon} /> </>}
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