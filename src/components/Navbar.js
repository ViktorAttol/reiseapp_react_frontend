import Button from "./Button";

const Navbar = ({isLoggedIn, logout}) => {
    return (
        <div className="Navbar">
            <h1>Node Reise App</h1>
            {isLoggedIn &&<Button text='Logout' onClick={logout}/>}
        </div>
    )
}
export default Navbar