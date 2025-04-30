import ProductModel from '../models/product.model.js';

import { v2 as cloudinary } from 'cloudinary';
import { error } from "console";
import fs from 'fs';
import ProductColorModel from '../models/productColor.model.js';

cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true,
});

// image upload 
var imagesArr = [];
export async function uploadImages(request, response) {
    try {
        imagesArr = [];

        const image = request.files;

        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };
        for (let i = 0; i < image?.length; i++) {
            const img = await cloudinary.uploader.upload(
                image[i].path,
                options,
                function (error, result) {
                    imagesArr.push(result.secure_url);
                    fs.unlinkSync(`uploads/${request.files[i].filename}`);
                }
            );
        } 

        return response.status(200).json({
            images: imagesArr
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// delete images
export async function removeImageFromCloudinary(request, response) {
    const imgUrl = request.query.img;

    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];

    const imageName = image.split(".")[0];

    if (imageName) {
        const res = await cloudinary.uploader.destroy(
            imageName,
            (error, result) => {
                // console.log(error, res)
            }
        );

        if (res) {
           imagesArr = imagesArr.filter(image => image !== imgUrl);
    
            return response.status(200).json({
                images: imagesArr,
            });
        }
    }
}

// create product 
export async function createProduct(request, response) {
    try {
        let product = new ProductModel({
            name: request.body.name,
            description: request.body.description,
            images: imagesArr,
            brand: request.body.brand,
            price: request.body.price,
            oldPrice: request.body.oldPrice,
            catName: request.body.catName,
            catId: request.body.catId,
            subCatId: request.body.subCatId,
            subCat: request.body.subCat,
            thirdsubCat: request.body.thirdsubCat,
            countInStock: request.body.countInStock,
            rating: request.body.rating,
            isFeatured: request.body.isFeatured,
            discount: request.body.discount,
            color: request.body.color,
            productWeight: request.body.productWeight,

        });

        product = await product.save();

        if (!product) {
            response.status(500).json({
                error: true,
                success: false,
                message:"Tạo sản phẩm không thành công!"
            });
        }

        imagesArr = [];

        response.status(200).json({
            message: "Tạo sản phẩm thành công!",
            error: false,
            success: true,
            product: product
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true, 
            success: false
        })
    }
}

// get all products
export async function getAllProducts(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage);
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage); // ceil() làm tròn lên >< floor(): tròn xuống


        if (page > totalPages) {
            return response.status(404).json(
                {
                    message: "Không tìm thấy trang",
                    success: false,
                    error: true
                }
            );
          }

        const products = await ProductModel.find().populate("category")
            .sort({ createdAt: -1 }) // sắp xếp từ mới đến cũ
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if(!products) {
            response.status(500).json({
                error:true, 
                success: false
            })
        }

        return response.status(200).json({
            error: false, 
            success: true,
            data: products,
            totalPages: totalPages,
            page: page,
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// get all products by category id
export async function getAllProductsByCatId(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage); // ceil() làm tròn lên >< floor(): tròn xuống

        if (page > totalPages) {
            return response.status(404).json(
                {
                    message: "Không tìm thấy trang",
                    success: false,
                    error: true
                }
            );
          }

        const products = await ProductModel.find({
            catId: request.params.id        
        }).populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if(!products) {
            response.status(500).json({
                error:true, 
                success: false
            })
        }

        return response.status(200).json({
            error: false, 
            success: true,
            data: products,
            totalPages: totalPages,
            page: page,
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// export async function getAllProductsByCatId(request, response) {
//     try {
//       const { id } = request.params;
  
//       // Kiểm tra ID hợp lệ
//       if (!mongoose.Types.ObjectId.isValid(id)) {
//         return response.status(400).json({
//           message: 'ID danh mục không hợp lệ',
//           error: true,
//           success: false,
//         });
//       }
  
//       const page = parseInt(request.query.page) || 1;
//       const perPage = parseInt(request.query.perPage) || 10000;
  
//       // Đếm tổng sản phẩm theo catId
//       const totalPosts = await ProductModel.countDocuments({ catId: id });
//       const totalPages = Math.ceil(totalPosts / perPage);
  
//       if (page > totalPages && totalPages !== 0) {
//         return response.status(404).json({
//           message: 'Không tìm thấy trang',
//           success: false,
//           error: true,
//         });
//       }
  
//       const products = await ProductModel.find({ catId: id })
//         .populate('category')
//         .skip((page - 1) * perPage)
//         .limit(perPage)
//         .exec();
  
//       // Check nếu không có sản phẩm nào
//       if (products.length === 0) {
//         return response.status(404).json({
//           message: 'Không tìm thấy sản phẩm nào',
//           error: true,
//           success: false,
//         });
//       }
  
//       return response.status(200).json({
//         error: false,
//         success: true,
//         data: products,
//         totalPages,
//         page,
//       });
//     } catch (error) {
//       return response.status(500).json({
//         message: error.message || error,
//         error: true,
//         success: false,
//       });
//     }
// }

// get all products by category name
export async function getAllProductsByCatName(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json(
                {
                    message: "Page not found",
                    success: false,
                    error: true
                }
            );
          }
        
        const products = await ProductModel.find({
            catName:request.query.catName        
        }).populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if(!products) {
            response.status(500).json({
                error:true, 
                success: false
            })
        }

        return response.status(200).json({
            error: false, 
            success: true,
            data: products,
            totalPages: totalPages,
            page: page,
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// get all products by sub category id 
export async function getAllProductsBySubCatId(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json(
                {
                    message: "Page not found",
                    success: false,
                    error: true
                }
            );
          }

        const products = await ProductModel.find({
            subCatId: request.query.id        
        }).populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if(!products) {
            response.status(500).json({
                error:true, 
                success: false
            })
        }

        return response.status(200).json({
            error: false, 
            success: true,
            data: products,
            totalPages: totalPages,
            page: page,
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// get all products by sub category name 
export async function getAllProductsBySubCatName(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json(
                {
                    message: "Page not found",
                    success: false,
                    error: true
                }
            );
          }

        const products = await ProductModel.find({
            subCat: request.query.subCat      
        }).populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if(!products) {
            response.status(500).json({
                error:true, 
                success: false
            })
        }

        return response.status(200).json({
            error: false, 
            success: true,
            data: products,
            totalPages: totalPages,
            page: page,
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// get all products by thirdLavel category id 
export async function getAllProductsByThirdLavelCatId(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json(
                {
                    message: "Page not found",
                    success: false,
                    error: true
                }
            );
          }

        const products = await ProductModel.find({
            thirdsubCatId: request.params. thirdsubCatId      
        }).populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if(!products) {
            response.status(500).json({
                error:true, 
                success: false
            })
        }

        return response.status(200).json({
            error: false, 
            success: true,
            data: products,
            totalPages: totalPages,
            page: page,
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// get all products by sub thirdLavel category name 
export async function getAllProductsByThirdLavelCatName(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json(
                {
                    message: "Page not found",
                    success: false,
                    error: true
                }
            );
          }

        const products = await ProductModel.find({
            thirdsubCat: request.query.thirdsubCat      
        }).populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if(!products) {
            response.status(500).json({
                error:true, 
                success: false
            })
        }

        return response.status(200).json({
            error: false, 
            success: true,
            data: products,
            totalPages: totalPages,
            page: page,
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// get all products by price 
export async function getAllProductsByPrice(request, response) {
    let productList = [];

    if (request.query.catId !== "" && request.query.catId !== undefined) {
        const productListArr = await ProductModel.find({
            catId: request.query.catId,
        }).populate("category");

        productList = productListArr;
    }

    if (request.query.subCatId !== "" && request.query.subCatId !== undefined) {
        const productListArr = await ProductModel.find({
            subCatId: request.query.subCatId,
        }).populate("category");

        productList = productListArr;
    }

    if (request.query.thirdsubCatId !== "" && request.query.thirdsubCatId !== undefined) {
        const productListArr = await ProductModel.find({
            thirdsubCatId: request.query.thirdsubCatId,
        }).populate("category");

        productList = productListArr;
    }


    const filteredProducts = productList.filter((product) => {
        if (request.query.minPrice && product.price < parseInt(+request.query.minPrice)) {
            return false; // loaị khỏi mảng nếu giá sp < minPrice
        }
        if (request.query.maxPrice && product.price > parseInt(+request.query.maxPrice)) {
            return false;
        }
        return true;
    });

    return response.status(200).json({
        error:false, 
        success:true, 
        products: filteredProducts,
        totalPages: 0,
        page: 0,
    });
}




// get all products by rating 
export async function getAllProductsByRating(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json(
                {
                    message: "Page not found",
                    success: false,
                    error: true
                }
            );
          }


          let products=[];

          if(request.query.catId!==undefined) {
            products = await ProductModel.find({
                rating: request.query.rating,
                catId: request.query.catId,

            }).populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();
          }

          if(request.query.subCatId!==undefined) {
            products = await ProductModel.find({
                rating: request.query.rating,
                subCatId: request.body.subCatId,

            }).populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();
          }


          if(request.query.thirdsubCatId!==undefined) {
            products = await ProductModel.find({
                rating: request.query.rating,
                thirdsubCatId: request.body.thirdsubCatId,

            }).populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();
          }
             

        

        if(!products) {
            response.status(500).json({
                error:true, 
                success: false
            })
        }

        return response.status(200).json({
            error: false, 
            success: true,
            data: products,
            totalPages: totalPages,
            page: page,
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// get all products count 
export async function getProductsCount(request, response) {
    try {
        const productsCount = await ProductModel.countDocuments();

        if (!productsCount) {
            response.status(500).json({
                error:true,
                success:false
            })
        }

        return response.status(200).json({
            error: false, 
            success: true, 
            productsCount:productsCount 
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true, 
            success: false
        })
    }
}
 


// get all features products
export async function getAllFeaturedProducts(request, response) {
    try {

        const products = await ProductModel.find({
            isFeatured: true      
        }).populate("category");
            

        if(!products) {
            response.status(500).json({
                error:true, 
                success: false
            })
        }

        return response.status(200).json({
            error: false, 
            success: true,
            products: products,
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// delete product
export async function deleteProduct(request, response) {
    const product = await ProductModel.findById(request.params.id).populate("category");

    if(!product) {
        return response.status(404).json({
            message:"Không tìm thấy sản phẩm!",
            error: true,
            success: false
        })
    }

    const images = product.images;
    
    let img="";
    for (img of images) {
        const imgUrl = img;
        const urlArr = imgUrl.split("/");
        const image = urlArr[urlArr.length - 1];

        const imageName = image.split(".")[0];

        if (imageName) {
            cloudinary.uploader.destroy(imageName, (error, result) => {
                // console.log(error, result);
            });
        }        
    }

    const deleteProduct = await ProductModel.FindByIdAndDelete(request.params.id);

    if (!deleteProduct) {
        response.status(404).json({
            message: "Sản phẩm không thể xóa!",
            success: false,
            error: true
        });
    }

    return response.status(200).json({
        success: true, 
        error: false,
        message: "Xóa sản phẩm thành công!",
    });
}

//delete multiple products
export async function deleteMultipleProduct(request, response) {
    const { ids } = request.body;

    if (!ids || !Array.isArray(ids)) {
        return response.status(400).json({ error: true, success: false, message: 'Invalid input' });
    }

    for (let i=0; i<ids?.length; i++){
        const product = await ProductModel.findById(ids[i]);
        const images = product.images;
        let img = "";

        for (img of images) {
            const imgUrl = img;
            const urlArr = imgUrl.split("/");
            const image = urlArr[urlArr.length - 1];

            const imageName = image.split(".")[0];

            if(imageName) {
                cloudinary.uploader.destroy(imageName, (error, result) => {

                })
            }
        }

    }

    try {
        await ProductModel.deleteMany({ _id: { $in: ids } });

        return response.status(200).json({
        message: "Xóa sản phẩm thành công", 
        error: false,
        success: true
        })
    } catch (error) {
        return response.status(500).json({ 
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// get single product
export async function getProduct(request, response) {
    try {
        const product = await ProductModel.findById(request.params.id).populate("category");

        if(!product) {
            return response.status(404).json({
                message:"Không tìm thấy sản phẩm!",
                error: true,
                success: false
            })
        }
        
        return response.status(200).json({
            error: false,
            success: true,
            data: product
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// update product
export async function updateProduct(request, response) {
    try {
        const product = await ProductModel.findByIdAndUpdate(
            request.params.id,
            {
                name: request.body.name,
                description: request.body.description,
                images: imagesArr,
                brand: request.body.brand,
                price: request.body.price,
                oldPrice: request.body.oldPrice,
                catName: request.body.catName,
                catId: request.body.catId,
                subCatId: request.body.subCatId,
                subCat: request.body.subCat,
                category: request.body.category,
                thirdsubCat: request.body.thirdsubCat,
                countInStock: request.body.countInStock,
                rating: request.body.rating,
                isFeatured: request.body.isFeatured,
                discount: request.body.discount,
                color: request.body.color,
                productWeight: request.body.productWeight,
            },
            { new: true }
        );

        if (!product) {
             return response.status(404).json({
                message: "Không thể cập nhật sản phẩm!",
                status: false,
            });
        }

        imagesArr = [];

        return response.status(200).json({
            message:"Cập nhật sản phẩm thành công!",
            error: false,
            success: true ,
            data: product
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false 
        })
    }
}

export async function createProductColor (request, response) { 
    try {
        let productColor = new ProductColorModel({ 
            name: request.body.name
        })

        productColor = await productColor.save();

        if (!productColor) {
            response.status(500).json({
                error: true,
                success: false,
                message: "Product Color Not created"
            });
        }
  
        return response.status(200).json({
            message: "Tạo thành công",
            error: false,
            success: true,
            data: productColor
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false 
        })
    }
}

export async function deleteProductColor (request, response) {
    const productColor = await ProductColorModel.findById(request.params.id);

    if (!productColor) {
        return response.status(404).json({
            message: "Item Not found",
            error: true,
            success: false
        })
    }

    const deletedProductColor = await ProductColorModel.findByIdAndDelete(request.params.id);

    if (!deletedProductColor) {
        response.status (404).json({
            message: "Item not deleted!",
            success: false,
            error: true
        });
    }

    return response.status(200).json({
        success: true,
        error: false,
        message: "Xóa thành công",
    });
}    

//delete multiple productColor 
export async function deleteMultipleProductColor (request, response) {
    const { ids } = request.body;
    if (!ids || !Array.isArray(ids)) {

        return res.status (400).json({ 
            error: true, 
            success: false, 
            message: 'Invalid input' 
        });
    }

    try {
        await ProductColorModel.deleteMany({ _id: { $in: ids } });
        return response.status (200).json({
            message: "Xóa thành công",
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function updateProductColor(request, response) {

    try {
        const productColor = await ProductColorModel.findByIdAndUpdate( 
            request.params.id,
            {
               name: request.body.name,
            },{ new: true }
        );

        if (!productColor) {
            return response.status(404).json({
                message: "the product weight can not be updated!", 
                status: false,
            });
        }

        return response.status (200).json({
            message: "Cập nhật thành công",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getProductColor(request, response) {
    try {
        const productColor = await ProductColorModel.find();

        if(!productColor){
        return response.status(500).json({
            error: true,
            success: false
        })
    }

    return response.status(200).json({
        error: false,
        success: true, 
        data:productColor
    })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getProductColorById(request, response) {
    try {
        const productColor = await ProductColorModel.findById(request.params.id);
        if(!productColor){
            return response.status(500).json({
                error: true,
                success: false
            })
        }
        return response.status(200).json({
            error: false,
            success: true,
            data:productColor
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function filters(request, response) {
    const {catId, subCatId, thirdsubCatId, minPrice, maxPrice, rating, page, limit} = request.body;

    const filters = {};

    if(catId?.length){
        filters.catId = {$in: catId}
    };

    if(subCatId?.length){
        filters.subCatId = {$in: subCatId}
    };

    if(thirdsubCatId?.length){
        filters.thirdsubCatId = {$in: thirdsubCatId}
    };

    if(minPrice || maxPrice){
        filters.price = {$gte: +minPrice || 0, $lte: +maxPrice || Infinity}
    };

    if(rating?.length){
        filters.rating = {$in: rating}
    };

    try {

        const products = await ProductModel.find(filters).populate("category").skip((page - 1) * limit).limit(parseInt(limit));
        const total = await ProductModel.countDocuments(filters);
        return response.status (200).json({
            error: false, 
            success:true,
            data: products,
            total:total,
            page:parseInt(page) || 1,
            totalPages: Number.isFinite(total / limit) ? Math.ceil(total / limit) : 1
            // totalPages:Math.ceil(total/limit) 
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
    
const sortItems = (products, sortBy, order) => { 
    let updatedProducts = products.map(product => {
        const newProduct = { ...product };
        if (newProduct.price === 0 && newProduct.oldPrice) {
            newProduct.price = newProduct.oldPrice;
        }
        return newProduct;
    });

    if (sortBy === "isFeatured") {
        updatedProducts = products.filter(product => product.isFeatured === true);
    }

    return updatedProducts.sort((a, b) => {
        if (sortBy === 'name') {
            return order === 'asc' 
                ? a.name.localeCompare(b.name) 
                : b.name.localeCompare(a.name)
        }
        if (sortBy === "price") {
            return order === 'asc' ? a.price - b.price: b.price - a.price
        }
       
        if (sortBy === "isFeatured") {
            return order === 'asc' ? a.price - b.price: b.price - a.price
        }

        return 0;
    })
}

export async function sortBy(request, response) {
    const { products, sortBy, order } = request.body;
    console.log(products)
    const sortedItems = sortItems([... products], sortBy, order);
    
    const total = await sortedItems?.length;

    return response.status(200).json({
        error: false,
        success:true,
        data: sortedItems,
        page:0,
        totalPages:0
    })
}    

export async function searchProductController(request, response) {
    try {
        const { query, page, limit} = request.body;

        if (!query) {
            return response.status(400).json({
                error: true,
                success: false,
                message: "Không nhận được yêu cầu"
            })
        }

        const items  = await ProductModel.find({
            $or: [
                { name: {$regex: query, $options: "i"}},
                { brand: { $regex: query, $options: "i"}},
                { catName: {$regex: query, $options: "i"}},
            ],
        })
        .populate("category").skip((page - 1) * limit).limit(parseInt(limit));

        const total = await items?.length;

        return response.status(200).json({
            error: false, 
            success: true, 
            data: items,
            total:total,
            page:parseInt(page) || 1,
            totalPages: Number.isFinite(total / limit) ? Math.ceil(total / limit) : 1
        })
        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function updatedProduct(request, response) {
  const product = await ProductModel.findByIdAndUpdate(
    request.params.id,
    {
      status: request.body.status,
    },
    { new: true }
  );

  if (!product) {
    return response.status(500).json({
      message: "Không tìm thấy",
      success: false,
      error: true,
    });
  }

  response.status(200).json({
    error: false,
    success: true,
    data:  product,
  });
}
    
    