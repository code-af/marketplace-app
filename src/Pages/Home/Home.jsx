import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/Authcontext";
import Header from "../../Components/Header/Header";
import banner1 from '../../assets/banner1.webp'
import banner2 from '../../assets/banner2.webp'
import banner3 from '../../assets/banner3.webp'
import banner4 from '../../assets/banner4.webp'
import './Home.css'
function Home(){
    const currentUser = useAuth()
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const banners = [banner1, banner2, banner3, banner4]
    const [currentSlide, setCurrentSlide] = useState(0)

    const bannerHeadings = [
    "Explore Today's Best Deals",
    "Shop the Latest Trends",
    "Unbeatable Offers Await",
    "Find What You're Looking For"]

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrentSlide(slide => slide === banners.length - 1 ? 0 : slide + 1)
        },3000)
        return () => clearInterval(interval)
    },[])
    return (
        <>
            <div className="banner">
                <h2 className="banner-heading">{bannerHeadings[currentSlide]}</h2>
                <img src={banners[currentSlide]} alt="banner" />
            </div>
        </>
    )
}
export default Home