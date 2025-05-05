import React, { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from "../../../App";
import { postData } from "../../../utils/api";

const SearchBox=()=>{

    const [searchQuery, setSearchQuery] = useState("");

    const context = useContext(MyContext);

    const onChangeInput = (e)=>{
        setSearchQuery(e.target.value);

        const obj = {
            page: 1,
            limit: 4,
            query: e.target.value
        }

        if(e.target.value!==""){
            postData(`/api/product/search/get`,obj).then((res)=>{
                // console.log("search:::",res)
                context?.setSearchData(res);
            })
        }
    }

    return (
        <div className="relative">
            <input
            type="text"
            placeholder="Tìm kiếm..."
            className="pl-10 pr-4 py-2 rounded-full bg-gray-600 text-white focus:outline-none"
            onChange={onChangeInput}
            value={searchQuery}
            // value={keyword}
            // onChange={(e) => setKeyword(e.target.value)}
            // onKeyDown={ handleKeyDown}
            />
        
            <Link to={`/search`}>
                <CiSearch 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                />
            </Link>
        </div>     
    )
}

export default SearchBox;