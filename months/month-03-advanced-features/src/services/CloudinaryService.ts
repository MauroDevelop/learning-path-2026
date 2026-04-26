import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import { AppError } from "../shared/errors/AppError";

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("CRITICAL ERROR: Cloudinary credentials are missing in the .env file");

} else {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!
    });
}


export class CloudinaryService {

    public static async uploadImage(fileBufer: Buffer): Promise<string> {
        return new Promise((resolve, reject) => {

            const stream = cloudinary.uploader.upload_stream(
                { folder: 'delivery-api-products' },
                (error, result) => {
                    if (error) {
                        console.error('CLOUDINARY ERROR:', error);
                        return reject(new AppError('Error uploading image to Cloudinary', 500))
                    }
                    if (!result) {
                        return reject(new AppError('Unknown error during upload', 500));
                    }

                    resolve(result.secure_url);
                }

            );
            stream.end(fileBufer);
        });
    }
}