import { useState, useEffect } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuth } from '../../context/Authcontext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Sell.css'
function Sell(){
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [categories, setCategories] = useState([])
    const [successMsg, setSuccessMsg] = useState('')
    const [error, setError] = useState('')
    const [userData, setUserData] = useState(null)
    const { currentUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {  // redirect if current user isn't logged in
        if (!currentUser) navigate('/login')
    }, [currentUser])
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products/categories')
            .then(response => setCategories(response.data))
    }, [])
    useEffect(() => {
        if (currentUser) {
            import { doc, getDoc } from 'firebase/firestore'
            getDoc(doc(db, 'users', currentUser.uid))
                .then(docSnap => {
                    if (docSnap.exists()) setUserData(docSnap.data())
                })
        }
    }, [currentUser])
    
    return <h1>Sell</h1>
}
export default Sell