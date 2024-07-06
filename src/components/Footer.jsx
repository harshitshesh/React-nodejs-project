import React from 'react'

const Footer = () => {
  return (<>
    <div className='bg-black w-full  bottom-0 text-white flex flex-col justify-center items-center'>
      <div className='text-xl font-bold'><span className='text-green-500'>&lt;</span>Pro<span className='text-green-500'>TechT/&gt;</span></div>
      <div className="flex text-gray-500">Created By <img src="/icons/heart.jpg" alt="" className='w-2 h-2' /> Harshit</div>
    </div>
  </>
  )
}

export default Footer
