import React, { useState } from 'react'
import Footer_a from './Footer_a'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { CgSpinner } from "react-icons/cg"
import OtpInput from 'react-otp-input';
import { auth } from "../Firebase/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";



function SignUp() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        "email": "",
        "name": "",
        "number": "",
        "password": ""
    })
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth,
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        onSignup();
                    },
                    "expired-callback": () => { },
                }
            );
        }
    }

    function onSignup(e) {
        e.preventDefault()
        setLoading(true);
        onCaptchVerify();
        console.log(ph)
        const ExampleVerifier = window.recaptchaVerifier;

        const formatPh = "+" + ph;

        signInWithPhoneNumber(auth, formatPh, ExampleVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success("OTP sended successfully!");
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        // fetchData()
    }

    function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                console.log(res);
                console.log(res.user);
                // setUser(res.user);
                fetchData()
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const fetchData = async () => {

        // console.log(JSON.stringify({ ...credentials,"number": ph.slice(2) }))
        const response = await fetch('http://localhost:8000/auth/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...credentials, "number": ph.slice(3) })
        })
        const data = await response.json()
        console.log(data)
        if (data.success) {
            localStorage.setItem("token", data.authToken)
            navigate('/login')
            // props.showAlert("Successfully signed up ", "success")
        } else {
            // alert('INVALID LOGIN')
            // props.showAlert("Invalid login", "danger")
        }
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
            <Toaster toastOptions={{ duration: 4000 }} />
            <div id="recaptcha-container"></div>
            <div className='flex flex-col w-fit sm:max-w-md sm:mx-auto justify-center items-center'>
                {showOTP ?
                    <>
                        <div className='flex flex-col w-fit  sm:mx-auto my-10 border border-1 p-8 rounded-lg   justify-center items-center'>
                            <label
                                htmlFor="otp"
                                className=" text-xl text-black  "
                            >
                                Enter your OTP
                            </label>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                skipDefaultStyles="true"
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} />}
                                shouldAutoFocus="true"
                                inputStyle="border w-9 border-1  border-gray-400 p-2  text-center m-3 bg-gray-50 rounded-lg"
                                containerStyle="my-5 "
                            ></OtpInput>
                            <button
                                onClick={onOTPVerify}
                                className="bg-yellow-400  w-full flex gap-1 items-center justify-center py-1.5 text-white rounded-xl"
                            >
                                {loading && (
                                    <CgSpinner size={20} className="mt-1 animate-spin" />
                                )}
                                <span className='text-black'>Verify OTP</span>
                            </button>
                        </div>
                    </>


                    :
                    <div className="border rounded-lg flex mb-5 min-h-full flex-1 flex-col justify-center items-center px-6 py-6 lg:px-8">
                        <div className=" sm:w-full sm:max-w-sm">
                            <h2 className="mt-1 font-semibold text-2xl  leading-9 tracking-tight text-gray-900">
                                Create Account
                            </h2>
                        </div>
                        <div className="mt-1   sm:max-w-sm">
                            <form className="space-y-6" onSubmit={onSignup}>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Your name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder='First and last name '
                                            value={credentials.name}
                                            onChange={onChange}
                                            id="name"
                                            name="name"
                                            type="name"
                                            autoComplete="name"
                                            required
                                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
                                        Mobile number
                                    </label>
                                    {/* <div className="mt-2 flex ">
                       <div className='border border-1 rounded-lg' >

                           <form action="/action_page.php" method="get">

                               <input list="browsers" className='rounded-lg h-full p-2 w-full' name="browser" id="browser" />
                               <datalist id="browsers" className='bg-white text-black'>
                                   <option value="Edge" />
                                   <option value="Firefox" />
                                   <option value="Chrome" />
                                   <option value="Opera" />
                                   <option value="Safari" />
                               </datalist>

                           </form>
                       </div>
                       <input
                           placeholder='Mobile number'
                           value={credentials.number}
                           onChange={onChange}
                           id="number"
                           name="number"
                           type="text"
                           autoComplete="number"
                           required
                           className="block w-full px-2 mx-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                       />
                   </div> */}
                                    <PhoneInput 
                                    
                                    countryCodeEditable={false}
                                        inputStyle={{width:"100%"}}
                                        country={'in'}
                                        value={ph}
                                        onChange={setPh}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder='At least 6 characters '
                                            value={credentials.password}
                                            id="password"
                                            onChange={onChange}
                                            name="password"
                                            type="password"
                                            autoComplete="password"
                                            required
                                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <p className=' text-sm'>Paswords must be at east 6 characters. </p>
                                </div>
                                <p className=' text-sm'>To verify your number, we will send you a text message with a temporary code. Message and data rates may apply. </p>
                                <div>
                                    <button
                                        type="submit"

                                        className="text-black flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                                    >
                                        Verify mobile number
                                    </button>
                                </div>
                            </form>
                            <hr></hr>
                            <div className='my-3'>

                                <p className="font-bold text-sm text-gray-500">
                                    Buying for work ?

                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    <a href="/" className="font-semibold leading-6 text-blue-600 hover:text-blue-500 hover:underline">
                                        Create a free business account
                                    </a>
                                </p>
                            </div>
                            <hr></hr>

                            <p className="mt-5 text-sm ">
                                Already have an account?{' '}
                                <Link to="/login" className="font-semibold mt-1leading-6 text-blue-600 hover:text-blue-500 hover:underline">
                                    Sign in
                                </Link>
                            </p>
                            <p className="mt-4 text-sm  ">
                                By creating an account or logging in, you agree to Amazon’s Conditions of Use{' '}
                                <a href="/" className="font-semibold leading-6 text-blue-600 hover:text-blue-500 hover:underline">
                                    Conditions of Use
                                </a> and{' '}
                                <a href="/" className="font-semibold leading-6 text-blue-600 hover:text-blue-500 hover:underline">
                                    Privacy Policy.
                                </a>
                            </p>
                        </div>
                    </div>

                }
            </div>
            {/*eslint-disable-next-line */}
            <Footer_a />
        </div>
    )
}

export default SignUp