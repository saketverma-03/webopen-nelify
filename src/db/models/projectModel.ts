import mongoose from "mongoose";

export interface IProject {
  title: string;
  discription: string;
  jsCode: string;
  cssCode: string;
  htmlCode: string;
  user: mongoose.Schema.Types.ObjectId;
}

const projectSchema = new mongoose.Schema<IProject>({
  title: {
    type: "string",
    required: true,
  },
  discription: {
    type: "string",
    required: false,
  },
  jsCode: {
    type: "string",
    required: false,
    default: "",
  },
  cssCode: {
    type: "string",
    required: false,
    default: "",
  },
  htmlCode: {
    type: "string",
    required: false,
    default: "",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

export const Project =
  mongoose.models.projects ||
  mongoose.model<IProject>("projects", projectSchema);
