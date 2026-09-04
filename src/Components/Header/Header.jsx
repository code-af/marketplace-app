import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/Authcontext'
import  logo from '../../assets/ebuy-icon.png'
import './Header.css'

function Header() {
    const [categories, setCategories] = useState([])
    const { currentUser } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
    axios.get('https://fakestoreapi.com/products/categories')
        .then(response => {
            setCategories(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])
    return(
        <>
            <header>
                {/* Top row */}
                <div className="header-top">
                    <div className="header-greeting">
                        {currentUser ? <span>Hi, {currentUser.email}!</span>
                            : <span>Hi! <a href="/login">Sign in</a> or <a href="/signup">register</a></span> }
                    </div>
                    <div className="header-top-right">
                        <span>Sell</span>
                        <span>Watchlist</span>
                        <span>My eBay</span>
                    </div>
                </div>
                {/* Bottom row */}
                <div className="header-bottom">
                    <a href="/"><img src={logo} alt="logo" /></a>
                    <div className="search-bar">
                        <select>
                            <option value="" disabled selected>Shop by Categories</option>
                            {categories.map((category, index) => (
                                <option key={index}>{category}</option>
                            ))}
                        </select>
                        <input type="text" placeholder="🔍 Search for anything" />
                        <button>Search</button>
                    </div>
                </div>
                <hr className="header-divider" />
            </header>
        </>
    )
}
    export default Header