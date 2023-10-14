import { IAdmin } from "../models/admin";
import { AuthPermissions } from "../types";

const checkPerms = (permission: AuthPermissions, user: IAdmin) => {
  const { permissions } = user as IAdmin;
  return (
    permissions.includes(permission) ||
    permissions.includes("administrator") ||
    user.isOwner
  );
};

export default checkPerms;
