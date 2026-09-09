import ProductCard from '../../Components/ProductCard/ProductCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
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
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
        </>
    )
}
export default Products
