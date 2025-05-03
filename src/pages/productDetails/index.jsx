import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { shoppingCartContext } from '../../contexthook';

export default function ProductDetails() {
  const { id } = useParams();
  const { productDetails, setProductDetails, loading, setLoading, handleAddToCart, cartItems } = useContext(shoppingCartContext);

  async function fetchProductDetails() {
    const apiResponse = await fetch(`https://dummyjson.com/products/${id}`);
    const result = await apiResponse.json();
    if (result) {
      setProductDetails(result);
      setLoading(false);
    }
  }



  useEffect(() => {
    fetchProductDetails();
  }, [id])
  // console.log(productDetails);
  if (loading) return <h1>Product Details are Loading!!! </h1>
  return (
    <div>
         <header className='bg-gray-100 shadow-md'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
                    <h1 className='text-xl font-bold text-gray-800'>ShopEasy</h1>
                    <nav className='space-x-4'>
                        <Link to='/' className='text-gray-700 hover:text-blue-600 font-medium'>Home</Link>
                        <Link to='/cartlist' className='text-gray-700 hover:text-blue-600 font-medium'>Cart</Link>

                    </nav>
                </div>
            </header>
      <div className='p-6 lg:max-w-7xl max-w-4xl mx-auto'>
        <div className='grid items-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-sm p-6'>
          <div className='lg:col-span-3 w-full text-center lg:sticky top-0'>
            <div className='px-4 py-10  rounded-xl shadow-lg relative'>
              <img src={productDetails?.thumbnail} alt={productDetails?.title} className='w-4/5 rounded object-cover' />
            </div>
            <div className='mt-6 flex flex-wrap justify-center gap-6 mx-auto '>
              {productDetails?.images?.length ?
                productDetails?.images.map(imgItem =>
                  <div className='rounded-xl p-4 shadow-md' key={imgItem}>
                    <img src={imgItem} alt="Product Secondary Image" className='w-24 cursor-pointer' />
                  </div>)
                : null
              }


            </div>
          </div>
          <div className='lg:col-span-2'>
            <h2 className='text-2xl font-extrabold text-[#333333]'>{productDetails?.title}</h2>
            <div className='flex flex-wrap gap-4 mt-4'>
              <p className='text-xl font-bold'>${productDetails?.price} </p>
            </div>
            <div>
              <button disabled={cartItems.findIndex(item => item.id === productDetails?.id) > -1} onClick={() => { handleAddToCart(productDetails) }} className='disabled:opacity-65 mt-5 min-w-[200px] px-4 py-3 border-[#333] bg-black text-white text-sm font-semibold rounded'>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
