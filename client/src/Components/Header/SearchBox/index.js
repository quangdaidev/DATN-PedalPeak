import React from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';

const SearchBox=()=>{
    return (
        <div className="relative">
            <input
            type="text"
            placeholder="Tìm kiếm..."
            className="pl-10 pr-4 py-2 rounded-full bg-gray-600 text-white focus:outline-none"
            // value={keyword}
            // onChange={(e) => setKeyword(e.target.value)}
            // onKeyDown={ handleKeyDown}
            />
        
            <Link to={`/tim-kiem`}>
                <CiSearch 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                />
            </Link>
        </div>     
    )
}

export default SearchBox;