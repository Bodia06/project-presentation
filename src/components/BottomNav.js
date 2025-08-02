'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { useRouter } from 'next/navigation'
import UserIcon from '@/images/userIcon'
import { useCart } from '@/context/CartContext'

export default function BottomNav() {
	const router = useRouter()
	const [user, setUser] = useState(null)
	const { cart, remove, increase, decrease, clearCart, totalQuantity } =
		useCart()

	useEffect(() => {
		const unregistration = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser)
		})
		return () => unregistration()
	}, [])

	const goToAccountUser = () => {
		router.push('/profile')
	}

	return (
		<footer className='w-full h-[100px] fixed bottom-0 bg-gray-800'>
			<nav className='w-full h-full p-4 flex items-center'>
				<ul className='w-full flex items-center justify-center gap-8 text-white text-lg font-semibold'>
					<li>
						<Link
							className='hover:text-yellow-400 transition-colors duration-300'
							href='/'
						>
							Strona główna
						</Link>
					</li>
					<li className='flex items-center gap-[10px]'>
						<Link
							className='hover:text-yellow-400 transition-colors duration-300'
							href='/cart'
						>
							Koszyk{' '}
						</Link>
						{totalQuantity < 1 ? (
							''
						) : (
							<span className='flex justify-center items-center w-[50px] h-[50px] border-[1px] border-yellow-400 border-solid rounded-[100%]'>
								{totalQuantity}
							</span>
						)}
					</li>
					{user ? (
						<div className='flex gap-[20px] flex-row-reverse items-center'>
							<li className='flex flex-col items-center border-[1px] border-yellow-400'>
								<UserIcon
									onClick={goToAccountUser}
									className='w-6 h-6 text-white cursor-pointer'
								/>
							</li>
						</div>
					) : (
						<li>
							<Link
								className='hover:text-yellow-400 transition-colors duration-300'
								href='/login'
							>
								Logowanie
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</footer>
	)
}
