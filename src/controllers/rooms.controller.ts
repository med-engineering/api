import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import Service from "../models/service";
import registerLog from "../utils/registerLog";
import { sendErrorResponse } from "../utils/errors";
import Room from "../models/room";

const getRooms = asyncHandler(async (req: Request, res: Response) => {
  const serviceID = req.service?._id;

  let fetchRooms = await Room.find({ service: serviceID })
    .select("-__v -_id")
    .populate("service", "-rooms -__v -_id");
  res.status(200).json(fetchRooms || []);
});

const getRoomById = asyncHandler(async (req: Request, res: Response) => {
  const { roomID } = req.params;
  const serviceID = req.service?._id;

  const fetchRoom = await Room.findOne({
    service: serviceID,
    id: roomID,
  })
    .populate("service", "-_id -__v -rooms")
    .select("-_id -__v");

  if (!fetchRoom) {
    sendErrorResponse(res, 404, "No room found for this id!");
  }
  res.status(200).json(fetchRoom);
});

const createRoom = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const serviceID = req.service?._id;

  const creationObject: any = {
    service: serviceID,
  };
  if (name) {
    if (name.length > 25 || name.length < 3)
      sendErrorResponse(res, 400, "Name should be between 3 and 25 in length");
    creationObject.name = name;
  } else {
    sendErrorResponse(res, 400, "Name is required!");
  }

  if (description) {
    creationObject.description = description;
  }

  if (req.images) creationObject.thumbnail = req.images[0];

  const newRoom = (await Room.create(creationObject)).toObject();

  delete newRoom._id;
  delete newRoom.__v;

  res.status(201).json(newRoom);

  registerLog(`ROOM_CREATED`, newRoom, req.admin?._id);
});

const updateRoom = asyncHandler(async (req: Request, res: Response) => {
  const serviceID = req.service?._id;
  const { roomID } = req.params;
  const { name, description } = req.body;

  const updateObject: any = {};
  if (name) {
    updateObject.name = name;
  }
  if (description) {
    updateObject.description = description;
  } else updateObject.description = "";
  if (req.images) updateObject.thumbnail = req.images[0];

  const newRoom = await Room.findOneAndUpdate(
    { id: roomID, service: serviceID },
    { ...updateObject },
    { new: true }
  )
    .select("-_id -__v")
    .populate("service", "-_id -__v");

  if (!newRoom) {
    sendErrorResponse(res, 404, "No room found for this id!");
  }
  res.status(200).json(newRoom);

  registerLog(`ROOM_UPDATED`, newRoom, req.admin?._id);
});

const deleteRoom = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const oldRoom = await Room.findOneAndDelete({ id })
    .select("-_id -__v")
    .populate("service", "-_id -__v");
  if (!oldRoom) {
    sendErrorResponse(res, 404, "No Room found for this id!");
  }
  res.status(200).json(oldRoom);

  registerLog(`ROOM_DELETED`, oldRoom, req.admin?._id);
});

export { getRooms, getRoomById, createRoom, updateRoom, deleteRoom };
