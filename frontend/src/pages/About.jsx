import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'


const About = () => {
  return (
    <div className='pt-8 border-t'>

      {/* Title */}
      <div className='text-2xl text-center'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* Content Section */}
      <div className='my-10 flex flex-col md:flex-row gap-16 max-w-6xl mx-auto px-4'>

        {/* Image */}
        <img
          className='w-full md:max-w-[450px]'
          src={assets.about_img}
          alt="About Forever"
        />

        {/* Text */}
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-left text-sm sm:text-base md:text-lg leading-relaxed'>
          <p>
            Forever is a modern e-commerce shopping platform offering stylish,
            high-quality fashion at affordable prices. Designed for a smooth user
            experience, it provides easy browsing, secure checkout, and a seamless
            shopping journey for everyone.
          </p>

          <p>
            Forever is a contemporary online shopping destination focused on fashion
            and lifestyle essentials. It delivers trend-driven collections,
            user-friendly navigation, and a reliable checkout experience, making
            everyday shopping simple, enjoyable, and accessible for all customers.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our Mission at Forever is to provide affordable, high-quality fashion through a seamless shopping experience that builds trust, confidence, and lasting customer satisfaction every day.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
            <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                  <b>Quality Assurance</b>
                  <p className='text-gray-600'>Quality Assurance at Forever ensures every product meets high standards through careful checks, consistent processes, and customer-focused testing to deliver reliable, durable, and satisfying shopping experiences.</p>
            </div>

            <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                  <b>Convenience</b>
                  <p className='text-gray-600'>Convenience at Forever means easy browsing, smooth navigation, quick checkout, and reliable delivery—making online shopping simple, fast, and stress-free for customers anytime, anywhere.</p>
            </div>

            <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                  <b>Exceptional Customer Service</b>
                  <p className='text-gray-600'>Exceptional Customer Service at Forever focuses on quick support, clear communication, and personalized assistance, ensuring every customer feels valued, heard, and satisfied throughout their entire shopping journey.</p>
            </div>

      </div>

      <NewsletterBox />
    </div>
  )
}

export default About













































































// import React from 'react'
// import Title from '../components/Title'
// import { assets } from '../assets/assets'

// const About = () => {
//   return (
//     <div>
//       <div className='text-2xl text-center pt-8 border-t'>
//           <Title text1={'ABOUT'} text2={'US'} />
//           <div className='my-10 flex flex-col md:flex-row gap-16'>
//               <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
//               <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
//                   <p>Forever is a modern e-commerce shopping platform offering stylish, high-quality fashion at affordable prices. Designed for a smooth user experience, it provides easy browsing, secure checkout, and a seamless shopping journey for everyone.</p>
//                   <p>Forever is a contemporary online shopping destination focused on fashion and lifestyle essentials. It delivers trend-driven collections, user-friendly navigation, and a reliable checkout experience, making everyday shopping simple, enjoyable, and accessible for all customers.</p>
//               </div>
            
//           </div>
//       </div>
//     </div>
//   )
// }

// export default About