import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { archiveCall, retrieveCall } from '../apis';
import { BsArrowLeft } from 'react-icons/bs';
import { callIcon, formatCallTime, getSecondPartyData } from '../utils';

const CallDetails = () => {
  const [callData, setCallData] = useState({});
  const [isMount, setIsMount] = useState(false);
  const navigate = useNavigate();
  const params = useParams();


  useEffect(() => {

    const mount = async () => {
      try {
        if (isMount) {
          return;
        }
        const result = await retrieveCall(params.id);
 
        //Redirect to 404 if not found
        if(result.error){
          toPage('/404')
          return;
        }
        setCallData(result.data);

      } catch (error) {

      } finally {
        setIsMount(true)
      }
    }
    mount();
    // eslint-disable-next-line
  }, [params.id, isMount])

  const handleArchive = () => {
    //optimistic update of data
    setCallData((prev) => {
      return { ...prev, is_archived: !prev.is_archived }
    })
    try {
      archiveCall(callData.id, { is_archived: !callData.is_archived });
    } catch (error) {
      //silently ignore error
    }
  }
  function toPage(url) {
    navigate(url);
  }

  //Show skeleton while loading
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

        <button onClick={() => toPage('/')}><BsArrowLeft /></button>
        <div className='flex justify-center text-center w-full'>
          <div>
            <div className=''>
              <span className='text-[60px]'>{ getSecondPartyData(callData)}</span>

            </div>

          </div>

        </div>
        <hr className='w-full' />
        <div className={`text-center mt-3 bg-[#f0f1f1] rounded-lg p-4  text-[15px] leading-5 ${callData.call_type === 'missed' ? 'text-[#ff0000]' : ''}`}>
          <div className='flex  gap-3 items-center'>
           { callData.call_type !== 'missed' && <div>{callIcon(callData)}</div>}
            <div className={`text-[15px] ${callData.call_type === 'missed' ? 'text-[red]' : ''} `}>{callData.direction === 'inbound' ? 'Incoming Call' : 'Outgoing Call'}</div>
          </div>
          <div className='flex gap-3 mt-3 text-sm'>
            {callData.call_type !== 'missed' && <div className='text-[15px]'>{callData.duration} secs ({callData.call_type})</div>}
       
          </div>
          <div className='flex gap-1 mt-1 text-sm opacity-60'>
      
          <div>{formatCallTime(callData.created_at)},</div><div>via {callData.via}</div>
          </div>

        </div>
        <div className='bg-[#f0f1f1] rounded-lg mt-4 p-4 cursor-pointer'>
          <span className={`${callData.is_archived ? 'text-[#ff0054]' : 'text-[#399b45]'}`} onClick={handleArchive}>{callData.is_archived ? 'unarchive' : 'archive'}</span>
        </div>
      </div>

    </div>

  );
};


export default CallDetails;
