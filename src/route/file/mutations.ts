import { Router } from "express";
import { BadRequestResponse, SuccessResponse } from "../../handler/app-response";
import service from "../../services/FileService";
import asyncHandler from "../../handler/asyncHandler";
import upload from "../../middleware/upload";

const router = Router();

router.post("/upload", upload.single("image"),
    asyncHandler(async (req, res, next) => {
        const data = await service.upload(req.file, req.body.alt);
        if (!data) {
            return new BadRequestResponse("Upload thất bại").send(res);
        }

        return new SuccessResponse("Upload thành công", data).send(res);
    })
);

router.post("/upload-multiple", upload.array("images", 10),
    asyncHandler(async (req, res, next) => {
        const data = await service.uploadMultiple(req.files);
        if (!data) {
            return new BadRequestResponse("Upload thất bại").send(res);
        }

        return new SuccessResponse("Upload thành công", data).send(res);
    })
);

export default router;