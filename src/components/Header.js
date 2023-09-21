import React, { useState } from 'react'

const Header = () => {
    const [popUp, setPopup] = useState(false);
    return (
        <div className='flex justify-end'>
            <button className='w-32 relative border-2 rounded-full items-center border-gray-300 hover:text-[#40a9ff] py-3 px-4 flex justify-center mr-2 bg-white' onMouseOver={() => { setPopup(true) }} onMouseLeave={() => { setPopup(false) }}>
                <span>Light</span>
                <svg class="h-1 w-2 ml-4"><use xlinkHref='/static.svg#caret-down'></use></svg>
                {popUp && <div className="popup absolute top-[51px] w-[200px] left-[-20px] bg-white border-b-[5px] border-b-white" onMouseOver={() => { setPopup(true) }}>
                    <ul>
                        <li className='text-[#345bfa] flex p-2 items-center '>
                            <svg class="h-[15px] w-[15px] mr-2"><use xlinkHref='/static.svg#check'></use></svg>
                            <span>Light</span>
                        </li>
                        <li className='text-gray-300 flex  p-2 items-center hover:bg-gray-300 hover:text-white'>
                            <svg class="h-[15px] w-[15px] mr-2"><use xlinkHref='/static.svg#check'></use></svg>
                            <span>Dark</span>
                        </li>
                    </ul>
                </div>}
            </button>
            <button className='border-2 rounded-full border-gray-300 hover:border-[#40a9ff] bg-white py-3 px-5'>
                <span>Connect Wallet</span>
            </button>
        </div>
    )
}

export default Header