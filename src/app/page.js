'use client'
import BottomNav from '@/components/BottomNav'
import ProductList from '@/components/ProductList'
import { productInitializer, takeProductsData } from '@/firebase/config'
import { useEffect, useState } from 'react'
import { PRODUCTS } from '@/data/product'

export default function Home() {
	const [products, setProducts] = useState([])

	useEffect(() => {
		productInitializer(PRODUCTS)
	}, [])

	useEffect(() => {
		const load = async () => {
			const data = await takeProductsData()
			setProducts(data)
		}
		load()
	}, [])

	return (
		<>
			<BottomNav />
			<ProductList products={products} />
		</>
	)
}
