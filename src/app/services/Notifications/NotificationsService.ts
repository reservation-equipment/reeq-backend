import {BookingStatus} from "../../../infrastructure/shared/types/Booking";
import {equalDateTimeBookingExpired} from "../../../infrastructure/helpers/Date";
import {BookingRepo} from "../../repositories/BookingRepo";
import {UserRepo} from "../../repositories/UserRepo";
import {child, get, getDatabase, ref, set} from "firebase/database"
import {initializeApp} from "firebase/app";
import * as process from "node:process";



export class NotificationsService {
	private db: any
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
		
		const app = initializeApp(firebaseConfig);
		// const analytics = getAnalytics(app);
		
		this.db = getDatabase()
		this.dbRef = ref(this.db)
	}
	
	
	async sendAlertReservationNotification() {
		const listUsers = await this.UserRepo.getBySelect({}, {
			id: true
		})
		listUsers.forEach(async ({id: user_id}: { id: number }) => {
			
			const listBookings = await this.BookingRepo.getBySelect({
				status: BookingStatus.CREATED,
				user_id
			}, {
				time_from: true,
				time_to: true,
				date: true
			})
			
			listBookings?.forEach((booking: any) => {
				const {date, time_to} = booking
				if (equalDateTimeBookingExpired(date, time_to)) {
					console.log("check")
				}
			})
			
		})
	}
	
	async saveToken(token: string, userId: string) {
		
		const values = (await get(child(this.dbRef, `userTokens/${userId}`))).val() ?? {};
		const payload = {...values, token};
		set(ref(this.db, `userTokens/${userId}`), payload);
	}
	
	async getTokens() {
		const values = (await get(child(this.dbRef, `userTokens`))).val() ?? {};
		return values;
	}
}

