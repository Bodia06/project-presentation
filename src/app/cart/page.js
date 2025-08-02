'use client'
import { useCart } from '@/context/CartContext'

export default function CartSummary() {
	const { cart, remove, increase, decrease, clearCart, totalQuantity } =
		useCart()

	const totalPrice = cart.reduce(
		(acc, item) => acc + item.quantity * item.ProductPrice,
		0
	)

	if (cart.length === 0) {
		return (
			<div className='text-center py-20'>
				<h2 className='text-2xl font-semibold text-gray-600'>
					Twój koszyk jest pusty.
				</h2>
			</div>
		)
	}

	return (
		<div className='max-w-4xl mx-auto p-6 space-y-8'>
			<h2 className='text-4xl font-bold text-gray-800 text-center'>
				Twój koszyk
			</h2>

			<div className='bg-white shadow-md rounded-2xl p-6 space-y-4'>
				<h3 className='text-2xl font-semibold text-gray-700 border-b pb-2'>
					Produkty
				</h3>
				<ul className='divide-y'>
					{cart.map((product) => (
						<li
							key={product.productCod}
							className='py-4 flex flex-col md:flex-row md:items-center justify-between'
						>
							<div>
								<p className='text-lg font-medium text-gray-800'>
									{product.ProductName}
								</p>
								<p className='text-gray-600 text-sm'>
									{product.ProductPrice} zł × {product.quantity}
								</p>
							</div>
							<div className='mt-3 md:mt-0 flex space-x-2'>
								<button
									onClick={() => decrease(product.productCod)}
									className='w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded'
								>
									–
								</button>
								<button
									onClick={() => increase(product.productCod)}
									className='w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded'
								>
									+
								</button>
								<button
									onClick={() => remove(product.productCod)}
									className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition'
								>
									Usuń
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>

			<div className='bg-gray-100 rounded-2xl p-6 shadow-inner space-y-3'>
				<h3 className='text-xl font-semibold text-gray-700 mb-2'>
					Podsumowanie zamówienia
				</h3>
				<div className='flex justify-between text-gray-700'>
					<span>Ilość produktów:</span>
					<span>{totalQuantity}</span>
				</div>
				<div className='flex justify-between font-semibold text-gray-800 text-lg'>
					<span>Do zapłaty:</span>
					<span>{totalPrice.toFixed(2)} zł</span>
				</div>
			</div>

			<div className='text-right'>
				<button
					onClick={clearCart}
					className='px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition'
				>
					Wyczyść koszyk
				</button>
			</div>
		</div>
	)
}
