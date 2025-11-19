import { Router } from "express";
import { AdminController } from "../controllers/admin/AdminControlle";
import { validateRequest } from "../middleware/validateRequest";
import { LoginAdminSchema } from "../../application/validators/AdminValidator";

const router = Router();
const controller = new AdminController();


router.post("/login", validateRequest(LoginAdminSchema), (req, res, next) =>
  controller.login(req, res, next)
);


export { router as adminRoutes };
