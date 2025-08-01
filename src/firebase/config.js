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

async function productInitializer(localProducts) {
	try {
		const snapshot = await get(ref(db, 'products'))
		const dbProducts = snapshot.exists() ? snapshot.val() : {}

		const localProductsMap = {}
		localProducts.forEach((p) => {
			localProductsMap[p.productCod] = p
		})

		for (const localProduct of localProducts) {
			const dbProduct = dbProducts[localProduct.productCod]
			if (
				!dbProduct ||
				dbProduct.ProductName !== localProduct.name ||
				dbProduct.ProductPrice !== localProduct.price ||
				dbProduct.ProductImgUrl !== localProduct.imageUrl
			) {
				await set(ref(db, 'products/' + localProduct.productCod), {
					ProductName: localProduct.name,
					ProductPrice: localProduct.price,
					ProductImgUrl: localProduct.imageUrl,
				})
				console.log(`Product "${localProduct.name}" added or updated`)
			}
		}

		for (const dbProductCod in dbProducts) {
			if (!localProductsMap[dbProductCod]) {
				await set(ref(db, 'products/' + dbProductCod), null)
				console.log(`Product with code "${dbProductCod}" removed`)
			}
		}
	} catch (error) {
		console.error('Error syncing products:', error)
	}
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
