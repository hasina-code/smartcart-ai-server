import { Types } from "mongoose";

export interface IProduct {
  title: string;

  shortDescription: string;

  description: string;

  category: string;

  brand: string;

  image: string;

  price: number;

  rating: number;

  // stock: number;

  tags: string[];


  createdBy: Types.ObjectId;

  createdAt?: Date;

  updatedAt?: Date;
}