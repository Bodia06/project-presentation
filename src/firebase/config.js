import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase, ref, set, get, child } from 'firebase/database'

const firebaseConfig = {
	apiKey: 'AIzaSyCvZDG2jB5BwX12iNcN201GNIwwon5utzk',
	authDomain: 'project-presentation-6094d.firebaseapp.com',
	databaseURL:
		'https://project-presentation-6094d-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'project-presentation-6094d',
	storageBucket: 'project-presentation-6094d.firebasestorage.app',
	messagingSenderId: '73452059242',
	appId: '1:73452059242:web:c0a13e1ed7d5310cda6813',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app)

function writeProductData(productCod, name, price, imageUrl) {
	set(ref(db, 'products/' + productCod), {
		ProductName: name,
		ProductPrice: price,
		ProductImgUrl: imageUrl,
	})
}

function productInitializer(pr) {
	pr.forEach(async (product) => {
		try {
			const snapshot = await get(
				child(ref(db), `products/${product.productCod}`)
			)
			if (!snapshot.exists()) {
				writeProductData(
					product.productCod,
					product.name,
					product.price,
					product.imageUrl
				)
				console.log(`Product "${product.name}" added`)
			} else {
				console.log(`Product "${product.name}" already exists`)
			}
		} catch (error) {
			console.error('Error checking product existence:', error)
		}
	})
}

async function takeProductsData() {
	try {
		const snapshot = await get(ref(db, 'products'))

		if (snapshot.exists()) {
			const data = snapshot.val()
			const products = Object.keys(data).map((key) => ({
				productCod: key,
				...data[key],
			}))
			return products
		} else {
			console.warn('No data found in Firebase')
			return []
		}
	} catch (err) {
		console.error('Error reading data:', err)
		return []
	}
}

export { auth, productInitializer, takeProductsData }
