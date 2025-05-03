//create a Context 
// create a function that returns the Context.provider 
// export this method and wrap around the parent component

import { createContext, React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const shoppingCartContext = createContext(null);



export default function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();


  //create a function to handle Go to cart

  function handleAddToCart(getProductDetails) {
    console.log(getProductDetails);
    let cpyExistingCartItems = [...cartItems];
    const findIndexOfCurrentItem = cpyExistingCartItems.findIndex(cartItem => cartItem?.id === getProductDetails?.id)
    // console.log(findIndexOfCurrentItem);
    if (findIndexOfCurrentItem === -1) {
      cpyExistingCartItems.push(
        {
          ...getProductDetails,
          quantity: 1,
          totalPrice: getProductDetails?.price
        })
    } else {
      // console.log("Its Coming here");
      cpyExistingCartItems[findIndexOfCurrentItem]={
        ...cpyExistingCartItems[findIndexOfCurrentItem],
        quantity: cpyExistingCartItems[findIndexOfCurrentItem].quantity + 1,
        totalPrice:(cpyExistingCartItems[findIndexOfCurrentItem].quantity + 1) * cpyExistingCartItems[findIndexOfCurrentItem].price
      }

    }
    // console.log("Details of CpyExisitng",cpyExistingCartItems);
    setCartItems(cpyExistingCartItems);
    localStorage.setItem('cartItems', JSON.stringify(cpyExistingCartItems));
    navigate('/cartlist')

  }

  // create a function to remove items from cart 

  function handleRemoveItemFromCart(getPDetaisl, isFullyRemovedFromCart) {
    let cpyExisitng = [...cartItems];
    const findIndexOfCurrentItem = cpyExisitng.findIndex(i => i.id === getPDetaisl?.id);
    if (isFullyRemovedFromCart) {
      cpyExisitng.splice(findIndexOfCurrentItem, 1)
    } else {
      cpyExisitng[findIndexOfCurrentItem] = {
        ...cpyExisitng[findIndexOfCurrentItem],
        quantity: cpyExisitng[findIndexOfCurrentItem].quantity - 1,
        totalPrice: (cpyExisitng[findIndexOfCurrentItem].quantity - 1) * cpyExisitng[findIndexOfCurrentItem].price
      }
    }
localStorage.setItem('cartItems',JSON.stringify(cpyExisitng));
setCartItems(cpyExisitng);

  }

  // 3 create a fetch method using async and await 
  async function fetchListOfProducts() {
    const apiResponse = await fetch('https://dummyjson.com/products');
    const result = await apiResponse.json();
    // console.log(result);

    // 4 if result is true then setListOfProducts
    if (result && result?.products) {
      setListOfProducts(result?.products)
      setLoading(false)
    }


  }

  //2 create a useEffect for fetching the list of product on page load
  useEffect(() => {
    fetchListOfProducts();
    setCartItems(JSON.parse(localStorage.getItem('cartItems') || []))

  }, [])

  console.log('Cartitem', cartItems);

  // console.log("List of product got saved",listOfProducts);

  return (
    // pass listOfProducts in value for access to the child components
    <shoppingCartContext.Provider value={{ listOfProducts, loading, setLoading, productDetails, setProductDetails, handleAddToCart, cartItems ,handleRemoveItemFromCart}}>{children}</shoppingCartContext.Provider>
  )
}
