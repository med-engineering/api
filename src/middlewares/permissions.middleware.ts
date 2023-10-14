import { Response, NextFunction, Request } from "express";
import * as asyncHandler from "express-async-handler";
import { IAdmin } from "../models/admin";
import checkPerms from "../utils/checkPermissions";

const activityLogPermission = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const admin = req.admin as IAdmin;
    if (!checkPerms("logs", admin)) {
      res.status(401);
      throw new Error("missing activity logs permission!");
    }
    next();
  }
);

const ownerPermission = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const admin = req.admin as IAdmin;
    if (!admin.isOwner) {
      res.status(401);
      throw new Error("missing owner permission!");
    }
    next();
  }
);

const servicesPermission = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const admin = req.admin as IAdmin;
    if (!checkPerms("services", admin)) {
      res.status(401);
      throw new Error("missing services permission!");
    }
    next();
  }
);
const roomsPermission = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const admin = req.admin as IAdmin;
    if (!checkPerms("rooms", admin)) {
      res.status(401);
      throw new Error("missing rooms permission!");
    }
    next();
  }
);

export {
  activityLogPermission,
  ownerPermission,
  servicesPermission,
  roomsPermission,
};
