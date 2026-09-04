import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/Authcontext";
import Header from "../../Components/Header/Header";
import './Home.css'
function Home(){
    const currentUser = useAuth()
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    return (
        <></>
    )
}
export default Home