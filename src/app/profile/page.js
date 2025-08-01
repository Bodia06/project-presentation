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
	}

	const handleGlobalPage = () => {
		router.push('/')
	}

	return (
		<div className='max-w-md w-full  min-w-[350px] h-screen m-auto flex justify-center items-center'>
			<div className='flex flex-col justify-center items-center gap-[10px] bg-gray-800 p-[40px] rounded-lg'>
				<h1 className='text-white font-[600] text-[24px]'>{`Witaj, ${email}`}</h1>
				<button
					onClick={handleLogout}
					className='mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-300 w-full'
				>
					Wyloguj się
				</button>
				<button
					onClick={handleGlobalPage}
					className='mt-4 bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded transition duration-300 w-full'
				>
					Powrót
				</button>
			</div>
		</div>
	)
}
