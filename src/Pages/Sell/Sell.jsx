import { useState, useEffect } from 'react'
import { collection, addDoc, doc, getDoc } from 'firebase/firestore'
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
            getDoc(doc(db, 'users', currentUser.uid))
                .then(docSnap => {
                    if (docSnap.exists()) setUserData(docSnap.data())
                })
        }
    }, [currentUser])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title || !price || !category || !description || !imageUrl) {
            setError('Please fill in all fields')
            return
        }
        addDoc(collection(db, 'listings'), {
            title,
            price: Number(price),
            category,
            description,
            imageUrl,
            sellerName: `${userData.firstName} ${userData.lastName}`,
            uid: currentUser.uid,
            createdAt: new Date().toDateString()
        })
            .then(() => {
                setSuccessMsg('Listing posted successfully!')
                setError('')
                setTimeout(() => navigate('/'), 2000)
            })
            .catch(error => {
                setError(error.message)
            })
    }
    return (
        <div className="sell-page">
            <h1>Post a Listing</h1>
            <form className="sell-form" onSubmit={handleSubmit}>

                <label>Title</label>
                <input type="text" placeholder="What are you selling?" value={title}
                    onChange={(e) => setTitle(e.target.value)}/>

                <label>Price</label>
                <input type="number" placeholder="Enter price" value={price}
                    onChange={(e) => setPrice(e.target.value)}/>

                <label>Category</label>
                <select value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select a category</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>

                <label>Description</label>
                <textarea placeholder="Describe your item..." value={description}
                    onChange={(e) => setDescription(e.target.value)} rows={5}/>

                <label>Image URL</label>
                <input type="text" placeholder="Paste image URL here" value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}/>
                {imageUrl && ( 
                    <div className="image-preview">
                        <img src={imageUrl} alt="preview" />
                    </div>
                )}
                {successMsg && <p className="success-msg">{successMsg}</p>}
                {error && <p className="error-msg">{error}</p>}
                <button type="submit">Post Listing</button>
            </form>
        </div>
    )
}
export default Sell