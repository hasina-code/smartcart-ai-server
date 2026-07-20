import { Request, Response } from "express";
import { Product } from "../models/product.model";


// Create Product
export const createProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const user = (req as any).user;

    console.log("User:", user);
    console.log("Body:", req.body);

    const product = await Product.create({
      ...req.body,
      createdBy: user.id,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error: any) {
    console.error("Create Product Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};
// Get All Products
export const getAllProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      search,
      category,
      sort,
      page = "1",
      limit = "8",
    } = req.query;

    const query: any = {};

    // Search
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Category
    if (category) {
      query.category = category;
    }

    // Sorting
    let sortOption = {};

    if (sort === "low") {
      sortOption = { price: 1 };
    }

    if (sort === "high") {
      sortOption = { price: -1 };
    }

    const currentPage = Number(page);
    const perPage = Number(limit);

    const total = await Product.countDocuments(query);

  const products = await Product.find(query)
  .populate("createdBy", "name email")
  .sort(sortOption)
  .skip((currentPage - 1) * perPage)
  .limit(perPage);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
      pagination: {
        total,
        currentPage,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error,
    });
  }
};


      //   getFeaturedProducts

export const getFeaturedProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const products = await Product.find()
      .sort({ rating: -1 })
      .limit(4);

    res.status(200).json({
      success: true,
      message: "Featured products fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured products",
      error,
    });
  }
};

        //  getProductById

export const getProductById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate(
  "createdBy",
  "name email"
);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error,
    });
  }
};






export const getRelatedProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const related = await Product.find({
      category: product.category,
      _id: { $ne: id },
    }).limit(4);

    res.status(200).json({
      success: true,
      data: related,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed",
      error,
    });
  }
};


export const getMyProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const user = (req as any).user;

    const products = await Product.find({
      createdBy: user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};


export const deleteProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // শুধু Owner Delete করতে পারবে
    if (product.createdBy.toString() !== user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this product",
      });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};




export const updateProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const ownerId = product.createdBy.toString();

    console.log("Owner ID:", ownerId);
    console.log("User ID:", user.id);

    if (ownerId !== user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this product",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Update Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};