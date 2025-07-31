import { PRODUCTS } from '@/data/product'
import ProductCard from './ProductCard'

export default function ProductList() {
	return (
		<ul className='flex gap-[30px] p-[10px]'>
			{PRODUCTS.map((product) => (
				<li
					key={product.name}
					className='flex flex-col max-w-[550px] min-w-[500px] justify-center items-center overflow-hidden  rounded-[20px] shadow-[0_0_5px_black]'
				>
					<ProductCard product={product} />
				</li>
			))}
		</ul>
	)
}
