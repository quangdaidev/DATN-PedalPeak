
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './globals.css';
import Home from './Pages/Home';
import Header from './Components/Header';

function App() {

  return (

    <div id="root">
      <BrowserRouter>
        {/* <ReduxProviders> */}
        {/* biến toàn cục ảnh hưởng header, children, footer */}
        {/* <SearchProvider>  */}
        <div className="bg-white fixed top-0 left-0 z-50 w-full">
          <div className="content-wrapper font-Karla max-w-screen-2xl text-base mx-auto px-8">
            <Header />
          </div> 
        </div>  
        <div className="content-wrapper font-Karla max-w-screen-2xl text-base mx-auto px-8">
          <Routes>
            <Route path="/" exact={true} element={<Home/>} />
          </Routes>
          {/* {children} */}
        </div>
        <div className="bg-white pt-8 pb-1">
          <div className="content-wrapper font-Karla max-w-screen-2xl text-base mx-auto px-8">
            {/* <Footer /> */}
          </div> 
        </div>  
        {/* </SearchProvider> */}
      {/* </ReduxProviders> */}
      </BrowserRouter>
    </div>
   
  );
}

export default App;
