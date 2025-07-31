import Link from 'next/link'

export default function BottomNav() {
	return (
		<header className='w-full h-[100px] mb-[40px] bg-gray-800'>
			<nav className='w-full h-full p-4 flex items-center'>
				<ul className='w-full flex justify-center gap-8 text-white text-lg font-semibold'>
					<li>
						<Link
							className='hover:text-yellow-400 transition-colors duration-300'
							href='/'
						>
							Strona główna
						</Link>
					</li>
					<li>
						<Link
							className='hover:text-yellow-400 transition-colors duration-300'
							href='/koszyk'
						>
							Koszyk
						</Link>
					</li>
					<li>
						<Link
							className='hover:text-yellow-400 transition-colors duration-300'
							href='/logowanie'
						>
							Logowanie
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}
