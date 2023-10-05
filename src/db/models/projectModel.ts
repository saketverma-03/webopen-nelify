import mongoose from "mongoose";
import { Schema, string } from "zod";

export interface IProject {
    title: string;
    discription: string;
    jsCode: string;
    cssCode: string;
    htmlCode: string;
    user: mongoose.Schema.Types.ObjectId;
    isPublic: boolean
}

const projectSchema = new mongoose.Schema<IProject>({
    title: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
        required: false,
    },
    jsCode: {
        type: String,
        required: false,
        defaul: "",
    },
    cssCode: {
        type: String,
        required: false,
        default: "",
    },
    htmlCode: {
        type: String,
        required: false,
        default: "",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    isPublic: {
        type: Boolean,
        default: false,
        required: true
    }
});

export const Project =
    mongoose.models.projects ||
    mongoose.model<IProject>("projects", projectSchema);
