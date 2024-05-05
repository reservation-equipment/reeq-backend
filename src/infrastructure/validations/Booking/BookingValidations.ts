import {BookingRepo} from "../../../app/repositories/BookingRepo";
import {postgresBookingRepository} from "../../db/repository/PostgresQL/BookingRepoImplement";
import {formatDateTime, rangesIntersect} from "../../helpers/Time";

export class BookingValidations {
	
	constructor(private bookingRepo: BookingRepo) {
	}
	
	/**
	 * Проверяет выбранный юзером диапазон дат на пересечение с уже существующими бронями пользователей на данное оборудование
	 * @param equipment_id
	 * @param time_from
	 * @param time_to
	 * @param date
	 */
	public async validationTimeReservationForm(
	                                     equipment_id: number,
	                                     time_from: string,
	                                     time_to: string,
	                                     date: string) {
		
		const list = await this.bookingRepo.getListsTimeReservation(equipment_id)
		const checkedRange = formatDateTime(new Date(date), time_from, time_to)
		if(time_from >= time_to) {
			return {
				isValid: false,
				msg: 'Время начала бронирования не может быть больше времени окончания',
				errMsg: 'timeFromMoreTimeTo'
			}
		
		}
		
		if(time_to <= time_from) {
			return {
				isValid: false,
				msg: 'Время окончания бронирования не может быть меньше времени начала',
				errMsg: 'timeToLessTimeFrom'
			}
		}
		
		const formatList = list.map((value: any) => {
			const {date, time_from, time_to} = value
			return formatDateTime(date, time_from, time_to)
		})
		
		for (const range of formatList) {
			if(!rangesIntersect(checkedRange, range)) {
				return {
					isValid: false,
					msg: 'Вы выбрали невалидное время, оно пересекается с другими бронями для данного оборудования',
					errMsg: 'dontValidTimeInterval'
				}
			}
		}
		
		return {
			isValid: true,
			msg: '',
			errMsg: ''
		}
	}
	
}

export const bookingValidations = new BookingValidations(postgresBookingRepository)