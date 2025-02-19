import express from "express";
import { ROLES } from "../../constant/enum";
import AdminController from "../../controller/admin.controller/admin.controller";
import { authorizeUser } from "../../middleware/auth.middleware";
const router = express.Router();

router.get(
  "/admin/all-users",
  authorizeUser([ROLES.ADMIN, ROLES.SUDO_ADMIN]),
  AdminController?.getAlluser
);
export default router;
