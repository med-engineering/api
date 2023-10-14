import * as express from "express";
import { Router } from "express";
import { servicesPermission } from "../middlewares/permissions.middleware";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/service.controller";
import uploadImage from "../middlewares/upload.middleware";

const router: Router = express.Router();

router
  .route("/")
  .get(getServices)
  .post(servicesPermission, uploadImage, createService);

router
  .route("/:serviceID")
  .get(getServiceById)
  .patch(servicesPermission, uploadImage, updateService)
  .delete(servicesPermission, deleteService);

export default router;
