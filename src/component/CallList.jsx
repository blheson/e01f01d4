
import React, { useCallback, useEffect, useState } from 'react';
import { retrieveCalls } from '../apis';
import { useNavigate } from 'react-router-dom';
import EmptyList from './EmptyList';
import { callIcon, formatCallTime, getSecondPartyData } from '../utils';

const CallList = ({ activeTab = 'All' }) => {
    const [calls, setCalls] = useState([]);

    const [isMount, setIsMount] = useState(false);

    const navigate = useNavigate();

    const populateCalls = useCallback(() => {
        setIsMount(false)
        setCalls([])
        retrieveCalls().then(result => {
            if (result?.data && Array.isArray(result.data) && result?.data?.length > 0) {
                const filtered = result.data.filter((call) =>
                    activeTab === 'All' ? !call.is_archived : call.is_archived)

                setCalls(filtered)
            }
            setIsMount(true)
        }).catch((error) => {
            setIsMount(true)
        })
    }, [activeTab]);

    useEffect(() => {
        populateCalls()
        // eslint-disable-next-line
    }, [activeTab])

    function toPage(url) {
        navigate(url);
    }

    if (!isMount) {
        return <div className=''>
            <div>
                <div className='w-full h-[50px] bg-[#f8f8f8] mt-3 rounded-lg'></div>
                <div className='w-full h-[50px] bg-[#f8f8f8] mt-3 rounded-lg'></div>
                <div className='w-full h-[50px] bg-[#f8f8f8] mt-3 rounded-lg'></div>
            </div>
        </div>
    }

    //if no result, show empty component
    if (isMount && calls.length === 0) {
        return <EmptyList />
    }

    return (
        <div className="home overflow-scroll mw-[50vh]">
            {
                calls.map((call) => (
                    <div onClick={() => { toPage(`call/${call.id}`) }} key={call.id} className='my-3 rounded border cursor-pointer p-5 hover:bg-[whitesmoke]'>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-3 items-center'>
                                <div className='w-[13px]'>{callIcon(call)}</div>
                                <div>
                                    <div><span className={`text-bold text-lg ${call.call_type === 'missed' ? 'text-[red]' : ''} `}>{getSecondPartyData(call)}</span></div>
                                    <div><span className='text-bold text-gray-500'>via {call.via}</span></div>
                                </div>
                            </div>
                            <div>{formatCallTime(call.created_at)}</div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};


export default CallList;
