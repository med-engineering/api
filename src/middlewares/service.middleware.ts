import { Request, Response, NextFunction } from "express";
import asyncHandler = require("express-async-handler");

import Service from "../models/service";

const checkService = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { serviceID } = req.params;
    const fetchService = await Service.findOne({ id: serviceID });
    if (!fetchService) {
      res.status(404);
      throw new Error("service not found!");
    }
    req.service = fetchService;
    next();
  }
);

export { checkService };
