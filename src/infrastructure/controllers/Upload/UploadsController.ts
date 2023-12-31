import {uploadService, UploadService} from "../../../app/services/UploadService/UploadService";


export class UploadsController {
    constructor(public uploadsService: UploadService) {
    }
    


}

export const uploadsController = new UploadsController(uploadService)
