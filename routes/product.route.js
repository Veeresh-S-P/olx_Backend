const { Router } = require("express");
const productRoute = Router();
const { auth } = require("../middlewares/auth.middleware");
const { addproduct, editproduct, deleteproduct, getproduct } = require("../controllers/product.controller");

productRoute.post("/products", auth, addproduct);
productRoute.patch("/products/:id", auth, editproduct);
productRoute.delete("/products/:id", auth, deleteproduct);
productRoute.get("/products", auth, getproduct);

module.exports = { productRoute };