import { Document, Schema, model } from "mongoose";
import applySnowflakeId from "../utils/snowflakeId";

export interface IMachine extends Document {
  id: string | null;
  room: Schema.Types.ObjectId;
  service: Schema.Types.ObjectId;
  name: string;
  description: string;
  thumbnail: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const MachineSchema: Schema<IMachine> = new Schema(
  {
    id: { type: String, default: null, unique: true },
    room: { type: Schema.Types.ObjectId, ref: "Room" },
    service: { type: Schema.Types.ObjectId, ref: "Service" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

applySnowflakeId(MachineSchema);

const MachineModel = model<IMachine>("Machine", MachineSchema);

export default MachineModel;
