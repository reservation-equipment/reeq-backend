import {child, get, getDatabase, ref, set} from "firebase/database";
import process from "node:process";
import {initializeApp} from "firebase/app";
import {BookingRepo} from "../../repositories/BookingRepo";
import {UserRepo} from "../../repositories/UserRepo";

export class FirebaseService {
	
	private readonly db: any
	private dbRef: any
	constructor(
		private BookingRepo: BookingRepo,
		private UserRepo: UserRepo,
	) {
		
		const firebaseConfig = {
			apiKey: process.env.FIREBASE_API_KEY,
			authDomain: process.env.FIREBASE_AUTH_DOMAIN,
			projectId: process.env.FIREBASE_PROJECT_ID,
			storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
			messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
			appId: process.env.FIREBASE_APP_ID,
			measurementId: process.env.FIREBASE_MEASUREMENT_ID,
			databaseURL: process.env.FIREBASE_DATABASE_URL
		};
		
		initializeApp(firebaseConfig);
		// const analytics = getAnalytics(app);
		
		this.db = getDatabase()
		this.dbRef = ref(this.db)
	}
	
	async saveToken(token: string, userId: string) {
		
		const values = (await get(child(this.dbRef, `userTokens/${userId}`))).val() ?? {};
		const payload = {...values, token};
		set(ref(this.db, `userTokens/${userId}`), payload);
	}
	
	async getToken(userId: string){
		return (await get(child(this.dbRef, `userTokens/${userId}`))).val() ?? {};
	}
}