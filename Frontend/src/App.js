import React  from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
//import Form from "./components/Form/form";
import MainPage from "./components/Main/main";

function App() {
  return (
   <>
     <BrowserRouter>
       <Routes>
         
          <Route path="/" element={<MainPage/>} />
         
       </Routes>
     
     </BrowserRouter>
   </>
  )
}

export default App;
