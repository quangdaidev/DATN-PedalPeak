import { request, response } from "express";
import AddressModel from "../models/address.model.js" ;
import UserModel from "../models/user.model.js";

export const addAddressController = async (request, response) => {

    try{
        const{ street, ward, district, city, mobile, note, status, userId, selected} = 
        request.body;

        if (!street || !ward || !district || !city || !mobile || !userId) {
            return response.status(500).json({
                message: "Vui lòng điền đầy đủ thông tin",
                error: true,
                success: false
            })
        }

        const address = new AddressModel({
            street, ward, district, city, mobile, note, status, userId, selected
        })

        const savedAddress = await address.save();

        const updateAddresstUser = await UserModel.updateOne(
            { _id: userId },
            {
                $push: {
                  address_details: savedAddress?._id,
                },
            });

        return response.status(200).json({
            data: savedAddress,
            message: "Thêm địa chỉ thành công",
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

export const getAddressController = async (request, response) => {

    try{
        
        const address = await AddressModel.find({userId:request?.query?.userId});

        if(!address){
            return response.status({
                error: true,
                success: false,
                message: "address not found"
            })
        } else {
            const updateUser = await UserModel.updateOne({_id: request?.query?.userId}, {
                $push: {
                    address: address?._id
                }
            })

            return response.status(200).json({
                error:false,
                success: true,
                data: address
            })
        }

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const selectAddressController = async (request, response) => {
    try {

        const userId = request.userId;

        const address = await AddressModel.find({
            _id:request.params.id,
            userId: userId,
        })

        const updateAddress = await AddressModel.find(
            {
                userId: userId
            }
        )


        if(!address){
            return response.status(500).json({
                message: error.message || error,
                error: true,
                success: false
            })
        } else {
            const updateAddress = await AddressModel.findByIdAndUpdate(
                request.params.id,
                {
                   selected: request?.body?.selected,
                },
                { new: true}
            )

            return response.json({
                error: false,
                success: true,
                data: updateAddress
            })
        }

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const deleteAddressController = async (request, response) => {
    try {
    //   const userId = request.userId;
      const  _id  = request.params.id;
  
      if (!_id) {
        return response.status(400).json({
          message: "provide _id",
          error: true,
          success: false,
        });
      }
  
      const deleteItem = await AddressModel.deleteOne({
        _id: _id,
        // userId: userId,
      });
      if (deleteItem.deletedCount === 0) {
        return response.status(404).json({
          message: "The address is not found",
          error: true,
          success: false,
        });
      }
  
      return response.json({
        message: "Xóa địa chỉ thành công",
        error: false,
        success: true,
        data: deleteItem,
      });
    } catch (error) {
      return response.status(500).json({
        message: error.message || error,
        error: true,
        success: false,
      });
    }
  };