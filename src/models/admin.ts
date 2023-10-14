import { compare, genSalt, hash } from "bcrypt";
import { Document, Schema, model } from "mongoose";
import applySnowflakeId from "../utils/snowflakeId";
import { AuthPermissions } from "../types";
const salts = 15;

export interface IAdmin extends Document {
  id: string | null;
  username: string;
  password: string;
  name: string;
  avatar: string;
  permissions: AuthPermissions[];
  isOwner: boolean;
  createdAt: Date;
  updatedAt: Date;
  hashPassword(password: string): Promise<string>;
  matchPassword(password: string | Buffer): Promise<boolean>;
}

const adminSchema: Schema<IAdmin> = new Schema(
  {
    id: { type: String, default: null, unique: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, default: "https://i.imgur.com/mmpMRW0.jpg" },
    permissions: { type: [String], default: [] },
    isOwner: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

applySnowflakeId(adminSchema);

adminSchema.pre<IAdmin>("save", async function (next) {
  if (!this.isNew) {
    return next();
  }
  const password = this.password;
  this.password = await this.hashPassword(password);
  next();
});

adminSchema.methods.matchPassword = async function (
  password: string | Buffer
): Promise<boolean> {
  return await compare(password, this.password);
};

adminSchema.methods.hashPassword = async function (
  password: string
): Promise<string> {
  const salt = await genSalt(salts);
  return await hash(password, salt);
};

const AdminModel = model<IAdmin>("Admin", adminSchema);

export default AdminModel;
