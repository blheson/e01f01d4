import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { archiveCall, retrieveCall } from '../apis';
import moment from 'moment';
import { BsArrowLeft } from 'react-icons/bs';

const CallDetails = () => {
  const [callData, setCallData] = useState({});
  const [isMount, setIsMount] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    mount()
  }, [mount])
  const mount = async () => {
    try {
      if(isMount){
        return;
      }
      const result = await retrieveCall(params.id)

 
      setCallData(result.data)
      // setIsMount(true)

    } catch (error) {

    } finally {
      setIsMount(true)

    }

  }
  const handleArchive = () => {
 
    archiveCall(callData.id, { is_archived: !callData.is_archived }).then((result) => {
 
      if (result.status === 200) {
        setCallData((prev) => {
          return { ...prev, is_archived: !prev.is_archived }
        })
      }
    })
  }
  const toPage = (url) => {
    navigate(url);
  }
 
  if (!isMount) {
    return <div className='p-5'>
      <div className='flex justify-center'>
      <div className='w-[50%] h-[100px] bg-[#f8f8f8] mt-3'></div>
   
      </div>
      <div>
      <div className='w-full h-[30px] bg-[#f8f8f8] mt-3 rounded-lg'></div>
      <div className='w-full h-[30px] bg-[#f8f8f8] mt-3 rounded-lg'></div>
      </div>

    </div>
  }
  return (

    <div className="container-view">
      <div >

        <button onClick={()=>toPage('/')}><BsArrowLeft /></button>
        <div className='flex justify-center text-center w-full'>
          <div>
            <div className=''>
              <span className='text-[60px]'>{callData.from}</span>

            </div>


          </div>

        </div>
        <hr className='w-full' />
        <div className={`text-center mt-3 bg-[#f0f1f1] rounded-lg p-4  text-[15px] leading-5 ${callData.call_type === 'missed' ? 'text-[#ff0000]' : ''}`}>
          <div className='text-[15px]'>{callData.direction === 'inbound' ? 'Incoming Call' : 'Outgoing Call'}</div>
          {callData.call_type !== 'missed' && <div className='text-[15px]'>{callData.duration} secs</div>}
          <div>{moment(callData.created_at).format('DD/mm/yyyy')}</div>

        </div>
        <div className='bg-[#f0f1f1] rounded-lg mt-4 p-4 cursor-pointer'>
          {/* <button class="py-2 px-4 shadow-md no-underline rounded-full bg-[#000] text-white text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">{callData.is_archived ? 'unarchive' : 'archive'}</button> */}
          <span className={`${callData.is_archived ? 'text-[#ff0054]' : 'text-[#399b45]'}`} onClick={handleArchive}>{callData.is_archived ? 'unarchive' : 'archive'}</span>
        </div>
      </div>

    </div>

  );
};


export default CallDetails;
