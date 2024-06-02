import express from "express";
import { uploadRepository } from "../controller/uploadController";

const uploadRouter = express.Router();

uploadRouter.post("/upload", uploadRepository);

export { uploadRouter };
