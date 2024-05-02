import {BookingStatus} from "../../../infrastructure/shared/types/Booking";
import {equalDateTimeBookingExpired} from "../../../infrastructure/helpers/Date";
import {BookingRepo} from "../../repositories/BookingRepo";
import {UserRepo} from "../../repositories/UserRepo";

export class NotificationsService {
	
	constructor(
		private BookingRepo: BookingRepo,
		private UserRepo: UserRepo,
	) {
	}
	
	
	async sendAlertReservationNotification() {
		const listUsers = await this.UserRepo.getBySelect({}, {
			id: true
		})
		listUsers.forEach(async ({id: user_id}: {id: number}) => {
			
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
				if(equalDateTimeBookingExpired(date, time_to)) {
					console.log("check")
				}
			})
			
		})
	}
}

