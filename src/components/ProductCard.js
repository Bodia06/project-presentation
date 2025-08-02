import { useCart } from '@/context/CartContext'

export default function ProductCard({ product }) {
	const { ProductName, ProductPrice, ProductImgUrl } = product
	const { addToCart } = useCart()

	return (
		<>
			<div className='w-full h-[450px] overflow-hidden  mb-[20px]'>
				<img
					className='object-cover object-top w-full h-full border-[1px_solid_black]'
					src={ProductImgUrl}
					alt={ProductName}
				></img>
			</div>
			<div className='flex flex-col items-center justify-center gap-[10px] mb-[10px]'>
				<h2 className='text-[25px] font-[600]'>{ProductName}</h2>
				<p className='text-[17px] font-[500]'>{`${ProductPrice} zł`}</p>
			</div>
			<button
				className='p-[10px] border-[1px] rounded-[10px] bg-green-400 mb-[10px] cursor-pointer hover:bg-green-500'
				onClick={() => addToCart(product)}
			>
				Dodaj do koszyka
			</button>
		</>
	)
}
