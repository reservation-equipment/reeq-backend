import multer from 'multer'
import * as path from "path";
import {prisma} from "../db/orm/prisma/PrismaClient";
import {uploadService} from "../../app/services/UploadService/UploadService";
import {default as EasyYandexS3} from "easy-yandex-s3";
import process from "process";
import S3 from 'aws-sdk/clients/s3';



// const storage = multer.diskStorage({
//     destination: function (req: any, file: any, cb: any) {
//
//         cb(null, "uploads")
//     },
//     filename: function (req: any, file: any, cb: any) {
//         const fileExtension = path.extname(file.originalname);
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         const newFileName = file.fieldname + '-' + uniqueSuffix + fileExtension;
//
//         cb(null, newFileName)
//     }
// })
// const upload = multer({ storage: storage })
let s3 = new S3({
    endpoint: 'https://storage.yandexcloud.net',
    apiVersion: "latest",
    accessKeyId: process.env.YANDEX_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.YANDEX_S3_SECRET_KEY as string,
    region: 'us-east-1',
    httpOptions: {
        timeout: 10000,
        connectTimeout: 10000,
    },
});

    // @ts-ignore
    // let s3 = new EasyYandexS3({
    //     auth: {
    //         accessKeyId: process.env.YANDEX_S3_ACCESS_KEY_ID as string,
    //         secretAccessKey: process.env.YANDEX_S3_SECRET_KEY as string
    //     },
    //     Bucket: "reeq-files",
    //     debug: true,
    //
    // })


export const UploadMiddleware = () => {
    return async (req: any, res: any, next: any) => {
        // const {id} = req.query;
        if(req.files) {
            for (let file of req.files) {
                const {buffer,originalname } = file;
                console.log(file)
                const params = {
                    Bucket: 'reeq-files',
                    Key: originalname,
                    Body: buffer,
                    ACL: 'public-read',
                    ContentType: "images/*",

                }
                try {
                    let upload =  s3.upload(params, (err: any, data: any) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log(`Image uploaded successfully. File URL: ${data.Location}`);
                            }
                        }); // Загрузка в бакет
                    console.log(upload)
                    res.send(upload);
                } catch (e: any) {
                    console.log("Ошибка при загрузке в S3 storage: ", e, e.message)
                }
            }
            // await prisma.equipments.update({
            //     where: {
            //         id: Number(id)
            //     },
            //     data: {
            //         img_hrefs: req.files.map((item: any) => item.filename)
            //     }
            // })
        }
        // upload.array('image_equipment', 2)(req, res, (err: any) => {
        //     if (err) {
        //         console.error(err);
        //         return res.status(500).json({error: 'Unexpected end of form'});
        //     }
        //     next();
        // });
        next();
    };
};
