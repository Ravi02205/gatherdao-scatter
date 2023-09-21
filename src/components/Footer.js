import React from 'react'
import { LIGHT_LOGO_LINK } from '../utils/constants'

const Footer = () => {
  return (
    <div className='w-[98.9vw] h-[500px] px-40 py-36 '>
      <div className='w-4/5 my-10'>
        <img className='' src={LIGHT_LOGO_LINK} alt="logo" />
      </div>
      <p className='text-xl my-10'>Full Stack Decentralized Fundraising Platform</p>
      <hr className=' w-28 text-xl my-10 h-[2px] bg-gradient-to-r from-[#04EAF6] to-[#E527A0]' />
      <p className='text-xl my-10'>© All Rights Reserved 2023</p>
    </div>
  )
}

export default Footer
