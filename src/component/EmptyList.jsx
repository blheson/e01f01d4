import React from 'react';
import { BsFillTelephoneFill } from 'react-icons/bs';
const EmptyList = () => {

    return (
        <div className='mt-[50%]'>
            <div className='opacity-60 w-[50%] p-3 h-[100px] m-auto text-center flex flex-col items-center gap-5'>
                <BsFillTelephoneFill />
                <div className='text-bold text-lg'>List is empty</div>
            </div>
        </div>
    );
};

export default EmptyList;
