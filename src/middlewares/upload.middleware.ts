import { NextFunction, Request, Response } from "express";
import imgurUpload from "../utils/imgur";

const uploadImage = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (req.files) {
      const uploadedImages = [];

      for (const fileKey in req.files) {
        const file = req.files[fileKey].data;
        const data = await imgurUpload(file);

        if (data) {
          uploadedImages.push(data);
        }
      }

      if (uploadedImages.length > 0) {
        req.images = uploadedImages;
      }
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

export default uploadImage;
