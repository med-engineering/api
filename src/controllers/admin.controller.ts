import { Response } from "express";
import { Request } from "../@types/express";
import * as asyncHandler from "express-async-handler";
import generateToken from "../config/generateToken";

import Admin, { IAdmin } from "../models/admin";

const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const getAdmin = await Admin.findOne({ username });
  if (!getAdmin) {
    res.status(404);
    throw new Error("username not found!");
  }

  const match = await getAdmin.matchPassword(password);
  if (!match) {
    res.status(401);
    throw new Error("Incorrect password!");
  }

  res.status(200).json({
    id: getAdmin.id,
    username: getAdmin.username,
    permissions: getAdmin.permissions,
    isOwner: getAdmin.isOwner,
    createdAt: getAdmin.createdAt,
    updatedAt: getAdmin.updatedAt,
    token: generateToken(getAdmin.id),
  });
});

const adminInfo = asyncHandler(async (req: Request, res: Response) => {
  let admin = req.admin as IAdmin;

  delete admin.__v;
  delete admin._id;

  res.send(admin);
});

const createOwnerAccount = asyncHandler(async (req: Request, res: Response) => {
  const { username, password, name } = req.body;
  const avatar = req.images?.[0];

  const createAdmin = await Admin.create({
    username,
    password,
    name,
    isOwner: true,
    avatar,
    permissions: ["owner"],
  });

  res.status(201).json({
    ...createAdmin.toJSON(),
    token: generateToken(createAdmin.id),
  });
});

export { login, adminInfo, createOwnerAccount };
