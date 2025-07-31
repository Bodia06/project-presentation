'use client'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from '@/firebase/config'

export default function LoginPage() {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)

	const handleLogin = async (e) => {
		e.preventDefault()
		try {
			await signInWithEmailAndPassword(auth, email, password)
			router.push('/')
		} catch {
			setError('Nieprawidłowy email lub hasło')
		}
	}

	const goToRegistration = () => {
		router.push('/registration')
	}

	return (
		<div className='max-w-sm mx-auto mt-20 p-6 border rounded shadow'>
			<h2 className='text-xl font-bold mb-4'>Logowanie</h2>
			<form onSubmit={handleLogin} className='space-y-4'>
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
				<button
					type='submit'
					className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700'
				>
					Zaloguj się
				</button>
				<button
					onClick={goToRegistration}
					className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700'
				>
					Zarejestruj konto
				</button>
			</form>
		</div>
	)
}
