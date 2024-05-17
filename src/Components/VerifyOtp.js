import React from 'react';
import { CgSpinner } from "react-icons/cg"
import Footer_a from './Footer_a'
import { BsFillShieldLockFill } from "react-icons/bs";
import OtpInput from "otp-input-react";
import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { auth } from "../Firebase/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";


function VerifyOtp() {
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(null);

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        onSignup();
                    },
                    "expired-callback": () => { },
                },
                auth
            );
        }
    }

    function onSignup() {
        setLoading(true);
        onCaptchVerify();

        const ExampleVerifier = window.recaptchaVerifier;

        const formatPh = "+" + ph;

        signInWithPhoneNumber(auth, formatPh, ExampleVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);               
                toast.success("OTP sended successfully!");
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                console.log(res);
                setVerified(res.user);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }


    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-3 lg:px-8">
                <Toaster toastOptions={{ duration: 4000 }} />
                <div id="recaptcha-container"></div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm relative">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="amazon-logo-black.png"
                        alt="Your Company"
                    />
                    <p className='absolute  right-24 top-1 '>.in</p>
                </div>
            </div>
            <div className='flex flex-col p-5 sm:max-w-sm sm:mx-auto  bg-black w-full    justify-center items-center'>

                (
                <>
                    <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                        <BsFillShieldLockFill size={30} />
                    </div>
                    <label
                        htmlFor="otp"
                        className="font-bold text-xl text-white text-center"
                    >
                        Enter your OTP
                    </label>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        autoFocus
                        className="opt-container "
                    ></OtpInput>
                    <button
                        onClick={onOTPVerify}
                        className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                    >
                        {loading && (
                            <CgSpinner size={20} className="mt-1 animate-spin" />
                        )}
                        <span>Verify OTP</span>
                    </button>
                </>
                )
            </div>
            {/*eslint-disable-next-line */}
            <Footer_a />
        </div>
    )
}

export default VerifyOtp