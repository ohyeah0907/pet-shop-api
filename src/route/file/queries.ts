import { Router } from "express";
import service from "../../services/FileService";
import asyncHandler from "../../handler/asyncHandler";
import { Stream } from "stream";
import path from "path";
import fs from "fs";

const router = Router();
router.get("/images/:url", asyncHandler(async (req, res, next) => {
    const url = req.params.url;
    // const image = await imageService.getImageByUrl(url);
    // if (!image) {
    //     throw new BadRequestResponse("Không tìm thấy ảnh");
    // }

    const imagePath = path.join(__dirname, `../../../${url}`);
    const r = fs.createReadStream(imagePath) // or any other way to get a readable stream
    const ps = new Stream.PassThrough() // <---- this makes a trick with stream error handling
    Stream.pipeline(
        r,
        ps, // <---- this makes a trick with stream error handling
        (err) => {
            if (err) {
                return res.sendStatus(400);
            }
        })
    ps.pipe(res) // <---- this makes a trick with stream error handling
}));

export default router;