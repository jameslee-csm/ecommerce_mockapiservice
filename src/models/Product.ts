import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  createdAt: number;
  lastModifiedAt: number;
}

const ProductSchema: Schema = new Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Number, default: Date.now },
  lastModifiedAt: { type: Number, default: Date.now },
});

ProductSchema.pre("save", function (next) {
  this.lastModifiedAt = Date.now();
  next();
});

export default mongoose.model<IProduct>("Product", ProductSchema);
