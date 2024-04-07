import {Booking} from "../../models/Booking/Booking";
import {getBookingByParams} from "../../../infrastructure/shared/types/Booking";

export type addBookingDto = Omit<Booking, "id" | "created_at" | "updated_at" | "equipments">

type InputObj = {
	[key: string]: Number | String
}

export const getBookingByParamsDto = (params: getBookingByParams) =>  {
	let returnObj: InputObj = {}
	for (const key in params) {
		if(Object.prototype.hasOwnProperty.call(params, key)) {
			returnObj[key] = Number(params[key])
		}
	}
	
	return returnObj
}

export type getBookingByParamsDtoType = ReturnType<typeof getBookingByParamsDto>