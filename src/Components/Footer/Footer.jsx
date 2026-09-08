import React from "react";
import './Footer.css'
function Footer(){
    return (<>
        <footer className="footer">
            <div className="footer-top">
                <a href="#">About</a>
                <a href="#">Announcements</a>
                <a href="#">Community</a>
                <a href="#">Security</a>
                <a href="#">Seller Center</a>
                <a href="#">Policies</a>
                <a href="#">Affiliates</a>
                <a href="#">Product Safety Tips</a>
                <a href="#">Help & Contact</a>
                <a href="#">Site Map</a>
            </div>
            <a href="#" title="Scroll to Top"><button className="scroll-to-top-btn">⮝</button></a>
            <div className="footer-bottom">
                <p className="footer-copy">Copyright © 2026 eBuy. All rights reserved.
                    <a href="#">Accessibility</a>
                    <a href="#">User Agreement</a>
                    <a href="#">Privacy</a>
                    <a href="#">Consumer Health Data</a>
                    <a href="#">Payment Services</a>
                    <a href="#">Cookies</a>
                    <a href="#">Privacy Notice</a>
                    <a href="#">Privacy Choices</a> and 
                    <a href="#">Adchoice 🛈</a>
                </p>
            </div>
        </footer>
    </>)
}
export default Footer