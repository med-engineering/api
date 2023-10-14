import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import { sendErrorResponse } from "../utils/errors";
import activityLog from "../models/activityLog";
import { activityLogActions } from "../types";

const getActivityLogs = asyncHandler(async (req: Request, res: Response) => {
  const filterAction: string | null =
    (req.query.filter_action as string) || null;

  if (filterAction && !activityLogActions.includes(filterAction)) {
    sendErrorResponse(res, 400, "Invalid filter action!");
  }

  if (filterAction) {
    const getActivityLog = await activityLog
      .find({ action: filterAction })
      .populate("responsible", "-__v -_id -password")
      .select("-__v -_id");
    if (!getActivityLog) {
      sendErrorResponse(res, 404, "No activity log found!");
    }
    res.status(200).json(getActivityLog);
  } else {
    const getActivityLog = await activityLog
      .find()
      .populate("responsible", "-__v -_id -password")
      .select("-__v -_id");
    if (!getActivityLog) {
      sendErrorResponse(res, 404, "No activity log found!");
    }
    res.status(200).json(getActivityLog);
  }
});

const getActivityLogById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const getActivityLog = await activityLog
    .findOne({ id })
    .populate("responsible", "-__v -_id -password")
    .select("-__v -_id");
  if (!getActivityLog) {
    sendErrorResponse(res, 404, "This activity log does not exist!");
  }
  res.status(200).json(getActivityLog);
});

export { getActivityLogs, getActivityLogById };
