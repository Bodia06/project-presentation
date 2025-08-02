'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([])

	const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0)

	useEffect(() => {
		const storedCard = localStorage.getItem('cart')
		if (storedCard) {
			setCart(JSON.parse(storedCard))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	const addToCart = (product) => {
		setCart((prev) => {
			const existing = prev.find((p) => p.productCod === product.productCod)
			if (existing) {
				return prev.map((p) =>
					p.productCod === product.productCod
						? { ...p, quantity: p.quantity + 1 }
						: p
				)
			}
			return [...prev, { ...product, quantity: 1 }]
		})
	}

	const increase = (productCod) => {
		setCart((prev) =>
			prev.map((p) =>
				p.productCod === productCod ? { ...p, quantity: p.quantity + 1 } : p
			)
		)
	}

	const decrease = (productCod) => {
		setCart((prev) =>
			prev
				.map((p) =>
					p.productCod === productCod ? { ...p, quantity: p.quantity - 1 } : p
				)
				.filter((p) => p.quantity > 0)
		)
	}

	const remove = (productCod) => {
		setCart((prev) => prev.filter((p) => p.productCod !== productCod))
	}

	const clearCart = () => {
		setCart([])
		localStorage.removeItem('cart')
	}

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				increase,
				decrease,
				remove,
				clearCart,
				totalQuantity,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export const useCart = () => useContext(CartContext)
