import React, { useContext, useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { MyContext } from '../../App';
import { fetchDataFromApi, postData } from '../../utils/api';
import moment from 'moment';

export const Reviews = (props) => {

    const [reviews, setReviews] = useState({
        image:'',
        userName:'',
        review:'',
        rating:'',
        userId:'',
        productId:''
    });

    const [reviewsData, setReviewsData] = useState([]);

    const getReviews = () => {
        fetchDataFromApi(`/api/user/getReviews?productId=${props?.productId}`).then((res) => {
            if (res?.error === false){
                // console.log("getReviews::",res.data)
                setReviewsData(res?.data);
                props.setReviewsCount(res?.data.length)
            }
        })
    }

    const context = useContext(MyContext);

    useEffect(()=>{
        setReviews(()=>({
            ...reviews,
            image:context?.userData?.avatar,
            userName:context?.userData?.name,
            userId:context?.userData?._id,
            productId:props?.productId
        }))

        getReviews();
    },[context?.userData, props]);

    const onChangeInput=(e)=>{
        setReviews(()=>({
            ...reviews,
           review:e.target.value
        }))
    }

    const toxicWords = [
        // Thô tục, xúc phạm phổ biến
        "đồ ngu", "vô học", "đần", "chó", "cút", "ngu", "đồ chó", "bố láo", "mất dạy", "khốn nạn",
        "đm", "dmm", "cc", "cl", "vcl", "vl", "fuck", "f*ck", "shit", "sh*t", "bitch", "wtf", "dcm",
      
        // Lừa đảo, dịch vụ kém
        "lừa đảo", "treo đầu dê bán thịt chó", "làm ăn như ***", "bán đồ dởm", "đồ rác", "đồ đểu", 
        "đồ tào lao", "đồ dỏm", "treo hàng", "giao hàng như cc", "dịch vụ tệ", "dịch vụ như c", "giao hàng lừa",
      
        // Đe dọa, quá khích
        "tao kiện", "tao đập", "vả vào mặt", "sút vào mặt", "phang vỡ mặt", "đấm vỡ mồm", "cho mày bay màu",
      
        // Phân biệt, xúc phạm cá nhân
        "thằng này", "con kia", "đồ nhà quê", "đồ mọi", "mặt ngu", "óc chó", "óc lợn", "đầu bò",
      
        // Spam/quảng cáo rác
        "kiếm tiền online", "nhấp vào link", "click nhận quà", "truy cập trang này", "hack giá", "hack giảm giá",
      
        // Viết tắt lách luật
        "n*g", "fck", "sh1t", "đ*o", "clm", "vlcc"
    ];

    const isToxicComment = (text) => {
        const lowerText = text.toLowerCase();
        return toxicWords.some((word) => lowerText.includes(word));
    };

    const isToxicWithPerspective = async (text) => {
        const apiKey = "AIzaSyByUDLeZU32h6zbD1AW0240JolGpuireEQ"; // 🔴 Thay bằng khóa thực tế của bạn
        const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${apiKey}`;
    
        const body = {
            comment: { text },
            languages: ["vi", "en"], // Có thể chỉ cần ["vi"] nếu chỉ dùng tiếng Việt
            requestedAttributes: { TOXICITY: {} }
        };
    
        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const result = await response.json();
            const score = result.attributeScores.TOXICITY.summaryScore.value;
            console.log("Toxicity score:", score);
    
            return score > 0.7; // 🔴 Ngưỡng (threshold): > 0.7 là toxic
        } catch (error) {
            console.error("Perspective API error:", error);
            return false; // Nếu có lỗi, vẫn cho phép gửi
        }
    };

    const addReview= async (e)=>{
        e.preventDefault();
        // console.log("review::",reviews)

        if(reviews?.review!==""){

            // if (isToxicComment(reviews.review)) {
            //     context.openAlertBox("error", "Bình luận chứa từ ngữ không phù hợp!");
            //     return;
            // }

            const isToxic = await isToxicWithPerspective(reviews.review);

            if (isToxic) {
                context.openAlertBox("error", "Bình luận của bạn có thể mang nội dung không phù hợp. Vui lòng chỉnh sửa.");
                return;
            }
    
            postData(`/api/user/addReview?token=${localStorage.getItem("accessToken")}`, reviews).then((res)=>{
                if(res?.error === false){
                    context.openAlertBox("success", res?.message);
                    setReviews(()=>({
                        ...reviews,
                       review:'',
                       rating:''
                    }))
    
                    getReviews();
                }else{
                    context.openAlertBox("error", "Bạn cần đăng nhập");
                }
            })
        } else {
            context.openAlertBox("error", "Bạn chưa nhập bình luận");
        }     
    }

 

    return (
        <div className="w-full productReviewsContainer">
            <h2 className="text-[18px] mb-4">Bình luận khách hàng</h2>

            {
                reviewsData?.length!==0 && 
                <div className="reviewScroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden pr-5">
                    {
                        reviewsData?.map((review,index)=>{
                            return(
                                <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between"> 
                                    <div className="info w-[60%] flex items-center gap-3">
                                        <div className="img w-[80px] h-[80px] overflow-hidden rounded-full"> 
                                        
                                        {
                                            review?.image!=='' ?
                                            <img
                                                alt=""
                                                src={review?.image} 
                                                className="w-full h-full"
                                            />
                                            :
                                            <img
                                                alt=""
                                                src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/477713Dpz/anh-mo-ta.png"
                                                className="w-full h-full"
                                            />
                                        }

                                        
                                        </div>

                                        <div className="w-[80%]">
                                            <h4 className="text-[16px]">{review?.userName}</h4>
                                            <h5 className="text-[13px] mb-0">{moment(review?.createdAt).format('DD/MM/YYYY')}</h5>
                                            <p className="mt-0 mb-0">{review?.review}</p>
                                        </div>                                  
                                    </div>
                                    {
                                        review?.rating !== "" ?
                                        <Rating name="size-small" value={review?.rating} s readOnly/>
                                        :
                                        ""
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            }

            <br/>

            <div className="reviewForm bg-[#fafafa] p-4 rounded-md">
                <h2 className="text-[18px]">Thêm bình luận</h2>
                <form className="w-full mt-5" onSubmit={addReview}>
                    <TextField
                        id="outlined-multiline-flexible" label="Viết bình luận..."
                        className="w-full"
                        onChange={onChangeInput}
                        name="review"
                        multiline
                        rows={5}
                        value={reviews.review}
                    />
                    <br/><br/>
                    <Rating 
                        name="size-small" 
                        value={reviews.rating} 
                        onChange={(event, newValue)=>{
                            setReviews(()=>({
                                ...reviews,
                            rating:newValue
                            }))
                        }}
                    />

                    <div className="flex items-center mt-5">
                        <Button type="submit" className="btn-org">Gửi bình luận</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}