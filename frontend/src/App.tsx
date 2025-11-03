import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetchProducts } from './store/slices/productsSlice'
import { addToCart } from './store/slices/cartSlice'

function App() {
  const [count, setCount] = useState<number>(0)
  const dispatch = useAppDispatch()
  
  // Redux state
  const { products, loading } = useAppSelector((state) => state.products)
  const { totalItems } = useAppSelector((state) => state.cart)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleAddToCart = () => {
    if (products.length > 0) {
      dispatch(addToCart(products[0]))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            E-Commerce Platform
          </h1>
          <p className="text-xl text-gray-600">
            Vite + React + TypeScript + Tailwind CSS + Redux Toolkit
          </p>
        </div>

        {/* Redux Demo Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-between">
              🛒 Redux Cart Demo
              <span className="text-lg bg-blue-500 text-white px-4 py-2 rounded-full">
                Cart: {totalItems} items
              </span>
            </h2>
            
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {products.slice(0, 3).map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition">
                      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-blue-600">
                          ${product.price}
                        </span>
                        <button
                          onClick={() => dispatch(addToCart(product))}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Counter Demo */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              🎯 Component State Demo
            </h2>
            <div className="text-center">
              <button 
                onClick={() => setCount((count) => count + 1)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105"
              >
                Count is {count}
              </button>
              <p className="mt-4 text-gray-600">
                Click the button to test local state
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-8 text-center">
            <div className="inline-flex flex-wrap gap-2 justify-center">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                ⚛️ React 19
              </span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                📘 TypeScript
              </span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                🎨 Tailwind CSS
              </span>
              <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
                🔄 Redux Toolkit
              </span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                ✅ Testing Library
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
