import React from 'react';
import { BsFillHouseDoorFill } from 'react-icons/bs';
const NotFound = () => {
  return (


    <div className="container-view flex flex-col justify-center items-center">
      <div className="container-view flex justify-center m-auto text-[30px]">
        404 not found

      </div>
      <a className='cursor-pointer flex gap-2' href='/'><span><BsFillHouseDoorFill  color='blue'/></span><span className='text-blue'> Home</span></a>
    </div>
  );
};


export default NotFound;
