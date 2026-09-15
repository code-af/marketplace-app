import React,{ useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import ProductCard from "../../Components/ProductCard/ProductCard";
import './ProductDetail.css'

function ProductDetail(){
    const [product, setProduct] = useState(null)
    const [similarProducts, setSimilarProducts] = useState([])
    const [error, setError] = useState('')
    const { id } = useParams()
    useEffect(() => {  // fetching from fakestore , also from firestore database
        setProduct(null)
        const fetchFromFirestore = () => {  // declaring function to fetch from firestore database
            getDoc(doc(db, 'listings', id))
                .then(docSnap => {
                    if (docSnap.exists()) {
                        setProduct({
                            id: docSnap.id,
                            ...docSnap.data(),
                            image: docSnap.data().imageUrl
                        })
                    }
                })
            .catch(error => setError("Firestore Error : ", error.message))
        }
        if (/^\d+$/.test(id)) {  // checking if our id is numerical, fetch from fakestore
            axios.get(`https://fakestoreapi.com/products/${id}`)
                .then(response => {
                    setProduct(response.data)
                })
                .catch(error => setError("Firestore Error : ", error.message))
        } else {  // if our id isn't numerical then call the function declared in line 16
            fetchFromFirestore()
        }
    }, [id])
    useEffect(() => {  // setting similar products from fakestore api endpoint and firestore db
        if (product) {
            axios.get(`https://fakestoreapi.com/products/category/${product.category}`)
                .then(response => {
                    const filtered = response.data.filter(p => p.id !== product.id)
                    getDocs(query(
                        collection(db, 'listings'),
                        where('category', '==', product.category)
                    )).then(snapshot => {
                        const firestoreItems = []
                        snapshot.forEach(doc => {
                            if (doc.id !== id) {
                                firestoreItems.push({
                                    id: doc.id,
                                    ...doc.data(),
                                    image: doc.data().imageUrl
                                })
                            }
                        })
                    setSimilarProducts([...filtered, ...firestoreItems])
                })
            })
        }
    }, [product])
    useEffect(()=>{
        setTimeout(()=>{
            window.scrollTo({top:0, behavior:"smooth"})
        },300)
    },[id])
    
    if(!product) return <>
    <span className="loader"></span>
    <p className="loading-screen">Loading...</p></>

return (
    <div className="product-detail">
        {/* Container 1 — Image and Info */}
        <div className="detail-top">
            <div className="detail-images">
                <div className="preview-images">
                    <img src={product.image} alt="preview" />
                    <img src={product.image} alt="preview" />
                    <img src={product.image} alt="preview" />
                </div>
                <img className="main-image" src={product.image} alt={product.title} />
            </div>
            <div className="detail-info">
                <h1>{product.title}</h1>
                <p className="detail-price">${product.price}</p>
                {product.rating && (<p>⭐ {product.rating.rate} {product.rating.count} reviews</p>)}
                {<p>Sold by: (<strong>{product.sellerName ? product.sellerName : 'eBuy Store'}</strong>)</p>}
                <p>✅ Free delivery by Tomorrow</p>
                {product.rating && (<p>📦 In Stock ({product.rating.count} sold)</p>)}
                <div className="detail-buttons">
                    <button className="buy-btn">Buy Now</button>
                    <button className="cart-btn">Add to Cart</button>
                    <button className="wish-btn">♡Add to Wishlist</button>
                </div>
            </div>
        </div>
        {/* Container 2 — Specifics and Description */}
        <div className="detail-bottom">
            <div className="item-specifics">
                <h2>Item Specifics</h2>
                <p><strong>Category:</strong> {product.category}</p>
                {product.rating && (<p><strong>Rating:</strong> {product.rating.rate} / 5</p>)}
                {product.rating && (<p><strong>Reviews:</strong> {product.rating.count}</p>)}
                <p><strong>Condition:</strong> New</p>
            </div>
            <div className="item-description">
                <h2>Description</h2>
                <p>{product.description}</p>
            </div>
        </div>
        {/* Container 3 — Similar Products */}
        <div className="similar-products">
            <h2>Explore Similar Products</h2>
            <div className="similar-cards">
                {similarProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    </div>
)
}
export default ProductDetail