import React from "react"
import "../styles/footer.css"
import footerLogo from "../img/medical1.png"

const Footer=()=>{
    return (
    <footer className="footer">
    <div className="footer-left col-md-4 col-sm-12">
        <div className="about">
            <span>
                <h2> About Arogya</h2>
            </span> 
            <p>Ut congue augue non tellus bibendum, in varius tellus condimentum. In
            scelerisque nibh tortor, sed rhoncus odio condimentum in. Sed sed est ut sapien ultrices eleifend.
            nibh mollis, tristique ante sed, viverra massa.
            </p>
        </div>
        <div className="icons">
            <a href="#"><i className="fa fa-facebook"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
            <a href="#"><i className="fa fa-linkedin"></i></a>
            <a href="#"><i className="fa fa-google-plus"></i></a>
            <a href="#"><i className="fa fa-instagram"></i></a>
        </div>
    </div>
    <div className="footer-center footer-align col-md-4 col-sm-12">
        <div>
            <i className="fa fa-map-marker"></i>
            <p><span> Silchar</span> Assam,India</p>
        </div>
        <div>
            <i className="fa fa-phone"></i>
            <p> (+91) 0000 000 000</p>
        </div>
        <div>
            <i className="fa fa-envelope"></i>
            <p><a href="#"> arogya@gmail.com</a></p>
        </div>
    </div>
    <div className="footer-right col-md-4 col-sm-12">
        <h2>Arogya<span> <img width="20%" height="20%" src={footerLogo} alt=""/></span></h2>
        <p className="menu">
            <a href="#"> Home</a> |
            <a href="#services"> About</a> |
            <a href="#"> Members</a> |
            <a href="#contact"> Contact</a>
        </p>
    </div>
    </footer>
    )
        

}

export default Footer