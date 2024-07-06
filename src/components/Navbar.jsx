import React from 'react'

const Navbar = () => {
  return (
   <nav className=' flex justify-around items-center h-14 sticky top-0 bg-gray-800 z-10 '>
    <div className="logo text-xl md:text-2xl text-white cursor-pointer font-bold">
      <span className='text-green-500'>&lt;</span>Pro<span className='text-green-500'>TechT/&gt;</span></div>

    <ul className='font-bold text-white '>
        <li className='flex gap-5'>
            <a className='hover:text-blue-500' href="#"><span className='text-green-500'>Ho</span>me</a>
            <a className='hover:text-purple-700' href="#">Ab<span className='text-green-500'>out</span></a>
            <a className='hover:text-blue-500' href="#">Cont<span className='text-green-500'>act</span></a>
       

        </li>
    </ul>
   <a href="https://github.com/harshitshesh/React-nodejs-project" target='_blank'>
    <button className='text-black font-bold border   flex  items-center bg-green-400 p-1 rounded-lg gap-1'>
      <img src="/icons/githublogo.png" className='w-8 cursor-pointer' alt="" />Github </button>
   </a>
   </nav>
  )
}

export default Navbar
