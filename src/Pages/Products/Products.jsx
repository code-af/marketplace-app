import ProductCard from '../../Components/ProductCard/ProductCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import './Products.css'
function Products(){
    const [products, setProducts] = useState([])
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')

    useEffect(() => {
        const url = category
            ? `https://fakestoreapi.com/products/category/${category}`
            : `https://fakestoreapi.com/products`

        axios.get(url)
            .then(response => setProducts(response.data))
            .catch(error => console.log(error))
    }, [category])
    return (
        <>
            <h2 className="category-heading">
                {category ? category : 'All Products'}
            </h2>
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
        </>
    )
}
export default Products
