import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import Service from "../models/service";
import registerLog from "../utils/registerLog";
import { sendErrorResponse } from "../utils/errors";

const getServices = asyncHandler(async (req: Request, res: Response) => {
  let fetchServices = await Service.find().select("-__v -_id");
  res.status(200).json(fetchServices || []);
});

const getServiceById = asyncHandler(async (req: Request, res: Response) => {
  const { serviceID } = req.params;
  let fetchService: any = await Service.findOne({ id: serviceID }).select(
    "-__v -_id"
  );

  if (!fetchService) {
    sendErrorResponse(res, 404, "This service does not exist!");
  }
  res.status(200).json(fetchService);
});

const createService = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const creationObject: any = {};
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

  console.log(req.images);
  if (req.images) creationObject.thumbnail = req.images[0];

  const newService = (await Service.create(creationObject)).toObject();

  delete newService._id;
  delete newService.__v;

  res.status(201).json(newService);

  registerLog(`SERVICE_CREATED`, newService, req.admin?._id);
});

const updateService = asyncHandler(async (req: Request, res: Response) => {
  const { serviceID } = req.params;
  const { name, description } = req.body;

  const updateObject: any = {};
  if (name) {
    if (!name?.trim()?.length) {
      return sendErrorResponse(res, 404, "Service name is required");
    }
    updateObject.name = name;
  }
  if (description) {
    updateObject.description = description;
  } else updateObject.description = "";
  if (req.images) updateObject.thumbnail = req.images[0];

  const newService = await Service.findOneAndUpdate(
    { id: serviceID },
    { ...updateObject },
    { new: true }
  ).select("-_id -__v");

  if (!newService) {
    sendErrorResponse(res, 404, "No service found for this id!");
  }
  res.status(200).json(newService);

  registerLog(`SERVICE_UPDATED`, newService, req.admin?._id);
});

const deleteService = asyncHandler(async (req: Request, res: Response) => {
  const { serviceID } = req.params;
  const oldService = await Service.findOneAndDelete({ id: serviceID }).select(
    "-_id -__v"
  );
  if (!oldService) {
    sendErrorResponse(res, 404, "No Service found for this id!");
  }
  res.status(200).json(oldService);

  registerLog(`SERVICE_DELETED`, oldService, req.admin?._id);
});

export {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
