import mongoose from "mongoose";

interface IImage {
    fieldName: string;
    path: string;
    originalName: string;
    fileName: string;
    mimetype: string;
    size: number;
}

const imageModel = new mongoose.Schema<IImage>(
    {
        fieldName: {
            type: String,
        },
        path: {
            type: String,
        },
        originalName: {
            type: String,
        },
        fileName: {
            type: String,
        },
        mimetype: {
            type: String,
        },
        size: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

const Image = mongoose.model("Image", imageModel);

export default Image;
