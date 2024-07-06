import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const ref = useRef()
  const passwordref = useRef()
  const [passwordArray, setPasswordArray] = useState([])

const getpasswords=async()=>{
  let req = await fetch("http://localhost:4000")
  let passwords = await req.json()
  console.log(passwords)
  setPasswordArray(passwords);
}

  useEffect(() => {
    // this is all for when localstorage save 
    // let passwords = localStorage.getItem("passwords");

    // if (passwords) {
    //   setPasswordArray(JSON.parse(passwords))
    // }

    getpasswords()



  }, [])

  const showpassword = () => {
    // alert("hare we write some password hide  ")
    // if (ref.current.src.includes("/icons/eyecrose.png")){
    //   ref.current.src = "/icons/eye.png"
    // }
    // else {
    //   ref.current.src = "/icons/eyecrose.png"
    passwordref.current.type = "text"

    if (ref.current.src.includes("/icons/eyecrose.png")) {
      ref.current.src = "/icons/eye.png"
      passwordref.current.type = "password"
    }
    else {
      passwordref.current.type = "text"
      ref.current.src = "/icons/eyecrose.png"
    }
  }
  const savepassword = async() => {
    if(form.site.length >3 && form.username.length>3 && form.password.length>3){

      
// when we store data in local storage in our browser data  when we use this 
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
    console.log([...passwordArray, { ...form, id: uuidv4() }])
    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
    await fetch("http://localhost:4000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON
      .stringify({id:form.id})})
     await fetch("http://localhost:4000/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON
    .stringify({...form,id:uuidv4()})})
    setform({site:"",username:"",password:""});
    toast('Password Save Successfull !', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
    });
      
    }
    else{
      toast('Something is empty !', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    
    });
    
  }
    
  }
  const deletepassword =async (id) => {
    let confi = confirm("you realy delete your password")
    if (confi) {

      setPasswordArray(passwordArray.filter(item => item.id !== id))

      await fetch("http://localhost:4000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON
        .stringify({id:id})})
      // this is when we use browser localstorage 
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))


      toast('Delete Successfull !', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      });
    }

  }
  const editpassword = (id) => {
    console.log("edit paass")
    setform({...passwordArray.filter(i => i.id === id)[0],id:id})
    setPasswordArray(passwordArray.filter(item => item.id !== id))
    


  }
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const copytext = (text) => {
    toast('🦄 Copied Successfull !', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",

    });
    navigator.clipboard.writeText(text)
  }


  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        limit={6}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"

      />

      
      <div className="p-2 md:p-0 md:container m-auto  max-w-3xl min-h-[88.2vh]">
        <h1 className='font-bold text-2xl text-center text-orange-600'><span className='text-green-500'>&lt;</span>Pro<span className='text-green-500'>TechT/&gt;</span></h1>
        <p className='text-center underline text-white text-xl font-bold '>Your Password Manager</p>

        <div className="text-black flex flex-col p-5 my-5 gap-4 items-center">
          <input name="site" value={form.site} onChange={handlechange} placeholder='Enter Website URL' className='rounded-full border w-full border-green-400 px-2' type="text" />
          <div className="flex flex-col md:flex-row gap-5 rounded-full my-5 w-full ">

            <input name='username' value={form.username} onChange={handlechange} placeholder='Enter Username' className='rounded-full border px-2 w-full border-green-400' type="text" />
            <div className="relative">

              <input ref={passwordref} name='password' value={form.password} onChange={handlechange} placeholder='Enter Password' className='font-bold px-2  rounded-full border border-green-400' type="password" /><span className='absolute right-0 w-[20px] mx-[1px] my-[1px] cursor-pointer' onClick={showpassword}>
                <img ref={ref} src="/icons/eye.png" alt="" />
              </span>
            </div>
          </div>
          <button onClick={savepassword} className='hover:text-white text-green-500  bg-grey-500 w-40 font-bold rounded-full px-2 items-center flex border  text-sm  hover:bg-black border-gray-600 flex-col '>Add Password
            <lord-icon
              src="https://cdn.lordicon.com/mlxonlmo.json"
              trigger="hover"
            >
            </lord-icon></button>
        </div>
        <div className="displaydata ">
          <h1 className='rounded-full w-52  bg-green-900  text-2xl my-5 mx-2 p-2 text-center font-bold underline text-white'>
            Display Data -
          </h1>
          {passwordArray.length === 0 && <div className='text-white font-bold text-xl p-3'>No any password hare to store</div>}
          {passwordArray.length != 0 && <table className='table-auto w-full rounded-md overflow-hidden mb-[60px]'>

            <thead className='bg-green-500 text-[#3a333a] '>
              <tr>
                <th className='items-center'>SiteName</th>
                <th className='items-start'>Username</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead >
            <tbody className='bg-green-200 text-black font-bold text-center '>
              {passwordArray.map((item, index) => {

                return <tr key={index}>
                  <td  ><div className='flex px-5 items-center justify-center  hover:underline gap-1' ><a href={item.site} target='_blank'>

                    {item.site}
                  </a>

                    <div className='  cursor-pointer   ' onClick={() => copytext(item.site)}>

                      <lord-icon

                        src="https://cdn.lordicon.com/uecgmesg.json"
                        trigger="hover">

                      </lord-icon>
                    </div>
                  </div>
                  </td>
                  <td ><div className='flex gap-1 px-5 items-center justify-center' >{item.username}

                    <div className=' cursor-pointer  ' onClick={() => copytext(item.username)}>

                      <lord-icon

                        src="https://cdn.lordicon.com/uecgmesg.json"
                        trigger="hover">

                      </lord-icon>
                    </div>
                  </div>


                  </td>
                  <td ><div className='flex gap-1  items-center justify-center'> {"*".repeat(item.password.length)}

                    <div className=' cursor-pointer   ' onClick={() => copytext(item.password)}>

                      <lord-icon

                        src="https://cdn.lordicon.com/uecgmesg.json"
                        trigger="hover">

                      </lord-icon>
                    </div>
                  </div>

                  </td>
                  <td>
                    <div className='flex justify-center items-center gap-5 cursor-pointer'>

                      <span onClick={() => { editpassword(item.id) }} >
                        <lord-icon
                          src="https://cdn.lordicon.com/wuvorxbv.json"
                          trigger="hover"
                        >
                        </lord-icon>
                      </span>
                      <span onClick={() => { deletepassword(item.id) }} ><span className="material-symbols-outlined">
                        delete_sweep
                      </span></span>
                    </div>
                  </td>

                </tr>
              })}

            </tbody>
          </table>}
        </div>
      </div>
    </>
  )
}

export default Manager
