import React from 'react'
import Footer_a from './Footer_a'
import { Link, useNavigate } from 'react-router-dom'

function LogInPass(props) {
    const navigate = useNavigate()
    const onChange = (e) => {
        props.setCredentials({ ...props.credentials, [e.target.name]: e.target.value })
    }
    const fetchToken = async (e)=>{
        e.preventDefault()
        const response = await fetch ("http://localhost:8000/auth/login",{

            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(props.credentials)
        })
        const data = await response.text()
        console.log(data);

        navigate("/")
    }
    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-3 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm relative">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="amazon-logo-black.png"
                        alt="Your Company"
                    />
                    <p className='absolute  right-24 top-1 '>.in</p>
                </div>
            </div>
            <div className='flex flex-col w-full sm:max-w-lg sm:mx-auto mb-4  justify-center items-center '>

                <div className="border rounded-lg flex min-h-full flex-1 flex-col w-full max-w-sm justify-center items-center px-6 py-6 lg:px-8">
                    <div className=" sm:w-full sm:max-w-sm">

                        <h2 className=" text-3xl  leading-9 tracking-tight text-gray-900">
                            Sign in
                        </h2>
                    </div>
                    <div className='my-2 flex justify-start items-center w-full'>
                        <p className='mr-2 text-sm'>{props.credentials.email}</p>
                        <Link to ='/login' className='text-blue-600 hover:underline text-sm'>Change</Link>
                    </div>
                    <div className="mt-1  w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={fetchToken}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                    onChange={onChange}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="password"
                                        required
                                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="text-black flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                        <div className='text-sm flex my-2 mt-4 '>
                            <input type='checkbox' className='mx-1'></input>
                            <p  >Keep me signed in.</p>
                            <p className='text-blue-600  mx-1 hover:underline cursor-pointer'>Details</p>
                        </div>
                      
                     
                    </div>
                </div>
               

            </div>
            {/* eslint-disable-next-line  */}
            <Footer_a />
        </div>
    )
}

export default LogInPass