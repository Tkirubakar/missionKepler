import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/common/Header/Header";
import Home from "./pages/Home/Home";
import AllMovies from "./pages/AllMovies/AllMovies";
import Login from "./pages/Login/Login";
import NowShowing from "./pages/NowShowing/NowShowing";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

export default function App() {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<div style={{padding:40}}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allMovies" element={<AllMovies />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/showTime" element={<NowShowing />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}