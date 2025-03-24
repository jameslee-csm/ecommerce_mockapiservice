import mongoose, { Schema, Document } from "mongoose";

interface Address {
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}

interface ProductItem {
  sku: string;
  quantity: number;
}

export interface IShipment extends Document {
  id: string;
  shippingAddress: Address;
  products: ProductItem[];
  createdAt: number;
}

const ShipmentSchema: Schema = new Schema({
  shippingAddress: {
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  products: [
    {
      sku: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  createdAt: { type: Number, default: Date.now },
});

export default mongoose.model<IShipment>("Shipment", ShipmentSchema);
