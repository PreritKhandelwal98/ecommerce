import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Header, Footer } from './Components'
import { Home, Contact } from './Pages'
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
