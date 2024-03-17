import express from "express";
import multer from "multer";
import { protect } from "../middleware/authMiddleware";
import { getProfile, updateProfile } from "../controllers/profileController";
import { fileMimeType } from "../utils/constants/mimetypes";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const baseFolder = "public/uploads";

        // Make sure you have cover and profile folder under public/uploads folder
        callback(null, `${baseFolder}/${file.fieldname}`);
    },
    filename: function (req, file, callback) {
        const userId = req.user.id;

        callback(null, `${userId}-profile.${fileMimeType[file.mimetype]}`);
    },
});

const limits: multer.Options["limits"] = {
    fileSize: 1_000_000 * 5, //5MB
};

const fileFilter: multer.Options["fileFilter"] = (req, file, callback) => {
    const allowedMimetypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "imagae/webp",
    ];
    if (!allowedMimetypes.includes(file.mimetype)) {
        return callback(new Error("Invalid file type."));
    }

    callback(null, true);
};

const upload = multer({ storage, limits, fileFilter });

router.use(protect);

router.get("/me", getProfile);
router.patch(
    "/me",
    upload.fields([
        { name: "profile", maxCount: 1 },
        { name: "cover", maxCount: 1 },
    ]),
    updateProfile
);

export default router;
