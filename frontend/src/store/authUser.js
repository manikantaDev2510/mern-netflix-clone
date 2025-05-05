// Importing axios for making HTTP requests, toast for showing notifications, and create from Zustand to manage state
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

// Creating the Zustand store for managing authentication-related state
export const useAuthStore = create((set) => ({
  // Initial state for user and various authentication-related states
  user: null,                  // Stores the authenticated user object (null means no user is authenticated)
  isSigningUp: false,          // A flag to indicate if the user is in the process of signing up
  isCheckingAuth: true,        // A flag to indicate if the app is checking authentication status
  isLoggingOut: false,         // A flag to indicate if the user is logging out
  isLoggingIn: false,          // A flag to indicate if the user is logging in

  // Async function to handle user signup
  signup: async (credentials) => {
    set({ isSigningUp: true });  // Set the signing up flag to true
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);  // Make POST request to signup API
      set({ user: response.data.user, isSigningUp: false });  // On success, set the user state and stop signing up
      toast.success("Account created successfully");  // Show success notification
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed");  // Show error notification
      set({ isSigningUp: false, user: null });  // Reset the state on failure
    }
  },

  // Async function to handle user login
  login: async (credentials) => {
    set({ isLoggingIn: true });  // Set the logging in flag to true
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);  // Make POST request to login API
      set({ user: response.data.user, isLoggingIn: false });  // On success, set the user state and stop logging in
      toast.success("Logged in successfully ");  // Show success notification	  
    } catch (error) {
      set({ isLoggingIn: false, user: null });  // Reset the state on failure
      toast.error(error.response.data.message || "Login failed");  // Show error notification
    }
  },

  // Async function to handle user logout
  logout: async () => {
    set({ isLoggingOut: true });  // Set the logging out flag to true
    try {
      await axios.post("/api/v1/auth/logout");  // Make POST request to logout API
      set({ user: null, isLoggingOut: false });  // On success, reset the user state and stop logging out
      toast.success("Logged out successfully");  // Show success notification
    } catch (error) {
      set({ isLoggingOut: false });  // Stop logging out on failure
      toast.error(error.response.data.message || "Logout failed");  // Show error notification
    }
  },

  // Async function to check the user's authentication status
  authCheck: async () => {
    set({ isCheckingAuth: true });  // Set the checking auth flag to true
    try {
      const response = await axios.get("/api/v1/auth/authCheck");  // Make GET request to check authentication status
      set({ user: response.data.user, isCheckingAuth: false });  // If authenticated, set the user state and stop checking
    } catch (error) {
      set({ isCheckingAuth: false, user: null });  // If not authenticated, reset the user state and stop checking
    }
  },
}));
