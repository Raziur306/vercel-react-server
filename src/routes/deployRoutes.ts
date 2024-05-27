import express from "express";
import { uploadRepository } from "../controller/deployController";

const uploadRouter = express.Router();

uploadRouter.post("/upload", uploadRepository);

export { uploadRouter };
