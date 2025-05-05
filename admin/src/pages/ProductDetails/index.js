import React, { useEffect, useRef, useState } from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";

import Slider from "react-slick";
import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import UserAvatarImgComponent from "../../components/userAvatarImg";
import Rating from "@mui/material/Rating";
import { FaReply } from "react-icons/fa";
import { MdFilterVintage } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { FaWeightScale } from "react-icons/fa6";
import { MdTipsAndUpdates } from "react-icons/md";
import { MdWarehouse } from "react-icons/md";

// import { MdPhotoSizeSelectActual } from "react-icons/md";
// import { IoIosPricetags } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { BsPatchCheckFill } from "react-icons/bs";
import { fetchDataFromApi } from "../../utils/api";

import { useParams } from 'react-router-dom';

//breadcrumb code
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});


const ProductDetails = () => {
  const productSliderBig = useRef();
  const productSliderSml = useRef();

  const { id } = useParams();
  const [proData, setProData] = useState([]);

  var productSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  var productSliderSmlOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };

  const goToSlide = (index) => {
    productSliderBig.current.slickGoTo(index);
    productSliderSml.current.slickGoTo(index);
  };

 
  useEffect(() => {
    window.scrollTo(0, 0); //cuộn trang đến vị trí góc trên bên trái của trang

    fetchDataFromApi(`/api/product/${id}`).then((res)=>{
      setProData(res.data);
      // console.log("props:::",proData)
  
      console.log(res.data)
    })
  }, [id]);

  const dateCre = new Date(proData.dateCreated);

  // Định dạng theo kiểu ngày/tháng/năm
  const formattedDateCre = dateCre.toLocaleDateString('vi-VN');

  const dateUp = new Date(proData.updatedAt);

  // Định dạng theo kiểu ngày/tháng/năm
  const formattedDateUp = dateUp.toLocaleDateString('vi-VN');
  

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 res-col">
          <h5 className="mb-0">Chi tiết sản phẩm</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Tổng quan"
              icon={<HomeIcon fontSize="small" />}
            />

            <StyledBreadcrumb label="Sản phẩm" component="a" href="#" />
            <StyledBreadcrumb label="Chi tiết" />
          </Breadcrumbs>
        </div>

        <div className="card productDetailsSEction">
          <div className="row">
            <div className="col-md-5">
              <div className="sliderWrapper pt-3 pb-3 pl-4 pr-4">
                <h6 className="mb-4">Danh mục ảnh</h6>
                <Slider
                  {...productSliderOptions}
                  ref={productSliderBig}
                  className="sliderBig mb-2"
                >
             
                {
                  proData?.images?.length !== 0 &&  proData?.images?.map((item, index) => {
                      return (
                        <div className="item">
                          <img
                            src={item} alt=""
                            className="w-100"
                          />
                        </div>
                      )
                  })
                }
                 
                </Slider>
                <Slider
                  {...productSliderSmlOptions}
                  ref={productSliderSml}
                  className="sliderSml"
                >
                  {
                    proData?.images?.length !== 0 &&  proData?.images?.map((item, index) => {
                      console.log("index::",index+1)
                        return (
                          <div className="item" onClick={() => goToSlide(index)}>
                            <img
                              src={item} alt=""
                              className="w-100"
                            />
                          </div>
                        )
                    })
                  }
                
                </Slider>
              </div>
            </div>

            <div className="col-md-7">
              <div className=" pt-3 pb-3 pl-4 pr-4">
                <h6 className="mb-4">Chi tiết sản phẩm</h6>

                <h4>
                 {proData?.name}
                </h4>

                <div className="productInfo mt-4">
                  <div className="row mb-2">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <MdBrandingWatermark />
                      </span>
                      <span className="name">Thương hiệu</span>
                    </div>

                    <div className="col-sm-9">
                      <span> {proData?.brand}</span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <BiSolidCategoryAlt />
                      </span>
                      <span className="name">Danh mục</span>
                    </div>

                    <div className="col-sm-9">
                      <span> {proData?.catName}</span>
                    </div>
                  </div>

                  {/* <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <MdFilterVintage />
                      </span>
                      <span className="name">Tags</span>
                    </div>

                    <div className="col-sm-9">
                      <span>
                        <div className="row">
                          <ul className="list list-inline tags sml">
                            <li className="list-inline-item">
                              <span>Xe đạp</span>
                            </li>
                            <li className="list-inline-item">
                              <span>Đường phố</span>
                            </li>
                            <li className="list-inline-item">
                              <span>Thể thao</span>
                            </li>
                            <li className="list-inline-item">
                              <span>Giá rẻ</span>
                            </li>
                            <li className="list-inline-item">
                              <span>Xe đạp nam</span>
                            </li>
                            <li className="list-inline-item">
                              <span>Xe đạp nữ</span>
                            </li>
                          </ul>
                        </div>
                      </span>
                    </div>
                  </div> */}

                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <IoIosColorPalette />
                      </span>
                      <span className="name">Màu</span>
                    </div>

                    <div className="col-sm-9">
                      <span>
                        <div className="row">
                          <ul className="list list-inline tags sml">

                            {
                              proData?.color?.length !== 0 &&  proData?.color?.map((color,index)=>{
                                  return (
                                    <li className="list-inline-item"  key={index}>
                                      <span> {color.name + " (" + color.countInStock + ")"}</span>
                                    </li>
                                  )
                              })
                            }

                          </ul>
                        </div>
                      </span>
                    </div>
                  </div>
              
                  {/* <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <FaWeightScale />
                      </span>
                      <span className="name">Khối lượng</span>
                    </div>

                    <div className="col-sm-9">
                      <span>{proData?.catName==="Xe đạp trẻ em" ? "5 Kg" : "10 Kg"}</span>
                    </div>
                  </div> */}

                  {/* <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <MdWarehouse />
                      </span>
                      <span className="name">Tồn kho</span>
                    </div>

                    <div className="col-sm-9">
                      <span>{proData?.countInStock}</span>
                    </div>
                  </div> */}

                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <MdRateReview />
                      </span>
                      <span className="name">Bình luận</span>
                    </div>

                    <div className="col-sm-9">
                      <span>({ proData?.reviewsCount>0? proData?.reviewsCount:0}) Bình luận</span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <BsPatchCheckFill />
                      </span>
                      <span className="name">Ngày tạo</span>
                    </div>

                    <div className="col-sm-9">
                      <span>{formattedDateCre}</span>
                    </div>
                  </div>

                  {
                    proData?.updatedAt!==""
                    ?
                    <>
                      <div className="row">
                        <div className="col-sm-3 d-flex align-items-center">
                          <span className="icon">
                          <MdTipsAndUpdates />
                          </span>
                          <span className="name">Ngày cập nhật</span>
                        </div>

                        <div className="col-sm-9">
                          <span>{formattedDateUp}</span>
                        </div>
                      </div>
                    </>
                    : ""
                  }

                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h6 className="mt-4 mb-3">Mô tả sản phẩm</h6>
            <p>{proData?.description}</p>

            <br />

            <h6 className="mt-4 mb-4">Rating Analytics</h6>

            <div className="ratingSection">
              <div className="ratingrow d-flex align-items-center">
                <span className="col1">5 Star</span>

                <div className="col2">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>

                <span className="col3">(22)</span>
              </div>

              <div className="ratingrow d-flex align-items-center">
                <span className="col1">4 Star</span>

                <div className="col2">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>

                <span className="col3">(22)</span>
              </div>

              <div className="ratingrow d-flex align-items-center">
                <span className="col1">3 Star</span>

                <div className="col2">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>

                <span className="col3">(2)</span>
              </div>

              <div className="ratingrow d-flex align-items-center">
                <span className="col1">2 Star</span>

                <div className="col2">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "20%" }}
                    ></div>
                  </div>
                </div>

                <span className="col3">(2)</span>
              </div>

              <div className="ratingrow d-flex align-items-center">
                <span className="col1">1 Star</span>

                <div className="col2">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>

                <span className="col3">(2)</span>
              </div>
            </div>

            <br />

            <h6 className="mt-4 mb-4">Customer_reviews</h6>

            <div className="reviewsSecrion">
              <div className="reviewsRow">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex flex-column">
                      <div className="userInfo d-flex align-items-center mb-3">
                        <UserAvatarImgComponent
                          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE2CbGBE9Rw_Tz6WVrnPIhY4iF4bMtwiYuS0dGTQ4WLn37GB-5z6pwuFBqQxdKDW1n4Qs&usqp=CAU"
                          lg={true}
                        />

                        <div className="info pl-3">
                          <h6>Miron Mahmud</h6>
                          <span>25 minutes ago!</span>
                        </div>
                      </div>

                      <Rating
                        name="read-only"
                        value={4.5}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-5 d-flex align-items-center">
                    <div className="ml-auto">
                      <Button className="btn-blue btn-big btn-lg ml-auto">
                        <FaReply /> &nbsp; Reply
                      </Button>
                    </div>
                  </div>

                  <p className="mt-3">Lorem ipsum dolor sit</p>
                </div>
              </div>

              <div className="reviewsRow reply">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex flex-column">
                      <div className="userInfo d-flex align-items-center mb-3">
                        <UserAvatarImgComponent
                          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE2CbGBE9Rw_Tz6WVrnPIhY4iF4bMtwiYuS0dGTQ4WLn37GB-5z6pwuFBqQxdKDW1n4Qs&usqp=CAU"
                          lg={true}
                        />

                        <div className="info pl-3">
                          <h6>Miron Mahmud</h6>
                          <span>25 minutes ago!</span>
                        </div>
                      </div>

                      <Rating
                        name="read-only"
                        value={4.5}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-5 d-flex align-items-center">
                    <div className="ml-auto">
                      <Button className="btn-blue btn-big btn-lg ml-auto">
                        <FaReply /> &nbsp; Reply
                      </Button>
                    </div>
                  </div>

                  <p className="mt-3">Lorem ipsum dolor sit</p>
                </div>
              </div>

              <div className="reviewsRow reply">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex flex-column">
                      <div className="userInfo d-flex align-items-center mb-3">
                        <UserAvatarImgComponent
                          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE2CbGBE9Rw_Tz6WVrnPIhY4iF4bMtwiYuS0dGTQ4WLn37GB-5z6pwuFBqQxdKDW1n4Qs&usqp=CAU"
                          lg={true}
                        />

                        <div className="info pl-3">
                          <h6>Miron Mahmud</h6>
                          <span>25 minutes ago!</span>
                        </div>
                      </div>

                      <Rating
                        name="read-only"
                        value={4.5}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-5 d-flex align-items-center">
                    <div className="ml-auto">
                      <Button className="btn-blue btn-big btn-lg ml-auto">
                        <FaReply /> &nbsp; Reply
                      </Button>
                    </div>
                  </div>

                  <p className="mt-3">Lorem ipsum dolor sit</p>
                </div>
              </div>

              <div className="reviewsRow">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex flex-column">
                      <div className="userInfo d-flex align-items-center mb-3">
                        <UserAvatarImgComponent
                          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE2CbGBE9Rw_Tz6WVrnPIhY4iF4bMtwiYuS0dGTQ4WLn37GB-5z6pwuFBqQxdKDW1n4Qs&usqp=CAU"
                          lg={true}
                        />

                        <div className="info pl-3">
                          <h6>Miron Mahmud</h6>
                          <span>25 minutes ago!</span>
                        </div>
                      </div>

                      <Rating
                        name="read-only"
                        value={4.5}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-5 d-flex align-items-center">
                    <div className="ml-auto">
                      <Button className="btn-blue btn-big btn-lg ml-auto">
                        <FaReply /> &nbsp; Reply
                      </Button>
                    </div>
                  </div>

                  <p className="mt-3">Lorem ipsum dolor sit</p>
                </div>
              </div>
            </div>

            <h6 className="mt-4 mb-4">Review Reply Form</h6>

            <form className="reviewForm">
              <textarea placeholder="write here "></textarea>

              <Button className="btn-blue btn-big btn-lg w-100 mt-4">
                drop your replies
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
