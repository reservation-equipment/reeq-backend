export enum BookingStatus {
    CREATED= "CREATED",
    COMPLETE = "COMPLETE",
    EXPIRED = "EXPIRED"
}


export interface getBookingByParams {
    [key: string]: any;
}