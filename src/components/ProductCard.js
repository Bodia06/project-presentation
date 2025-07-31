export default function ProductCard({ product }) {
	const { name, price, imageUrl } = product
	return (
		<>
			<div className='w-full h-[500px] overflow-hidden  mb-[20px]'>
				<img
					className='object-cover object-top w-full h-full border-[1px_solid_black]'
					src={imageUrl}
					alt={name}
				></img>
			</div>
			<div className='flex flex-col items-center justify-center gap-[10px] mb-[10px]'>
				<h2 className='text-[25px] font-[600]'>{name}</h2>
				<p className='text-[17px] font-[500]'>{`${price} zł`}</p>
			</div>
			<button className='p-[10px] border-[1px] rounded-[10px] bg-green-400 mb-[10px] cursor-pointer hover:bg-green-500'>
				Dodaj do koszyka
			</button>
		</>
	)
}
