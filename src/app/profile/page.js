'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { useRouter } from 'next/navigation'

export default function ProfileUser() {
	const router = useRouter()
	const [email, setEmail] = useState('')

	useEffect(() => {
		const registration = onAuthStateChanged(auth, (user) => {
			if (user) {
				setEmail(user.email)
			} else {
				setEmail(null)
			}
		})

		return () => registration()
	}, [])

	const handleLogout = async () => {
		await signOut(auth)
		router.push('/')
		setUser(null)
	}

	return (
		<div className='max-w-md w-full min-w-[350px]'>
			<div className=''>
				<h1 className=''>{`Witaj, ${email}`}</h1>
				<button
					onClick={handleLogout}
					className='mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-300 w-full'
				>
					Wyloguj się
				</button>
			</div>
		</div>
	)
}
