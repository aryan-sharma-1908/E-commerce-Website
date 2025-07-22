import React, {useState} from 'react'
import logo from '../../assets/logo.png'
import cart_icon from '../../assets/cart_icon.png'
import { Link } from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
  const [menu, setMenu] = useState('Shop');
  return (
    <div className='navbar '>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className="nav-menu">
        
        <li onClick={() => setMenu('Shop')} ><Link to='/'>Shop </Link>{menu === 'Shop' ? <hr/> : <></>}</li>
        
        
        <li onClick={() => setMenu('Men')} ><Link to='/men' >Men </Link>{menu === 'Men' ? <hr/> : <></>}</li>
        
        
        <li onClick={() => setMenu('Women')} ><Link to='/women' className='decoration-0'>Women </Link>{menu === 'Women' ? <hr/> : <></>}</li>
        
       
        <li onClick={() => setMenu('Kids')}> <Link to='/kids'>Kids </Link>{menu === 'Kids' ? <hr/> : <></>}</li>
        
      </ul>
      <div className="nav-login-cart ">
        <Link to='/login'>
        <button>Login</button>
        </Link>
        <Link to='/cart'>
        <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  )
}

export default Navbar
