import path from "path";
import fs from "fs";
import Resize from "../core/Resize";
// import imageService from "./imageService";
// import { ImageCreate } from "../dto/imageDto";
// import { slugify } from "../utils/stringUtil";
import { Stream } from "stream";

const service = {
    upload: async (file: any, alt: string) => {
        const folder = '/upload/images/blog';
        const imagePath = path.join(__dirname, `../../${folder}`);

        if (!fs.existsSync(imagePath)) {
            fs.mkdirSync(imagePath, { recursive: true });
        }

        // call class Resize
        const fileUpload = new Resize(imagePath);
        if (!file) {
            return null;
        }

        alt = alt ?? file.originalname.split('.')[0];
        const filename = await fileUpload.save(file.buffer);
        // const image: ImageCreate = {
        //     name: file.originalname,
        //     realPath: path.join(folder, filename),
        //     alt: alt,
        //     url: slugify(alt) + "-" + filename.substring(0, 8),
        // }

        return filename;
    },
    uploadMultiple: async (files: any) => {
        const folder = '/upload/images/blog';
        const imagePath = path.join(__dirname, `../../${folder}`);

        if (!fs.existsSync(imagePath)) {
            fs.mkdirSync(imagePath, { recursive: true });
        }
        const fileUpload = new Resize(imagePath);
        if (!files || files.length === 0) {
            return null;
        }

        const images = [];
        for (const file of files) {
            const filename = await fileUpload.save(file.buffer);
            let alt = file.originalname.split('.')[0];
            // const image: ImageCreate = {
            //     name: file.originalname,
            //     realPath: path.join(folder, filename),
            //     alt: alt,
            //     url: slugify(alt) + "-" + filename.substring(0, 8),
            // }
            images.push(filename);
        }

        return images;
    },

}

export default service;