import moment from "moment-timezone"


export const equalDateTimeBookingExpired = (date: Date, time_to: string) => {
	const currDate = moment().tz("Europe/Moscow").format("YYYY-MM-DD")
	const comparisonDate = moment(date).format("YYYY-MM-DD")
	if(currDate > comparisonDate) {
		return true
	} else if(currDate == comparisonDate) {
		const currTime = moment().tz("Europe/Moscow").format("HH:mm")
		return currTime > time_to
	}
	
	return false
}
