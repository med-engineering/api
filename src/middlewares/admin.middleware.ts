import { Request, Response, NextFunction } from "express";
import * as asyncHandler from "express-async-handler";

import { Secret, verify } from "jsonwebtoken";
import Admin, { IAdmin } from "../models/admin";
const JWT_KEY = process.env.JWT_KEY as Secret;

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    const { authorization } = req.headers;
    if (authorization) {
      try {
        token = authorization.split(" ")[1];

        const decoded: any = verify(token, JWT_KEY);
        const getUser = await Admin.findOne({
          id: decoded.id,
        }).select("-password");
        if (!getUser) {
          res.status(401);
          throw new Error("Not authorized, invalid token");
        }
        req.admin = getUser.toObject();
        next();
      } catch (err) {
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token provided");
    }
  }
);
export { protect };
