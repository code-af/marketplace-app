import React,{ useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import ProductCard from "../../Components/ProductCard/ProductCard";
import './ProductDetail.css'

function ProductDetail(){
    const [product, setProduct] = useState(null)
    const [similarProducts, setSimilarProducts] = useState([])
    const { id } = useParams()
    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.log(error))
    }, [id])
    useEffect(() => {
        if (product) {
            axios.get(`https://fakestoreapi.com/products/category/${product.category}`)
                .then(response => {
                    const filtered = response.data.filter(p => p.id !== product.id)
                    setSimilarProducts(filtered)
                })
        }
    }, [product])
    useEffect(()=>{
        setTimeout(()=>{
            window.scrollTo({top:0, behavior:"smooth"})
        },300)
    },[id])
    
    if(!product) return <p>Loading...</p>

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
                <p>⭐ {product.rating.rate} ({product.rating.count} reviews)</p>
                <p>Sold by: <strong>eBuy Store</strong></p>
                <p>✅ Free delivery by Tomorrow</p>
                <p>📦 In Stock ({product.rating.count} sold)</p>
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
                <p><strong>Rating:</strong> {product.rating.rate} / 5</p>
                <p><strong>Reviews:</strong> {product.rating.count}</p>
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