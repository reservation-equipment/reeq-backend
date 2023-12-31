import {default as EasyYandexS3} from "easy-yandex-s3";
import * as process from "process";

export class UploadService {
    constructor(public yandexS3: EasyYandexS3 | null) {
    }
    // async UploadImagesYandexObjectStorage(images: any) {
    //     // console.log(images)
    // }

}
let s3: EasyYandexS3 | null = null;
try {
    s3 = new EasyYandexS3({
        auth: {
            accessKeyId: process.env.YANDEX_S3_ACCESS_KEY_ID ?? '',
            secretAccessKey: process.env.YANDEX_S3_SECRET_KEY ?? ''
        },
        Bucket: "reeq-files",
        debug: true
    })
} catch (e) {
    console.log(e)
}
export const uploadService = new UploadService(s3)
