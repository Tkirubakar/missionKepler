import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Restaurants from "./pages/Restaurants/Restaurants";
import RestaurantDetail from "./pages/RestaurantDetail/RestaurantDetail";
import Reserve from "./pages/Reserve/Reserve";
import Header from "./components/Header/Header";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/restaurants"
            element={
              <div className="container">
                <Restaurants />
              </div>
            }
          />
          <Route
            path="/restaurant/:id"
            element={
              <div className="container">
                <RestaurantDetail />
              </div>
            }
          />
          <Route
            path="/reserve"
            element={
              <div className="container">
                <Reserve />
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;