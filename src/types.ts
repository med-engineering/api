type AuthPermissions =
  | "owner"
  | "administrator"
  | "logs"
  | "services"
  | "rooms"
  | "machines"
  | "machine_status"
  | "read_machine_reports"
  | "post_machine_reports"
  | "manage_machine_reports";

const authPermissions: AuthPermissions[] = [
  "owner",
  "administrator",
  "logs",
  "services",
  "rooms",
  "machines",
  "machine_status",
  "read_machine_reports",
  "post_machine_reports",
  "manage_machine_reports",
];

const activityLogActions = [
  "CATEGORY_CREATED",
  "CATEGORY_UPDATED",
  "CATEGORY_DELETED",
  "ARTICLE_CREATED",
  "ARTICLE_DELETED",
];

export { authPermissions, activityLogActions };
export type { AuthPermissions };
