'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { takeProductsData } from '@/firebase/config'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

export default function ProductPage() {
	const router = useRouter()
	const { id } = useParams()
	const { addToCart } = useCart()
	const [product, setProduct] = useState(null)

	useEffect(() => {
		if (!id) return

		async function fetchProduct() {
			const products = await takeProductsData()
			const found = products.find((p) => p.productCod === id)
			setProduct(found)
		}

		fetchProduct()
	}, [id])

	if (!product) {
		return <div className='text-center mt-10'>Ładowanie produktu...</div>
	}

	const { ProductName, ProductPrice, ProductImgUrl } = product

	const handleClickReturn = () => {
		router.push('/')
	}
	return (
		<div className='max-w-4xl mx-auto p-6 mb-[120px]'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
				<img
					src={ProductImgUrl}
					alt={ProductName}
					className='w-full h-content object-cover rounded-lg shadow-md'
				/>

				<div className='flex flex-col justify-center gap-6'>
					<h1 className='text-3xl font-bold'>{ProductName}</h1>
					<p className='text-xl font-medium text-gray-700'>
						Cena: {ProductPrice} zł
					</p>
					<button
						className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition'
						onClick={() => addToCart(product)}
					>
						Dodaj do koszyka
					</button>
					<button
						className='p-[10px] border-[1px] rounded-[10px] bg-green-400 mb-[10px] cursor-pointer hover:bg-green-500'
						onClick={handleClickReturn}
					>
						Powrót
					</button>
				</div>
			</div>
		</div>
	)
}
