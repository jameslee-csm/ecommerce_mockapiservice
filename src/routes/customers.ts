import { Router, Request, Response } from "express";
import Customer from "../models/Customer";

const router = Router();

router.post("/test", async (req: Request, res: Response) => {
  try {
    const customer = new Customer({
      name: "John Doe",
      email: "johndoe@gmail.com",
      billingAddress: {
        line1: "123 Main St",
        city: "Anytown",
        postalCode: "12345",
        state: "CA",
        country: "USA",
      },
      shippingAddress: {
        line1: "123 Main St",
        city: "Anytown",
        postalCode: "12345",
        state: "CA",
        country: "USA",
      },
    });

    await customer.save();
    res.json(customer);
  } catch (error) {
    res.status(500).json({ Message: "Internal server error" });
  }
});

router.get("/test", async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findOne();
    res.json(customer);
  } catch (error) {
    res.status(500).json({ Message: "Internal server error;aslkdf;lksajdf" });
  }
});

router.get("/:customerId", async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findById(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ Message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ Message: "Internal server error" });
  }
});

export default router;
