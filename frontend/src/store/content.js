// Importing the `create` function from Zustand to create a state store
import { create } from "zustand";

// Creating a Zustand store to manage the state of content type
export const useContentStore = create((set) => ({
  // Initial state of contentType is set to "movie"
  contentType: "movie",

  // A method to update the contentType in the store
  setContentType: (type) => set({ contentType: type }),  // This function updates the state with the new content type
}));
