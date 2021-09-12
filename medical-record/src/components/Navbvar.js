import React from 'react'
import '../styles/navbar.css'
import navLogo from '../img/medical1.png'

import { Link } from 'react-router-dom'

const Navbar=()=>{
    return (
        <div id="containers" data-target="#Navbar">
    <nav class="navbar smart-scroll navbar-expand-lg navbar-light fixed-top" id="Navbar">
        <Link to="/" className="navbar-brand"><img id="logo" src={navLogo} /></Link>

        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#collapsibleNavbar"
            id="button1"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class=" nav navbar-nav mr-auto">
                <li class="nav-item"><a class="nav-link" href="/" id="homeOpt">HOME<span
                            class="sr-only">(current)</span></a></li>
                <li class="nav-item"><a class="nav-link" href="/#services">ABOUT US</a></li>
                <li class="nav-item"><a class="nav-link" href="/#service">SERVICES</a></li>
                <li class="nav-item"><a class="nav-link" href="/#contact">CONTACT US</a></li>
                <li class="nav-item dropdown">
                    <a class="nav-link" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      LOGIN
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style={{width: "unset !important", overflow: "hidden"}}>
                      <Link to="/user/login" className="dropdown-item">Patient</Link>
                      <Link to="/hospital/login" className="dropdown-item">Hospital</Link>
                    </div>
                  </li>
                {/* <li class="nav-item"><a class="nav-link" href="/user/logout">LOGOUT</a></li> */}
                <li className="nav-item"><Link className="nav-link" to="/user/logout">LOGOUT</Link></li>
            </ul>
        </div>
    </nav>
</div>
    )
}

export default Navbar