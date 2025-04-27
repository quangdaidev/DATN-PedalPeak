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

        if(e.target.value!==""){
            postData(`/api/order/search/get`,obj).then((res)=>{
                props.setOrders(res.data);
            })
        } else {
            fetchDataFromApi('/api/order/getAllOrders').then((res)=>{
                console.log("orderList::",res)
                if(res?.error===false){
                    const pendingOrders = res.data.filter(order => order.order_status === "chờ xác nhận");
                    props.setOrders(pendingOrders);
                }
            })
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