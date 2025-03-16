import React, {useEffect} from 'react';
import {fetchDataFromApi,} from "../../utils/api";

export const TestApi = () => {
      useEffect(()=>{
        fetchDataFromApi("/api/user/user-avatar").then((res)=>{
               
            })
    
           
        },[])
    
  return (
    <div className="mt-28">
        <h1>Thêm sản phẩm</h1>
    
         <form action="" method="put" encType="multipart/form-data">
            <input type="file" name="avatar" placeholder="Nhap gia sp"/>
            <button type="submit">Them</button>
         </form>
          
     
    </div>
  )
}
