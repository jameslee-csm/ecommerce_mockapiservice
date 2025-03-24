import { Router, Request, Response } from "express";
import Product from "../models/Product";
import { body, validationResult } from "express-validator";

const router = Router();

// validate the request body
const validateProduct = [
  body("name").isString().notEmpty(),
  body("price").isFloat({ min: 0 }),
];

// get a product by id
router.get("/:productId", async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ Message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ Message: "Internal server error" });
  }
});

// get all products
router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ Message: "Internal server error" });
  }
});

// create a new product
router.post("/", validateProduct, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ Message: errors.array() });
  }
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ Message: "Internal server error" });
  }
});

export default router;
