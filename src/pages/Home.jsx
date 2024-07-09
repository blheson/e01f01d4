import React, { useState } from 'react';
import CallList from '../component/CallList.jsx';


const Home = () => {
  const [activeTab, setActiveTab] = useState('All');
 
  function activetabClass(){
    return 'active text-white dark:bg-gray-800 '
  }
  return (
      <div className="container-view">
     
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 justify-center border-b-1 cursor-pointer">
          <li className="me-2 ">
             <span  aria-current="page" className={`inline-block p-4 w-[80px] rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300  ${activeTab === 'All'?  activetabClass() :''}`} onClick={()=>{
                setActiveTab('All')
              }}>All</span>
          </li>
          <li className="me-2">
                <span className={`inline-block p-4 rounded-t-lg w-[80px] hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 ${activeTab === 'Archived'? activetabClass():''}`} onClick={()=>{
                setActiveTab('Archived')
              }}>Archived</span>
          </li>
          </ul>
        <CallList activeTab={activeTab}/>
      </div>
  );
};


export default Home;
