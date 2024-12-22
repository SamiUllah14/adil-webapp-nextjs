import React from 'react'
import ProductList from '../../components/Editor/ProductList/ProductList'
import ProductForm from '../../components/Editor/ProductForm'

const page = () => {
  return (
    <div> 
      <ProductForm/>
           <ProductList />
</div>
  )
}

export default page