import React, { useEffect, useState } from 'react'
import '../styles/navbar.css'
import navLogo from '../img/medical1.png'

import { Link,useLocation } from 'react-router-dom'

const Navbar=()=>{

    const [logoutRoute,setLogOutRoute]=useState('#')

    const location=useLocation().pathname
    
    useEffect(()=>{
        if(location.substr(0,5)==='/user')
        {
            setLogOutRoute('/user/logout')
            return
        }
        else if(location.substr(0,9)==='/hospital')
        {
            setLogOutRoute('/hospital/logout')
            return
        }
        setLogOutRoute('#')
        
    },[location])

    return (
        <div id="containers" data-target="#Navbar">
    <nav className="navbar smart-scroll navbar-expand-lg navbar-light fixed-top" id="Navbar">
        <Link to="/" className="navbar-brand"><img id="logo" src={navLogo} /></Link>

        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#collapsibleNavbar"
            id="button1"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className=" nav navbar-nav mr-auto">
                <li className="nav-item"><a className="nav-link" href="/" id="homeOpt">HOME<span
                            className="sr-only">(current)</span></a></li>
                <li className="nav-item"><a className="nav-link" href="/#services">ABOUT US</a></li>
                <li className="nav-item"><a className="nav-link" href="/#service">SERVICES</a></li>
                <li className="nav-item"><a className="nav-link" href="/#contact">CONTACT US</a></li>
                <li className="nav-item dropdown">
                    <a className="nav-link" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      LOGIN
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style={{width: "unset !important", overflow: "hidden"}}>
                      <Link to="/user/login" className="dropdown-item">Patient</Link>
                      <Link to="/hospital/login" className="dropdown-item">Hospital</Link>
                    </div>
                  </li>
                {/* <li class="nav-item"><a class="nav-link" href="/user/logout">LOGOUT</a></li> */}
                <li className="nav-item"><Link className="nav-link" to={logoutRoute}>LOGOUT</Link></li>
            </ul>
        </div>
    </nav>
</div>
    )
}

export default Navbar