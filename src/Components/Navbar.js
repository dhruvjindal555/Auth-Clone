import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <div className='flex w-screen justify-evenly bg-black p-2 text-white'>
        <div className=' border-2 border-black flex'>
          <img src="amazon-logo-s3f.png" alt='amazon' className='h-10 ' />
          <p>.in</p>
        </div>
        <div className='flex justify-center items-center'>
          <i className="fa-solid fa-location-dot"></i>
          <div className='flex flex-col'>
            <span> Delivering to Delhi 121004</span>
            <span>Update Location</span>
          </div>
        </div>
        <div className='flex justify-center items-center' >
          <div className='text-black'>
            <form action="">
              {/* <label for="cars">Choose a car:</label> */}
              <select id="cars" name="cars" className='p-2 bg-gray-300 border'>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="fiat">Fiat</option>
                <option value="audi">Audi</option>
              </select>
            </form>
          </div>
          <div>
            <input type='text' className=' bg-slate-100 p-2 ' />
          </div>
          <div >
            <button className='p-2 bg-orange-400'>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <div>
            <span>
              IND
            </span>
          </div>
          <div className=''>
            <form action="">
              {/* <label for="cars">Choose a car:</label> */}
              <select id="cars" name="cars" className='p-2 bg-black '>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="fiat">Fiat</option>
                <option value="audi">Audi</option>
              </select>
            </form>
          </div>
        </div>
        <div >
          <p>Hello, sign in </p>
          <p>Accounts & Lists</p>
          <Link to='/login'>LogIn</Link>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <p>Returns</p>
          <p>& Orders</p>
        </div>
        <div className='flex justify-center items-center'>
          <i className="fa-solid fa-cart-shopping"></i>
          <p>
            Cart
          </p>
        </div>
      </div>

    </>
  )
}

export default Navbar