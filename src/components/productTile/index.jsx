import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { shoppingCartContext } from '../../contexthook';

export default function ProductTile({item}) {
    const {handleAddToCart,cartItems}=useContext(shoppingCartContext);
    const navigate=useNavigate();
    function handleNavigeToProductDetails(getID){
        // console.log(getID,navigate);
        navigate(`/productdetails/${getID}`)
        
    }
  return (
    <div className='relative group border border-cyan-700 p-6 cursor-pointer'>
    <div className='overflow-hidden aspect-w-1 aspect-h-1'>
        <img src={item?.thumbnail} alt={item?.title}  className='object-cover w-full h-full transition-all duration-300 group-hover:scale-125'/>
    </div>
    <div className='flex items-start justify-between mt-4 space-x-4'>
        <div className='font-bold text-gray-700 sm:text-sm text-xs md:text-base'>
            <p className='w-[100px] overflow-hidden text-ellipsis whitespace-nowrap'>{item?.title}</p>
        </div>
        <div className='text-right'>
        <p>${item?.price}</p>
    </div>
    </div>
   
    <button className='px-5 mt-5 py-2 w-full rounded text-white font-bold bg-black'
    onClick={()=>{handleNavigeToProductDetails(item?.id)}}
    >View Details</button>
    <button disabled={cartItems.findIndex(i => i.id === item?.id) > -1} onClick={() => { handleAddToCart(item) }} className='disabled:opacity-65 mt-5 min-w-[200px] px-4 py-3 border-[#333] bg-black text-white text-sm font-semibold rounded'>Add To Cart</button>
    </div>
  )
}

