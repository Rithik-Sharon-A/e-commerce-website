import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('bestseller', bestseller)
      formData.append('sizes', JSON.stringify(sizes))

      if (image1) formData.append('image1', image1)
      if (image2) formData.append('image2', image2)
      if (image3) formData.append('image3', image3)
      if (image4) formData.append('image4', image4)

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            token: token
          }
        }
      )

      if (response.data.success) {
        toast.success('Product Added')
      } else {
        toast.error(response.data.message || 'Something went wrong')
      }

      // Reset form after success
      setName('')
      setDescription('')
      setPrice('')
      setCategory('Men')
      setSubCategory('Topwear')
      setBestseller(false)
      setSizes([])
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(false)

    } catch (error) {
      toast.error('Server Error')
      console.error(error)
    }
  }

  return (
    <form className='flex flex-col w-full items-start gap-3'>
      
      {/* Upload Images */}
      <div>
        <p className='mb-2'>Upload Image</p>

        <div className='flex gap-2'>
          {[image1, image2, image3, image4].map((img, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img
                className='w-20'
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt=""
              />
              <input
                type="file"
                hidden
                id={`image${index + 1}`}
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (!file) return
                  if (index === 0) setImage1(file)
                  if (index === 1) setImage2(file)
                  if (index === 2) setImage3(file)
                  if (index === 3) setImage4(file)
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input
          className='w-full max-w-[500px] px-3 py-2'
          type="text"
          placeholder='Type here'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Product Description */}
      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea
          className='w-full max-w-[500px] px-3 py-2'
          placeholder='Write content here'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Category, Subcategory, Price */}
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select
            className='px-3 py-2'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub Category</p>
          <select
            className='px-3 py-2'
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input
            className='px-3 py-2 w-[120px]'
            type="number"
            placeholder='25'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
            <p
              key={size}
              onClick={() =>
                setSizes(prev =>
                  prev.includes(size)
                    ? prev.filter(s => s !== size)
                    : [...prev, size]
                )
              }
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'
              }`}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className='flex gap-2 mt-2'>
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller(prev => !prev)}
        />
        <label htmlFor="bestseller" className='cursor-pointer'>
          Add to bestseller
        </label>
      </div>

      {/* ADD BUTTON */}
      <button
        type="button"
        onClick={onSubmitHandler}
        className='w-28 py-3 mt-4 bg-black text-white'
      >
        ADD
      </button>

    </form>
  )
}

export default Add










































































































































































































































































































// import React from 'react'
// import { assets } from '../assets/assets'
// import { useState } from 'react'
// import axios from 'axios'
// import { backendUrl } from '../App'


// const Add = () => {
//   const [image1, setImage1] = useState(false)
//   const [image2, setImage2] = useState(false)
//   const [image3, setImage3] = useState(false)
//   const [image4, setImage4] = useState(false)
//   const [name, setName] = useState("")
//   const [description, setDescription] = useState("")
//   const [price, setPrice] = useState("")
//   const [category, setCategory] = useState("Men")
//   const [subCategory, setSubCategory] = useState("Topwear")
//   const [bestseller, setBestseller] = useState(false);
//   const [sizes, setSizes] = useState([]);
//   const onSubmitHandler = async(e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("description", description);
//       formData.append("price", price);
//       formData.append("category", category);
//       formData.append("subCategory", subCategory);
//       formData.append("bestseller", bestseller);
//       formData.append("sizes", JSON.stringify(sizes));

//       image1 && formData.append("image1", image1);
//       image2 && formData.append("image2", image2);
//       image3 && formData.append("image3", image3);
//       image4 && formData.append("image4", image4);

//       const response = await axios.post(backendUrl + "/api/product/add", formData,{headers: {token}})
//       console.log(response.data);
      
//     } catch (error) {
      
//     }
//   }
//   return (
//     <form className='flex flex-col w-full items-start gap-3'>
//       <div>
//         <p className='mb-2'>Upload Image</p>

//         <div className='flex gap-2'>
//           <label htmlFor="image1">
//             <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
//             <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
//           </label>

//           <label htmlFor="image2">
//             <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
//             <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
//           </label>

//           <label htmlFor="image3">
//             <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
//             <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
//           </label>

//           <label htmlFor="image4">
//             <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
//             <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
//           </label>

//         </div>
//       </div>

//       <div className='w-full'>
//         <p className='mb-2'>Product Name</p>
//         <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
//       </div>

//       <div className='w-full'>
//         <p className='mb-2'>Product Description</p>
//         <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
//       </div>

//       <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
//         <div>
//           <p className='mb-2'>Product Category</p>
//           <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
//             <option value="Men">Men</option>
//             <option value="Women">Women</option>
//             <option value="Kids">Kids</option>
//           </select>
//         </div>

//         <div>
//           <p className='mb-2'>Sub Category</p>
//           <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
//             <option value="Topwear">Topwear</option>
//             <option value="Bottomwear">Bottomwear</option>
//             <option value="Winterwear">Winterwear</option>
//           </select>
//         </div>

//         <div>
//           <p className='mb-2'>Product Price</p>
//           <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
//         </div>

//       </div>

//       <div>
//         <p className='mb-2'>Product Sizes</p>
//         <div className='flex gap-3'>
//           <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
//             <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
//           </div>

//           <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
//             <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
//           </div>

//           <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
//             <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
//           </div>

//           <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
//             <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
//           </div>

//           <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
//             <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
//           </div>


//         </div>
//       </div>

//       <div className='flex gap-2 mt-2'>
//         <input onChange={(e) => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
//         <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
//       </div>

//       <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>

//     </form>
//   )
// }

// export default Add