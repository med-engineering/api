import { Document, Schema, model } from "mongoose";
import applySnowflakeId from "../utils/snowflakeId";

export interface IRoom extends Document {
  id: string | null;
  service: Schema.Types.ObjectId;
  name: string;
  description: string;
  thumbnail: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema<IRoom> = new Schema(
  {
    id: { type: String, default: null, unique: true },
    service: { type: Schema.Types.ObjectId, ref: "Service" },
    name: { type: String, required: true },
    description: { type: String },
    thumbnail: { type: String, default: "https://i.imgur.com/lhIxC7d.png" },
  },
  {
    timestamps: true,
  }
);

applySnowflakeId(RoomSchema);

const RoomModel = model<IRoom>("Room", RoomSchema);

export default RoomModel;
