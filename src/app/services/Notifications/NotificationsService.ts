import {BookingStatus} from "../../../infrastructure/shared/types/Booking";
import {equalDateTimeBookingExpired} from "../../../infrastructure/helpers/Date";
import {BookingRepo} from "../../repositories/BookingRepo";
import {UserRepo} from "../../repositories/UserRepo";
import {FirebaseService} from "../Firebase/FirebaseService";
import {Expo} from "expo-server-sdk";
import {EquipmentRepo} from "../../repositories/EquipmentRepo";


export class NotificationsService {
	constructor(
		private EquipmentRepo: EquipmentRepo,
		private BookingRepo: BookingRepo,
		private UserRepo: UserRepo,
		private firebase: FirebaseService,
		private expo: Expo
	) {
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
				date: true,
				equipment_id: true
			})
			
			listBookings?.forEach(async (booking: any) => {
				const {date, time_to, equipment_id} = booking;
				const equipment = await this.EquipmentRepo.getById(equipment_id)
				if (equalDateTimeBookingExpired(date, time_to)) {
					this.firebase.getToken(String(user_id)).then(async (data: any) => {
						const {token} = data;
						const notificationData = {
							date,
							time_to,
							equipment: {
								id: equipment?.id,
								name: equipment?.name
							}
						};
						if(token) {
							this.sendExpoNotification(token, notificationData)
							await this.firebase.saveNotification(String(user_id), notificationData)
						} else {
							console.log("Token not found!")
						}
						
					})
				}
			})
			
		})
	}
	
	private async sendExpoNotification(token: string, data: any) {
		this.expo.sendPushNotificationsAsync([
			{
				to: token,
				sound: 'default',
				title: 'Внимание!',
				body: 'Ваша бронь просрочена!',
				data,
			}
		])
		console.log("send notification!")
	}
	
	
}

