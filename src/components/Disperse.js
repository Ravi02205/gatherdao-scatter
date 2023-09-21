import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { COLOR_CIRCLE_LINK, GRAY_CIRCLE_LINK, STEP_FORM_CONFIG, SUPPORT_BUTTON_CONFIG } from '../utils/constants'
import { tags as t } from '@lezer/highlight';
import createTheme from '@uiw/codemirror-themes';
import { AiOutlineExclamationCircle } from "react-icons/ai";

const Disperse = () => {

    const [state, setState] = useState([]);
    const [values, setValues] = useState({});
    const [error, setError] = useState({});


    const myTheme = createTheme({
        dark: 'light',
        settings: {
            background: '#F5F6FA',
            foreground: '#4D4D4C',
            caret: '#AEAFAD',
            selection: '#D7D4F0',
            selectionMatch: '#FF9632',
            gutterBackground: '#F5F6FA',
            gutterForeground: '#4D4D4C',
            gutterBorder: '#dddddd',
            gutterActiveForeground: '',
            lineHighlight: '#F5F6FA',
        },
        styles: [
            { tag: t.comment, color: '#000000' },
            { tag: t.definition(t.typeName), color: '#000000' },
            { tag: t.typeName, color: '#000000' },
            { tag: t.tagName, color: '#000000' },
            { tag: t.variableName, color: '#000000' },
        ],
    });
    const splitInput = (input) => {
        return input.split(/\s|,|=/).filter((item) => item.trim() !== '');
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const splitState = state?.map(splitInput);
        const [notValidFlag, array] = checkForSeparator(splitState);
        if (notValidFlag) {
            const [notValidAmountFlag, errorArray] = checkForAmount(splitState);
            if (notValidAmountFlag) {
                const [duplicateArray] = checkForDuplicates(splitState);
                setError({ code: 'duplicate', array: duplicateArray });
            } else {
                setError({ code: 'notValid', array: errorArray });
            }
        }else{
            setError({ code: 'notValidInput', array: array });
        }
    };

    const checkForAmount = (inputArray) => {
        const arr = [];
        inputArray.forEach((splitArr, index) => {
            if (splitArr.length !== 2 || isNaN(+splitArr[1])) {
                arr.push({ index });
            }
        });
        return [arr.length === 0, arr];
    };

    const checkForDuplicates = (inputArray) => {
        const obj = {};
        inputArray.forEach((splitArr, index) => {
            const [address, amountValue] = splitArr;
            if (!obj.hasOwnProperty(address)) {
                obj[address] = [];
            }
            obj[address].push({ index, amountValue });
        });
        setValues(obj);

        const arr = [];
        for (const prop in obj) {
            const value = obj[prop];
            if (value.length > 1) {
                arr.push({ address: prop, data: value });
            }
        }
        return [arr];
    };

    const checkForSeparator = (inputArray) => {
        const arr = [];
        inputArray.forEach((splitArr, index) => {
            if (splitArr.length !== 2) {
                arr.push({ index });
            }
        });
        return [arr.length === 0, arr];
    };

    const keepFirstOne = () => {
        const finalArr = [];
        for (const props in values) {
            const amountValue = values[props][0].amountValue;
            finalArr.push(`${props} ${amountValue}`);
        }
        setState(finalArr);
        setError({});
    };

    const combineBalances = () => {
        const finalArr = [];
        for (const props in values) {
            const tempArr = values[props];
            const amountValue = tempArr.reduce((prev, curr) => prev + (+curr.amountValue), 0);
            finalArr.push(`${props} ${amountValue}`);
        }
        setState(finalArr);
        setError({});
    };
    console.log('error :', error);
    return (
        <div className='bg-white w-full p-10 mt-10 rounded-3xl'>
            <div className='flex items-center '>
                {
                    STEP_FORM_CONFIG?.map((item, index) => {
                        return (
                            <>
                                <div className='flex flex-col justify-between items-center'>
                                    <img className="w-2/5 " src={`${item.active ? COLOR_CIRCLE_LINK : GRAY_CIRCLE_LINK}`} alt="" />
                                    <span className='text-sm text-gray-400 mt-3'>{item.text}</span>
                                </div>
                                {index === STEP_FORM_CONFIG.length - 1 ? '' : <hr className='w-1/2'></hr>}
                            </>
                        )
                    })

                }
            </div>
            <form onSubmit={onSubmit} className='w-3/4'>
                <div className='mt-10'>
                    <h1 className='text-4xl font-medium'>Prepare to scatter</h1>
                    <p className='mt-2'>We support the following Networks</p>
                    <ul className='flex mt-10'>
                        {SUPPORT_BUTTON_CONFIG?.map((item) => {
                            return (
                                <li className='ml-3 w-1/3'>
                                    <button className='w-full flex items-center rounded-full' onClick={(e)=>{e.preventDefault()}}>
                                        <img className="inline w-1/5" src={item.link} alt={item.text} />
                                        <span className='text-lg font-medium'>{item.text}</span>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className='flex justify-between items-baseline mt-3 lg:mt-5'>
                    <label htmlFor="input text-medium">Addresses with Amounts</label>
                    <div>Upload File</div>
                </div>
                <div className='bg-[#F5F6FA] p-4 rounded-md mt-3'>
                    <CodeMirror
                        value={state.join('\n')}
                        height="200px"
                        theme={myTheme}
                        onChange={(value, viewUpdate) => {
                            setState(value.split('\n'));
                        }}
                    />
                </div>
                <div className='flex justify-between items-baseline mt-3 lg:mt-5'>
                    <p>Separated by ',' or ' ' or '='</p>
                    <p>Show Example</p>
                </div>
                {error?.code === "duplicate" &&
                    <div className='my-5'>
                        <div className='flex justify-between text-red-600'>
                            <p>Duplicated</p>
                            <div>
                                <button onClick={keepFirstOne}>Keep The first One </button>
                                <span> | </span>
                                <button onClick={combineBalances}> Combine Balance</button>
                            </div>
                        </div>
                        <div className="border rounded-lg border-red-600 px-4 py-2 flex items-center">
                            <div className='text-red-600 text-xl mr-4'><AiOutlineExclamationCircle /></div>
                            <div>
                                {error?.array?.map((item) => {
                                    return <><span className='text-red-600'>Address {item?.address} encoutered duplicate in line : {item?.data?.map((it) => it?.index + 1 + ',')}</span><br /></>;
                                })}
                            </div>
                        </div>
                    </div>
                }
                {(error?.code === "notValid"|| error?.code === "notValidInput") &&
                    <div className='border rounded-lg border-red-600 px-4 py-2 my-5'>
                        {error?.array?.map((item) => {
                            return <><span className='text-red-600'>Line no {item?.index+1} {error?.code === "notValidInput" ?`Input Wrong`:`Amount Wrong`}</span><br /></>;
                        })}
                    </div>
                }
                <button type='submit' className='mt-2 text-xl text-white w-full bg-blue-500 h-16 rounded-xl'>Next</button>
            </form>
        </div>
    )
}

export default Disperse
