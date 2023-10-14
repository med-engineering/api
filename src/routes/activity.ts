import * as express from "express";
import { Router } from "express";
import { activityLogPermission } from "../middlewares/permissions.middleware";
import {
  getActivityLogs,
  getActivityLogById,
} from "../controllers/activity.controller";
import uploadImage from "../middlewares/upload.middleware";

const router: Router = express.Router();

router.route("/").get( activityLogPermission, getActivityLogs);

router.route("/:id").get( activityLogPermission, getActivityLogById);
export default router;
