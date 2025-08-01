'use client'

import ProductList from '@/components/ProductList'
import { productInitializer, takeProductsData } from '@/firebase/config'
import { useEffect, useState } from 'react'
import { PRODUCTS } from '@/data/product'

export default function Home() {
	const [products, setProducts] = useState([])

	useEffect(() => {
		const initializeAndLoad = async () => {
			await productInitializer(PRODUCTS)
			const data = await takeProductsData()
			setProducts(data)
		}

		initializeAndLoad()
	}, [])

	return (
		<>
			<ProductList products={products} />
		</>
	)
}
