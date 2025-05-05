import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";  // Importing Toaster for displaying notifications
import { Loader } from "lucide-react";  // Importing Loader component to show a loading spinner during authentication checking

import { useAuthStore } from "./store/authUser.js";  // Importing custom hook for managing authentication state

import HomePage from "./pages/home/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import WatchPage from "./pages/WatchPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import SearchHistoryPage from "./pages/SearchHistoryPage.jsx";
import NotFoundPage from "./pages/404.jsx";

export default function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();  // Getting `user`, `isCheckingAuth`, and `authCheck` from the custom hook

  // Running authentication check on component mount
  useEffect(() => {
    authCheck();  // Calls the authCheck function to check the authentication status
  }, [authCheck]);  // Runs when `authCheck` function changes

  if (isCheckingAuth) {  // If authentication is being checked, display the loading spinner
    return (
      <div className='h-screen'>
        <div className='flex justify-center items-center bg-black h-full'>
          <Loader className='animate-spin text-red-600 size-10' />  {/* Shows a loading spinner */}
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to="/login" />} />
        <Route path="/search" element={user ? <SearchPage /> : <Navigate to="/login" />} />
        <Route path="/history" element={user ? <SearchHistoryPage /> : <Navigate to="/login" />} />
        <Route path="/*" element={user ? <NotFoundPage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster position="top-right"
        reverseOrder={false}
      />
    </>
  );
}
