import * as process from "process";
import S3, {PutObjectRequest} from "aws-sdk/clients/s3";

export class UploadService {
    constructor(public yandexS3: any) {}

    async UploadImagesYandexS3(params: PutObjectRequest) {
        try {
            this.yandexS3.upload(params, (err: any, data: any) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Image uploaded successfully. File URL: ${data.Location}`);
                }
            }); // Загрузка в бакет

        } catch (e: any) {
            console.log("Ошибка при загрузке в S3 storage: ", e, e.message)
        }
    }

    async RemoveImageFromYandexS3(params: PutObjectRequest) {
        try {
            this.yandexS3.deleteObject(params, (err: any, data: any) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Image deleted successfully. File URL: ${data.Location}`);
                }
            });

        } catch (e: any) {
            console.log("Ошибка при удалении в S3 storage: ", e, e.message)
        }
    }

}

export const uploadService = new UploadService(
    new S3({
        endpoint: process.env.YANDEX_S3_ENDPOINT,
        apiVersion: "latest",
        accessKeyId: process.env.YANDEX_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.YANDEX_S3_SECRET_KEY as string,
        region: process.env.YANDEX_S3_REGION,
        httpOptions: {
            timeout: 10000,
            connectTimeout: 10000,
        },
    })
)
