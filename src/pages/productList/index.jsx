import React, { useContext } from 'react'
import { shoppingCartContext } from '../../contexthook'
import ProductTile from '../../components/productTile';
import { Link } from 'react-router-dom';

export default function ProductList() {
    const {listOfProducts,loading}=useContext(shoppingCartContext)
    console.log("Inside the ProductList",listOfProducts);
    
  return (
    <>
     <header className='bg-gray-100 shadow-md'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
                    <h1 className='text-xl font-bold text-gray-800'>ShopEasy</h1>
                    <nav className='space-x-4'>
                        <Link to='/' className='text-gray-700 hover:text-blue-600 font-medium'>Home</Link>
                        <Link to='/cartlist' className='text-gray-700 hover:text-blue-600 font-medium'>Cart</Link>
                    </nav>
                </div>
            </header>
  
   <section className='py-12 bg-white sm:py-12 lg:py-20'>
    <div className='px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl'>
      <div className='max-w-md mx-auto text-center'>
        <h1>Cart </h1>
        <h2 className='text-3xl font-bold text-gray-950 sm:text-4xl'>Our Feature Product</h2>
      </div>
      <div className='grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4 font-semibold'>
      {loading ? (
  <h2>Loading, please wait...</h2>
) : (
  listOfProducts && listOfProducts.map(item => <ProductTile item={item} key={item.id} />)
)}
      </div>
      </div> 

   </section>
   </>
  )
}
