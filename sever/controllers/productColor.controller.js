import { request, response } from "express";
import ProductColorModel from "../models/productColor.model.js";
import ProductModel from "../models/product.model.js";


export const addProductColorController = async (request, response) => {

    try{
        const{ name, countInStock, productId} = 
        request.body;

        if (!name || !countInStock || !productId) {
            return response.status(500).json({
                message: "Vui lòng điền đầy đủ thông tin",
                error: true,
                success: false
            })
        }

        const proColor = new ProductColorModel({
            name, countInStock, productId
        })

        const savedProColor = await proColor.save();

        const updateProductColor = await ProductModel.updateOne(
          { _id: productId },
          {
            $push: {
              color: savedProColor?._id,
            },
          }
        );

        return response.status(200).json({
            data: savedProColor,
            message: "Thêm biến thể thành công",
            error: false,
            success: true,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function deleteProductColor(request, response) {

  const  productColor = await ProductColorModel.findByIdAndDelete(request.params.id);
  if (!productColor) {
    response.status(404).json({
      message: "Không tìm thấy!",
      success: false,
      error: true,
    });
  }

  response.status(200).json({
    success: true,
    error: false,
    message: "Đã xóa thành công!",
  });
}


