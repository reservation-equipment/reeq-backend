import {prisma} from "../db/orm/prisma/PrismaClient";
import {uploadService} from "../../app/services/UploadService/UploadService";
import {PutObjectRequest} from 'aws-sdk/clients/s3';


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


export const UploadMiddleware = () => {
    return async (req: any, res: any, next: any) => {
        const {id} = req.query;
        const fileNames: string[] = []
        if (req.files) {
            for (let file of req.files) {
                const {buffer, originalname} = file;
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                const newName = `${uniqueSuffix}_${originalname}`

                const params: PutObjectRequest = {
                    Bucket: 'reeq-files',
                    Key: `images/${newName}`,
                    Body: buffer,
                    ACL: 'public-read',
                    ContentType: "images/*",

                }

                console.log(file)

                await uploadService.UploadImagesYandexS3(params)
                fileNames.push(newName)

            }
            console.log(fileNames)
            await prisma.equipments.update({
                where: {
                    id: Number(id)
                },
                data: {
                    img_hrefs: fileNames
                }
            })
        }

        next();
    };
};
