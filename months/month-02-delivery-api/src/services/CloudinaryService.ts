import { v2 as cloudinary } from "cloudinary";
import { AppError } from "../shared/errors/AppError";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export class CloudinaryService {

    static async uploadImage(fileBufer: Buffer): Promise<string> {
        return new Promise((resolve, reject) => {

            const stream = cloudinary.uploader.upload_stream(
                { folder: 'delivery-api-products' },
                (error, result) => {
                    if (error) {
                        throw reject(new AppError('Error uploading image to Cloudinary', 500))
                    }
                    return resolve(result?.secure_url as string)
                }
            );
            stream.end(fileBufer);
        });        
    }
}