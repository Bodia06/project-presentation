'use client'

import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)

	const handleRegister = async (e) => {
		e.preventDefault()
		try {
			await createUserWithEmailAndPassword(auth, email, password)
			alert('Twoje konto udało się zarejestrować')
			router.push('/login')
		} catch (err) {
			setError(err.message)
		}
	}

	return (
		<div className='max-w-sm mx-auto mt-20 p-6 border rounded shadow'>
			<h2 className='text-xl font-bold mb-4'>Logowanie</h2>
			<form onSubmit={handleRegister} className='space-y-4'>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className='w-full p-2 border rounded'
				/>
				<input
					type='password'
					placeholder='Hasło'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className='w-full p-2 border rounded'
				/>
				{error && <p className='text-red-500 text-sm'>{error}</p>}
				<button className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700'>
					Zarejestruj się
				</button>
			</form>
		</div>
	)
}
