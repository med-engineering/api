import * as express from "express";
import { Router } from "express";
import { roomsPermission } from "../middlewares/permissions.middleware";
import {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/rooms.controller";
import uploadImage from "../middlewares/upload.middleware";

const router: Router = express.Router();

router.route("/").get(getRooms).post(roomsPermission, uploadImage, createRoom);

router
  .route("/:roomID")
  .get(getRoomById)
  .patch(roomsPermission, uploadImage, updateRoom)
  .delete(roomsPermission, deleteRoom);

// router.route("/:id/move/:newServiceID").put( roomsPermission, moveRoom);

export default router;
