import React from "react";
import { useNavigate } from 'react-router-dom'
import './ProductCard.css'

function ProductCard({ product }) {
    const navigate = useNavigate()
    return (
        <div 
            className="product-card"
            onClick={() => navigate(`/product/${product.id}`)}
        >
            <div className="product-image">
                <img src={product.image} alt={product.title} />
            </div>
            <div className="product-info">
                <h3>{product.title}</h3>
                <p className="product-price">${product.price}</p>
                <p className="product-rating">⭐ {product.rating.rate} ({product.rating.count} reviews)</p>
            </div>
        </div>
    )
}
export default ProductCard