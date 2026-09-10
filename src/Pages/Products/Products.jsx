import ProductCard from '../../Components/ProductCard/ProductCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import './Products.css'
function Products(){
    const [products, setProducts] = useState([])
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')
    const searchQuery = searchParams.get('search')

    useEffect(() => {
        if (searchQuery) {  // if statement checking matching search query and product title
            axios.get('https://fakestoreapi.com/products')
                .then(response => {
                    const filtered = response.data.filter(p =>
                        p.title.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    setProducts(filtered)
                })
        }
        else{
            const url = category
                ? `https://fakestoreapi.com/products/category/${category}`
                : `https://fakestoreapi.com/products`
    
            axios.get(url)
                .then(response => setProducts(response.data))
                .catch(error => console.log(error))
        }
    }, [category,searchQuery])
    return (
        <>
            <h2 className="category-heading">
                { searchQuery ? `Results for "${searchQuery}"`
                : category ? category : 'All Products'}
            </h2>
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
        </>
    )
}
export default Products
