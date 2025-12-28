import './Navbar.css'
import logo from '../../Assets/Frontend_Assets/logo.png'
import cart_icon from '../../Assets/Frontend_Assets/cart_icon.png'


function Navbar() {
  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="Logo" />
        <p>Shopper</p>
      </div>
      <ul className="nav-menu">
        <li>home</li>
        <li>men</li>
        <li>women</li>
        <li>kids</li>
        
      </ul>
     <div className="nav-login-cart"></div>
     <button>Login</button>
     <img src = {cart_icon} alt="cart" />
     <div className="nav-cart-count">0</div>
    </div>
  )
}

export default Navbar