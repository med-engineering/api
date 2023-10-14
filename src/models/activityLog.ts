import { Document, Schema, model } from "mongoose";
import applySnowflakeId from "../utils/snowflakeId";

export interface IActivityLog extends Document {
  id: string | null;
  action: string;
  data: any;
  responsible: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ActivityLogSchema: Schema<IActivityLog> = new Schema(
  {
    id: { type: String, default: null, unique: true },
    action: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true },
    responsible: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  {
    timestamps: true,
  }
);

applySnowflakeId(ActivityLogSchema);

const activityLogModel = model<IActivityLog>("ActivityLog", ActivityLogSchema);

export default activityLogModel;
