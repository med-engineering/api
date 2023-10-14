import * as express from "express";
import { Router } from "express";
import {
  login,
  adminInfo,
  createOwnerAccount,
} from "../controllers/admin.controller";
import { protect } from "../middlewares/admin.middleware";
import uploadImage from "../middlewares/upload.middleware";

const router: Router = express.Router();

router.get("/@me", protect, adminInfo);
router.post("/login", login);
router.post("/owner/create", uploadImage, createOwnerAccount);

export default router;
