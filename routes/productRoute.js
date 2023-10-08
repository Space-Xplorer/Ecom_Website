import express from "express";
import formidable from "express-formidable";
import {
  addToCartController,
  createProductController,
  deleteProductController,
  filterProductController,
  getCartController,
  getPhotoController,
  PaymentVerifyController,
  productCategoryController,
  productController,
  productCountController,
  productPageController,
  RazorPaymentController,
  searchProductController,
  similarProductsController,
  singleProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.get("/products", productController);
router.get("/single-product/:slug", singleProductController);
router.get("/get-photo/:pid", getPhotoController);
router.delete('/delete-product/:pid',requireSignIn,isAdmin,deleteProductController)
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
  );
router.post('/filter-product',filterProductController);
router.get('/product-count',productCountController);
router.get('/product-list/:page',productPageController);
router.post('/razorpay/payment',requireSignIn,RazorPaymentController);
router.post('/payment-verify',requireSignIn,PaymentVerifyController);
router.get('/search/:key',searchProductController);
router.get('/product-category/:slug',productCategoryController)
router.get('/:pid/:cid',similarProductsController);
router.get('/getkey',(req,res)=>res.status(200).send({
  key:process.env.BRAINTREE_MERCHANT_ID,
}))
router.post('/add-to-cart',requireSignIn,addToCartController);
router.post('/get-cart',requireSignIn,getCartController);

export default router;
