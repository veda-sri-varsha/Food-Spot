// import React from 'react'
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../src/Components/Pages/Home";
import FoodList from "../src/Components/Pages/FoodList";
import PaymentPage from "../src/Components/Pages/PaymentPage";


const App = () => {
  return (
     <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/FoodList" element={<FoodList />} />
          <Route path="/PaymentPage" element={<PaymentPage />} />
        </Routes>
      </Router>
  )
}

export default App
