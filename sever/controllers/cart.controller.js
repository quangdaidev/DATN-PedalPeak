import { request } from "http";
import CartProductModel from "../models/cart.model.js";
import UserModel from "../models/user.model.js";

import { response } from "express";

export const addToCartItemController = async (request, response) => {
  try {
    const userId = request.userId; //middleware
    const { productTitle, image, price, quantity, subTotal, productId, color, reviews} = request.body;

    if (!productId) {
      return response.status(402).json({
        message: "Provide productId",
        error: true,
        success: false,
      });
    }

    const checkItemCart = await CartProductModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (checkItemCart) {
      return response.status(400).json({
        message: "Sản phẩm đã có trong giỏ hàng",
      });
    }
    const cartItem = new CartProductModel({
      productTitle:productTitle,
      image: image,
      price: price,
      quantity: quantity,
      color: color,
      colorChose:color[0].name,
      subTotal: subTotal,
      productId: productId,
      userId: userId,
      reviews: reviews
    });
    
    const save = await cartItem.save();

    // const updateCartUser = await UserModel.updateOne(
    //   { _id: userId },
    //   {
    //     $push: {
    //       shopping_cart: productId,
    //     },
    //   }
    // );

    return response.status(200).json({
      data: save,
      message: "Thêm giỏ hàng thành công",
      error: false,
      success: true,
    });
    
  } catch (error) {
    return response.status(500).json({
      message: error.massage || error,
      error: true,
      success: false,
    });
  }
};

export const getCartItemController = async (request, response) => {
  try {
    const userId = request.userId;

    // const cartItems = await CartProductModel.find({
    //   userId: userId,
    // }).populate("productId");

    const cartItems = await CartProductModel.find({
      userId: userId,
    }).populate("productId color reviews");


    return response.json({
      data: cartItems,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.massage || error,
      error: true,
      success: false,
    });
  }
};

export const updateCartItemQtyController = async (request, response) => {
  try {
    const userId = request.userId;
    const { _id, qty,subTotal } = request.body;

    if (!_id || !qty) {
      return response.status(400).json({
        message: "provide _id, qty",
      });
    }
    // const updateCartItem = await CartProductModel.updateOne(
    //   {
    //     id: _id,
    //     userId: userId,
    //   },
    //   {
    //     quantity: qty,
    //   }
    // );

    const updateCartItem = await CartProductModel.findByIdAndUpdate(
        _id,
        {
          quantity: qty,
          subTotal: subTotal
        },
        { new: true }
      );

    return response.json({
      message: "Cập nhật số lượng thành công",
      success: true,
      error: false,
      data: updateCartItem,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.massage || error,
      error: true,
      success: false,
    });
  }
};

export const updateCartItemColorController = async (request, response) => {
  try {
    const userId = request.userId;
    const { _id, color} = request.body;

    if (!_id || !color) {
      return response.status(400).json({
        message: "provide _id, color",
      });
    }
    // const updateCartItem = await CartProductModel.updateOne(
    //   {
    //     id: _id,
    //     userId: userId,
    //   },
    //   {
    //     quantity: qty,
    //   }
    // );

    const updateCartItem = await CartProductModel.findByIdAndUpdate(
        _id,
        {
          colorChose: color,
        },
        { new: true }
      );

    return response.json({
      message: "Cập nhật màu thành công",
      success: true,
      error: false,
      data: updateCartItem,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.massage || error,
      error: true,
      success: false,
    });
  }
};

export const deleteCartItemQtyController = async (request, response) => {
  try {
    const userId = request.userId;
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({
        message: "provide id",
        error: true,
        success: false,
      });
    }

    const deleteCartItem = await CartProductModel.deleteOne({
      _id: id,
      userId: userId,
    });
    if (!deleteCartItem) {
      return response.status(404).json({
        message: "The product in cart is not found",
        error: true,
        success: false,
      });
    }

    // const user = await UserModel.findOne({
    //   _id: userId,
    // });

    // const cartItems = user?.shopping_cart;

    // const updatedUserCart = [
    //   ...cartItems.slice(0, cartItems.indexOf(productId)),
    //   ...cartItems.slice(cartItems.indexOf(productId) + 1),
    // ];

    // user.shopping_cart = updatedUserCart;
    // await user.save();

    return response.json({
      message: "Xóa sản phẩm thành công",
      error: false,
      success: true,
      data: deleteCartItem,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.massage || error,
      error: true,
      success: false,
    });
  }
};

export const emptyCartController = async (request, response) => {
  try {
    const userId = request.params.id;

    await CartProductModel.deleteMany({userId:userId})

    return response.status(200).json({
      error: false,
      success: true,
    })
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}
