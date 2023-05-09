import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
  <nav className={"navbar navbar-expand-lg fixed-top navbar-dark navbarPersonal"}>
    <div className='botonesNavbar'>
        <button className='botonNavbar botonPrincipalNavBar'><Link className='nav-link' to={"/products"}>3er Entrega Proyecto Final</Link></button>
        <button className='botonNavbar botonChatNavBar'><Link className='nav-link' to={"/chat"}>Chat</Link></button>
        <button className='botonNavbar botonRegistroNavBar'><Link className='nav-link' to={"/register"}>Registrarse</Link></button>
        <button className='botonNavbar botonLoginNavBar'><Link className='nav-link' to={"/login"}>Login</Link></button>

    </div>
</nav>
    );
}

export default Navbar;