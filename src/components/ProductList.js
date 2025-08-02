import ProductCard from './ProductCard'

export default function ProductList({ products }) {
	return (
		<ul className='flex  gap-[30px] mb-[120px] p-[10px] flex-wrap justify-center'>
			{products.map((product) => (
				<li
					key={product.productCod}
					className='flex flex-col max-w-[550px] min-w-[500px] justify-center items-center overflow-hidden  rounded-[20px] shadow-[0_0_5px_black]'
				>
					<ProductCard product={product} />
				</li>
			))}
		</ul>
	)
}
