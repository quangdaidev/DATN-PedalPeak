
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './globals.css';
import Home from './Pages/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ProductDetails from './Pages/ProductDetails';
// import axios from 'axios';

function App() {

  return (

    <div id="root" className="content-wrapper font-Karla max-w-screen-2xl text-base mx-auto px-8">
      <BrowserRouter>
        {/* <ReduxProviders> */}
        {/* biến toàn cục ảnh hưởng header, children, footer */}
        {/* <SearchProvider>  */}
        <Header />
        <Routes>
          <Route path="/" exact={true} element={<Home/>} />
          <Route path="/product/:id" exact={true} element={<ProductDetails/>} />
        </Routes>
        <Footer />
          {/* {children} */}

        {/* <div className="bg-white pt-8 pb-1">
          <div className="content-wrapper font-Karla max-w-screen-2xl text-base mx-auto px-8">
            <Footer />
          </div> 
        </div>   */}
        {/* </SearchProvider> */}
      {/* </ReduxProviders> */}
      </BrowserRouter>
    </div>
   
  );
}

export default App;
