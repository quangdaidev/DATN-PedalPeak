import React, { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MyContext } from '../../App';

const AddressBox = (props) => {

    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const context = useContext(MyContext);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const removeAddress=(id)=>{
        setAnchorEl(null);
        props?.removeAddress(id);
    }

    const editAddress=(id)=>{
        setAnchorEl(null);
        props?.editAddress(id)
    }

  return (
    <label className="group border border-dashed border-[rgba(0,0,0,0.2)] addressBox w-full
    justify-center bg-[#fafafa] p-4 rounded-md cursor-pointer">
        <div className="mr-auto relative">
            {/* <Radio {...label} name="address" 
                checked={selectedValue === (address?._id)}
                value={address?._id} 
                onChange={handleChange}
            /> */}
            <span className="inline-block p-1 bg-[#e7e7e7] text-[12px] rounded-sm">{props?.address?.addressType}</span>
            <h4 className="pt-2 flex items-center gap-4 text-[14px]">
                <span>{context?.userData?.name}</span> - 
                <span>{props?.address?.mobile}</span>
            </h4>
            <span className="pt-0 text-[13px] block w-100">
                {
                    props?.address?.street + ", "+
                    props?.address?.ward + ", "+
                    props?.address?.district + ", "+
                    props?.address?.city 
                }
            </span>

            <div className="absolute top-[-10px] right-[0px]">
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>

                <Menu
                    id="long-menu"
                    MenuListProps={{
                    'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                    paper: {
                        style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                        },
                    },
                    }}
                >
                 
                    <MenuItem onClick={()=>editAddress(props?.address?._id)}>
                       Cập nhật
                    </MenuItem>
                    <MenuItem onClick={()=>removeAddress(props?.address?._id)}>
                      Xóa
                    </MenuItem>
                  
                </Menu>

            </div>

        </div>
        
        {/* <span onClick={() => removeAddress(props?.address?._id)} className="hidden group-hover:flex mt-[5px] items-center justify-center w-[30px] h-[30px] rounded-full bg-main-500 text-white ml-auto">
            <FaRegTrashAlt/>
        </span> */}

    </label>
  )
}

export default AddressBox
