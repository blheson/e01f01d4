

import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Routes } from './utils/routes';
import Header from './component/Header';
const router = createBrowserRouter(createRoutesFromElements(Routes));

function App() {
  return (
    <div className='container'>
      <Header/>
      {/* <div className="container-view">Some activities should be here</div> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
