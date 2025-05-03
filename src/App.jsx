import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductList from './pages/productList'
import CartList from './pages/cartList'
import ProductDetails from './pages/productDetails'

function App() {

  return (
<>
<Routes>
  <Route path='/' element={<ProductList/>}/>
  <Route path='/productdetails/:id' element={<ProductDetails/>}/>
  <Route path='/cartlist' element={<CartList/>}/>

</Routes>
</>
  )
}

export default App
