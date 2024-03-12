import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/header/Header';
import Footer from './Components/footer/Footer';
import Contact from './Pages/contact/Contact'

import { Home } from './Pages/index'
function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        {/* <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
        <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
