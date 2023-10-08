import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  userUpdateController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  getAllUsersController,
  emailVerificationController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import userModel from "../models/userModel.js";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/test",requireSignIn,isAdmin,testController);
//protected-route
router.get("/user-auth", requireSignIn,async (request, response) => {
  const user = await userModel.findById(request.user._id)
  if(user.role === 1) response.status(200).send({ ok: false });
  return response.status(200).send({ ok: true });
});
//protected-Admin-route
router.get("/admin-auth", requireSignIn,isAdmin, (request, response) => {
  return response.status(200).send({ ok: true });
});
router.post("/forgot-password", forgotPasswordController); 
router.put('/update-user',requireSignIn,userUpdateController)
router.get('/orders',requireSignIn,getOrdersController);
router.get('/all-orders', requireSignIn,isAdmin,getAllOrdersController);
router.put('/order-status/:orderId', requireSignIn,isAdmin,orderStatusController);
router.get('/users',getAllUsersController);
router.get('/verify/:unqStr',emailVerificationController);

export default router;
