import mongoose, { Schema, Document } from "mongoose";

interface Address {
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}

export interface ICustomer extends Document {
  name: string;
  billingAddress: Address;
  shippingAddress: Address;
  email: string;
  createdAt: number;
  lastModifiedAt: number;
}

const CustomerSchema: Schema = new Schema({
  name: { type: String, required: true },
  billingAddress: {
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  shippingAddress: {
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Number, default: Date.now },
  lastModifiedAt: { type: Number, default: Date.now },
});

CustomerSchema.pre("save", function (next) {
  this.lastModifiedAt = Date.now();
  next();
});

export default mongoose.model<ICustomer>("Customer", CustomerSchema);
