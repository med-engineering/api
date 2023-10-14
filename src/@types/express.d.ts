import { IAdmin } from "../models/admin";
import * as Express from "express";
import { IService } from "../models/service";

declare global {
  namespace Express {
    interface Request {
      admin?: IAdmin;
      service?: IService;
      images?: any[];
    }
  }
}

export type Request = Express.Request;
