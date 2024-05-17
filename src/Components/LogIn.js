import React from 'react'
import Footer_a from './Footer_a'
import { Link, useNavigate } from 'react-router-dom'

function LogIn(props) {

    const onChange = (e) => {
        props.setCredentials({ ...props.credentials, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate()

    const checkEmail = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:8000/auth/checkemail", {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(props.credentials)
        })
        const data = await response.json()
        if (data.success) {
            navigate("/loginpass")
        }
        console.log(data);
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
            <div className='flex flex-col w-fit sm:max-w-sm sm:mx-auto   justify-center items-center'>

                <div className="border rounded-lg flex min-h-full flex-1 flex-col justify-center items-center px-6 py-6 lg:px-8">
                    <div className=" sm:w-full sm:max-w-sm">

                        <h2 className="mt-1 text-2xl  leading-9 tracking-tight text-gray-900">
                            Sign in
                        </h2>
                    </div>

                    <div className="mt-1   sm:max-w-sm">
                        <form className="space-y-6" onSubmit={checkEmail}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email or mobile phone number
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={onChange}
                                        value={props.credentials.email}
                                        id="email"
                                        name="email"
                                        type="text"
                                        autoComplete="email"
                                        required
                                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type='submit'
                                    className="text-black flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                                >
                                    Continue
                                </button>
                            </div>
                        </form>

                        <p className="mt-4 text-xs  text-gray-500">
                            By continuing, you agree to Amazon's{' '}
                            <a href="/" className="font-semibold leading-6 text-blue-600 hover:text-blue-500 hover:underline">
                                Conditions of Use and Privacy Notice.
                            </a>
                        </p>
                        <p className="my-5  text-xs text-gray-500">
                            <a href="/" className="font-semibold leading-6 text-blue-600 hover:text-blue-500 hover:underline">
                                Need help !
                            </a>
                        </p>
                        <hr></hr>
                        <p className="mt-3  font-bold text-sm text-gray-500">
                            Buying for work ?

                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                            <a href="/" className="font-semibold leading-6 text-blue-600 hover:text-blue-500 hover:underline">
                                Shop on Amazon Business
                            </a>
                        </p>
                    </div>
                </div>
                <div className='w-full mt-5 relative '>
                    <hr className='-z-10 w-full absolute top-3 '></hr>
                    <p className='text-center z-10 bg-white w-fit px-2 mx-auto'>New to Amazon ?</p>

                </div>
                <Link to='/signup'
                    type="submit"
                    className="border border-1 my-2 mb-8  text-black flex w-full justify-center rounded-xl bg-white-500 px-3 py-1.5 text-sm  leading-6  shadow-sm hover:bg-gray-100  pb-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white-600"
                >
                    Create your amazon account
                </Link>

            </div>
            {/* eslint-disable-next-line  */}
            <Footer_a />
        </div>
    )
}

export default LogIn