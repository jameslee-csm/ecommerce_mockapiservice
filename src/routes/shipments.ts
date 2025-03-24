import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Shipment from "../models/Shipment";

const router = Router();

const validateShipment = [
  body("shippingAddress").isObject(),
  body("shippingAddress.line1").isString().notEmpty(),
  body("shippingAddress.city").isString().notEmpty(),
  body("shippingAddress.postalCode").isString().notEmpty(),
  body("shippingAddress.state").isString().notEmpty(),
  body("shippingAddress.country").isString().notEmpty(),
  body("products").isArray(),
  body("products.*.sku").isString().notEmpty(),
  body("products.*.quantity").isInt({ min: 1 }),
];

router.post("/", validateShipment, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ Message: errors.array() });
  }

  try {
    const shipment = new Shipment(req.body);
    await shipment.save();
    res.json({ id: shipment.id });
  } catch (error) {
    res.status(500).json({ Message: "Internal server error" });
  }
});

export default router;
