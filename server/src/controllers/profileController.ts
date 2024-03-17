import type {
    NextFunction,
    Request,
    Response,
} from "express-serve-static-core";
import Image from "../models/imageModel";
import User from "../models/userModel";

// @desc    Fetch user profile
// route    GET /profile/me
// @access  private
const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        next(error);
    }
};

// @desc    Update user profile
// route    PATCH /profile/me
// @access  private
const updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        // Save new files
        const newFiles = Promise.all(
            Object.values(files).map(async (value) => {
                const newImage = await Image.create({
                    fieldName: value[0].fieldname,
                    originalName: value[0].originalname,
                    mimetype: value[0].mimetype,
                    fileName: value[0].filename,
                    size: value[0].size,
                    path: value[0].path,
                });

                return {
                    fieldName: newImage.fieldName,
                    id: newImage._id,
                };
            })
        );

        const profileImage = (await newFiles).find(
            (file) => file.fieldName === "profile"
        )?.id;

        const coverPhoto = (await newFiles).find(
            (file) => file.fieldName === "cover"
        )?.id;

        // Delete old profile image
        if (req.user?.profileImage && profileImage) {
            await Image.findByIdAndDelete(req.user.profileImage);
        }

        // Delete old cover photo
        if (req.user?.coverPhoto && coverPhoto) {
            await Image.findByIdAndDelete(req.user.coverPhoto);
        }

        await User.findByIdAndUpdate(req.user.id, {
            ...req.body,
            ...(profileImage && { profileImage }),
            ...(coverPhoto && { coverPhoto }),
        });

        res.status(200).json({ message: "Profile successfully updated." });
    } catch (error) {
        next(error);
    }
};

export { getProfile, updateProfile };
