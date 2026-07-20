import { Schema, model } from "mongoose";
import { IProduct } from "../interfaces/product.interface";

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    rating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    tags: {
      type: [String],
      default: [],
    },

    // ✅ Add this
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct>("Product", productSchema);