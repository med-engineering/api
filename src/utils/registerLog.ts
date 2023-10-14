import { Schema } from "mongoose";
import activityLog from "../models/activityLog";

const registerLog = async (
  action: string,
  data: any,
  responsible: Schema.Types.ObjectId
) => {
  const newLog = await activityLog.create({
    action,
    data,
    responsible,
  });

  return newLog;
};

export default registerLog;
