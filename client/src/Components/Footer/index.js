import React from "react";
import { Link } from 'react-router-dom';

const SearchBox=()=>{
    return (
      <div className="bg-white  w-[99vw] relative left-[calc(-49.5vw+50%)]">
        <footer className="w-[100%] mx-auto pd-24 pl-52 pt-14 pb-14 text-gray-500 text-sm ">
          <div className="flex gap-8">
            <div className="basis-2/6">
              <div className="font-bold text-xl mb-4 text-gray-800">PedalPeak</div>
              <div className="mb-20">Được thành lập từ năm 2000, chuyên cung cấp các loại xe đạp chính hãng.</div>
              <div className="text-gray-400 hover:bg-main-400">PedalPeak Blog. @2016</div>
            </div>
            <div className="basis-1/6">
              <div className="uppercase font-semibold tracking-wider text-gray-600 mb-4">Danh mục</div>
              <div className="flex flex-col gap-3">
                <div className=""><Link href="" className="hover:text-main-400">Trang chủ</Link></div>
                <div className=""><Link href="" className="hover:text-main-400">Sản phẩm</Link></div>
                <div className=""><Link href="" className="hover:text-main-400">Liên hệ</Link></div>
                <div className=""><Link href="" className="hover:text-main-400">Đăng ký ưu đãi</Link></div>
              </div>
            </div>
            <div className="basis-1/6">
              <div className="uppercase font-semibold tracking-wider text-gray-600 mb-4">Theo dõi chúng tôi tại</div>
              <div className="flex flex-col gap-3">
                <div className=""><Link href="" className="hover:text-main-400">Facebook</Link></div>
                <div className=""><Link href="" className="hover:text-main-400">Instagram</Link></div>
                <div className=""><Link href="" className="hover:text-main-400">Pinterest</Link></div>
                <div className=""><Link href="" className="hover:text-main-400">Twitter</Link></div>
              </div>
            </div>
            <div className="basis-2/6">
              <div className="uppercase font-semibold tracking-wider text-gray-600 mb-4">Liên hệ</div>
              <div className="mb-4">Luôn sẵn sàng hỗ trợ 24/7</div>
              <div className="mb-16 text-gray-800 text-[22px] font-normal tracking-wider cursor-pointer hover:text-main-400 ">PedalPeak@gmail.com</div>
              <div className="text-gray-400 hover:text-main-400">Powered by PedalPeak Author</div>
            </div>
          </div>
        </footer>
      </div>
    )
}

export default SearchBox;