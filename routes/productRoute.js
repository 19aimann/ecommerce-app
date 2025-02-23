import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import express from "express";
import { brainTreePaymentController,  braintreeTokenController,  createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controller/productController.js";
import formidable from "express-formidable";


const router = express.Router();




router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController);
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController);


router.get("/get-product", getProductController);

router.get("/get-product/:slug", getSingleProductController);


router.get("/product-photo/:pid", productPhotoController);


router.delete("/delete-product/:pid", deleteProductController);



router.post("/product-filters",productFiltersController);


router.get("/product-count",productCountController);


router.get("/product-list/:page", productListController);

router.get("/search/:keyword",searchProductController);

router.get('/related-product/:pid/:cid',relatedProductController)



router.get('/product-category/:slug',productCategoryController)


//token
router.get("/braintree/token", braintreeTokenController);


router.post("/braintree/payment", requireSignIn, brainTreePaymentController);


export default router;