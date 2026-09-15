import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import {getDoc, doc} from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuth } from '../../context/Authcontext'
import  logo from '../../assets/ebuy-icon.png'
import './Header.css'

function Header() {
    const [categories, setCategories] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [userData, setUserData] = useState(null)
    const { currentUser } = useAuth()
    const navigate = useNavigate()
    const handleSearch = () => {
        if (!searchQuery.trim()) return
        navigate(`/products?search=${searchQuery}`)
        setSearchQuery('')
    }

    useEffect(() => {
    axios.get('https://fakestoreapi.com/products/categories')
        .then(response => {
            setCategories(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])
    useEffect(()=>{
        if (currentUser) {
            getDoc(doc(db, 'users', currentUser.uid))
                .then(docSnap => {
                    if (docSnap.exists()) {
                        setUserData(docSnap.data())
                    }
                })
        }
    },[currentUser])
    return(
        <>
            <header>
                {/* Top row */}
                <div className="header-top">
                    <div className="header-greeting">
                        {userData ? <span>Hi, {userData.firstName} {userData.lastName} !</span>
                            : <span>Hi! <a href="/login">Sign in</a> or <a href="/signup">register</a></span> }
                    </div>
                    <div className="header-top-right">
                        <span onClick={()=>navigate('/sell')}>Sell</span>
                        <span>Watchlist</span>
                        <span onClick={()=>navigate('/profile')}>My eBuy</span>
                    </div>
                </div>
                {/* Bottom row */}
                <div className="header-bottom">
                    <a href="/"><img src={logo} alt="logo" /></a>
                    <div className="search-bar">
                        <div className="category-panel" onMouseLeave={()=>setIsOpen(false)}>
                            <span onClick={() => setIsOpen(!isOpen)}>
                                Shop by Category ▾
                            </span>
                            {isOpen && (
                                <div className="category-popup">
                                    <p onClick={()=>{
                                        navigate('/products')
                                        setIsOpen(false)}}>All Categories</p>
                                    {categories.map((category, index) => (
                                        <p key={index} onClick={() => {
                                            navigate(`/products?category=${category}`)
                                            setIsOpen(false)}}>
                                            {category}
                                        </p>
                                    ))}
                                </div>
                            )}
                    </div>
                        <input type="text" placeholder="🔍 Search for anything" 
                        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e)=> e.key=== 'Enter' && handleSearch()}/>
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </div>
                <hr className="header-divider" />
            </header>
        </>
    )
}
    export default Header