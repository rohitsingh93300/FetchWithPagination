import React from 'react'
import Products from './components/Products'

const App = () => {
  return (
    <div className='max-w-6xl mx-auto'>
      <h1 className='text-4xl font-bold text-gray-800 mt-10'>All Products</h1>
      <Products/>
    </div>
  )
}

export default App
