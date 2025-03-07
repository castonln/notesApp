import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";

interface NavBarLoggedInViewProps {
    user: User,     // not or null this time cause user has to be logged in
    onLogoutSuccessful: () => void,
}

const NavBarLoggedInView = ({ user, onLogoutSuccessful}: NavBarLoggedInViewProps) => {
    async function logout() {
        try {
            await NotesApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            alert(error);
            console.error(error);
        }
    }
    
    return (  
        <>
            <Navbar.Text className="me-2 text-white">
                Signed in as: {user.username}
            </Navbar.Text>
            <Button onClick={logout}>Log out</Button>
        </>
    );
}
 
export default NavBarLoggedInView;