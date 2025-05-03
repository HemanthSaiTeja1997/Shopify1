import React, { useContext } from 'react'
import { shoppingCartContext } from '../../contexthook'
import { Link, useNavigate } from 'react-router-dom';
import CartTile from '../../components/cartTile';

export default function CartList() {
  const {cartItems}= useContext(shoppingCartContext);
  const navigate=useNavigate()
  return (
    <>
     <header className='bg-gray-100 shadow-md'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
                    <h1 className='text-xl font-bold text-gray-800'>ShopEasy</h1>
                    <nav className='space-x-4'>
                        <Link to='/' className='text-gray-700 hover:text-blue-600 font-medium'>Products</Link>
                    </nav>
                </div>
            </header>
 
    <div className='max-w-5xl mx-auto max-md:max-w-xl py-4' >
      <h1 className='text-2xl font-bold text-gray-800 text-center'>My Cart </h1>
      <div className='grid md:grid-cols-3 gap-8 mt-12' >
        <div className='md:col-span-2 space-y-4'>
          {cartItems?.length ? 
           cartItems.map(singleCartItem=><CartTile  singleCartItem={singleCartItem}/>)
          :
         
          <h1>No items available in cart!!! Please add some items in Cart</h1>
          }

        </div>
        <div className='bg-gray-100 rounded-sm p-4 h-max'>
          <h3 className='text-xl font-extrabold text-gray-950 border-b border-gray-300 pb-2'>Order Summary</h3>
        <ul className='text-gray-700 mt-4 space-y-2'>
          <p className='flex flex-wrap gap-4 text-sm font-bold'>
            Total : <span>
              ${cartItems.reduce((prev,curr)=>prev+curr.totalPrice,0)}
            </span>
          </p>
        </ul>
        <div className='mt-5 flex gap-3'>
          <button disabled={cartItems.length === 0} className='disabled:opacity-65 text-sm px-4 py-3 bg-black text-white font-extrabold'>CheckOut</button>
          <button onClick={()=>navigate('/')} className='text-sm px-4 py-3 bg-black text-white font-extrabold'>Continue Shopping</button>


        </div>
        </div>
      </div>
    </div>
    </>
  )
}
