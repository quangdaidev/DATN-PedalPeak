import { IoSearch } from "react-icons/io5";
import { fetchDataFromApi, postData } from "../../utils/api";
import { useState } from "react";


const SearchBox = (props)=>{

     const [searchQuery, setSearchQuery] = useState("");
    
    // const context = useContext(MyContext);

    const onChangeInput = (e)=>{
        setSearchQuery(e.target.value);

        const obj = {
            query: e.target.value
        }

        if(props.api === "order"){
            if(e.target.value!==""){
                postData(`/api/${props.api}/search/get`,obj).then((res)=>{
                    props.setData(res.data);
                })
            } else {
                fetchDataFromApi('/api/order/getAllOrders').then((res)=>{
                    console.log("orderList::",res)
                    if(res?.error===false){
                        const pendingOrders = res.data.filter(order => order.order_status === "chờ xác nhận");
                        props.setData(pendingOrders);
                    }
                })
            }
        }

        if(props.api === "product"){
            if(e.target.value!==""){
                postData(`/api/${props.api}/search/get`,obj).then((res)=>{
                    props.setData(res.data);
                    props.setPage(res.totalPages);
                })
            } else {
                fetchDataFromApi('/api/product/getAllProducts?page=1&perPage=8').then((res)=>{
                    props.setData(res.data)
                    props.setPage(res.totalPages);
                })
            }
        }

        if(props.api === "category"){
            if(e.target.value!==""){
                postData(`/api/${props.api}/search/get`,obj).then((res)=>{
                    props.setData(res.data);
                })
            } else {
                fetchDataFromApi('/api/category').then((res)=>{
                     props.setData(res.data)
                   })
            }
        }

        if(props.api === "user"){
            if(e.target.value!==""){
                postData(`/api/${props.api}/search/get`,obj).then((res)=>{
                    props.setData(res.data);
                })
            } else {
                fetchDataFromApi('/api/user/getAllUsersData?page=1&perPage=8').then((res)=>{
                    props.setData(res.data)
                    props.setPage(res.totalPages)
                })
            }
        }
       
    }

    return(
        <div className="searchBox position-relative d-flex align-items-center">
            <IoSearch className="mr-2"/>
            <input 
                type="text" placeholder="Tìm kiếm..."
                onChange={onChangeInput}
                value={searchQuery}
            />
        </div>
    )
}

export default SearchBox;