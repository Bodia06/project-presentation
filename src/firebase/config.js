import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCvZDG2jB5BwX12iNcN201GNIwwon5utzk',
	authDomain: 'project-presentation-6094d.firebaseapp.com',
	projectId: 'project-presentation-6094d',
	storageBucket: 'project-presentation-6094d.firebasestorage.app',
	messagingSenderId: '73452059242',
	appId: '1:73452059242:web:c0a13e1ed7d5310cda6813',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
