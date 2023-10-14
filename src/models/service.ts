import { Document, Schema, model } from "mongoose";
import applySnowflakeId from "../utils/snowflakeId";

export interface IService extends Document {
  id: string | null;
  name: string;
  description?: string;
  thumbnail: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema<IService> = new Schema(
  {
    id: { type: String, default: null, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    thumbnail: { type: String, default: 'https://i.imgur.com/UBvxR4n.jpg' },
  },
  {
    timestamps: true,
  }
);

applySnowflakeId(ServiceSchema);

const ServiceModel = model<IService>("Service", ServiceSchema);

export default ServiceModel;
