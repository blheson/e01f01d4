
import React, { useEffect, useState } from 'react';
import { retrieveCalls } from '../apis';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const CallList = ({ activeTab = 'All' }) => {
    const [calls, setCalls] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        mount()
    }, [mount])
    useEffect(()=>{
        setCalls([])
        populateCalls()
    },[activeTab])
    const mount = () => {
        if(calls.length === 0){
            populateCalls();
        }

    }
    const populateCalls = ()=>{
        retrieveCalls().then(result => {
            if (result?.data && Array.isArray(result.data) && result?.data?.length > 0) {
                const filtered = result.data.filter((call) => activeTab === 'All' ? !call.is_archived : call.is_archived)
       
                setCalls(filtered )
            }

        });
    }
    const toPage = (url) => {
        navigate(url);
    }

    return (

        <div className="home">

            {
                calls.map((call) => (
                    //  <>{call.id}</>
                    <div onClick={() => { toPage(`call/${call.id}`) }} key={call.id} className='my-3 rounded border cursor-pointer p-5'>
                        <div className='flex justify-between'>  <div>{call.call_type === 'answered' ? 'call' : 'missed'}</div>
                            <div><span className='text-bold'>{call.from}</span></div>
                            <div>{moment(call.created_at).format('DD/MM/yyyy')}</div>

                        </div>

                    </div>
                ))
            }
        </div>

    );
};


export default CallList;
