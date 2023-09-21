import React, { useEffect } from 'react'
import { LIGHT_LOGO_LINK, SIDEPANEL_CONFIG } from '../utils/constants'

const SidePanel = () => {

    useEffect(() => {
        cacheImage(LIGHT_LOGO_LINK);
    }, []);

    const cacheImage = async (imgUrl) => {
        await new Promise((res, rej) => {
            const img = new Image();
            img.src = imgUrl;
            img.onload = res();
            img.onerror = rej();
        });
    }

    return (
        <div className='w-[18%] p-10 '>
            <div className='w-4/5 ml-7'>
                <img className='' src={LIGHT_LOGO_LINK} alt="logo" />
            </div>
            <ul className='w-full  mt-10' >
                {
                    SIDEPANEL_CONFIG.map((item,index) => (
                        <li className={`flex ml-5 items-center hover:bg-[#2042a8] hover:text-gray-100 rounded-2xl p-3 mb-3 ${item.active?'text-gray-100 bg-[#2042a8] ':' text-gray-500 '}`}>
                            <svg class="h-7 w-7 mr-5 ml-2"><use xlinkHref={item.link}></use></svg>
                            <span>{item.text}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SidePanel
