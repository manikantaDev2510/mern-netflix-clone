// ✅ Importing required modules
// Express is the Node.js framework we're using to build our backend
import express from "express";

// Middleware to parse cookies from incoming requests
import cookieParser from "cookie-parser";

// Path module to handle and transform file paths
import path from "path";


// ✅ Importing route files (handles different parts of the app)
import authRoutes from "./routes/auth.route.js";     // Handles user auth (login/signup)
import movieRoutes from "./routes/movie.route.js";   // Handles movie-related routes
import tvRoutes from "./routes/tv.route.js";         // Handles TV show-related routes
import searchRoutes from "./routes/search.route.js"; // Handles search functionality


// ✅ Importing environment and database configuration
import { ENV_VARS } from "./config/envVars.js";      // Contains environment variables (like PORT, MONGO_URI, JWT_SECRET, NODE_ENV, TMDB_API_KEY)
import { connectDB } from "./config/db.js";          // Function to connect to the database
import { protectRoute } from "./middleware/protectRoute.js"; // Middleware to protect certain routes


// ✅ Create an Express application instance
const app = express();

// Get PORT value from environment variables
const PORT = ENV_VARS.PORT;

// Set __dirname manually since it's not available in ES Modules
const __dirname = path.resolve();


// ✅ MIDDLEWARES
// Parses incoming requests with JSON payloads
app.use(express.json()); 

// Parses cookies from the request headers and makes them accessible in `req.cookies`
app.use(cookieParser());


// ✅ ROUTES
// All routes starting with /api/v1/auth will be handled by authRoutes (e.g., /login, /signup, /logout, /authCheck)
app.use("/api/v1/auth", authRoutes);

// All routes starting with /api/v1/movie are protected (need authentication) and will be handled by movieRoutes (e.g., /trending, /:id/trailers, /:id/details, /:id/similar, /:category)
app.use("/api/v1/movie", protectRoute, movieRoutes);

// All routes starting with /api/v1/tv are protected (need authentication) and will be handled by tvRoutes (e.g., /:id/trailers, /:id/details, /:id/similar, /:category)
app.use("/api/v1/tv", protectRoute, tvRoutes);

// All routes starting with /api/v1/search are protected (need authentication) and will be handled by searchRoutes (e.g., /login, /signup, /logout, /authCheck)
app.use("/api/v1/search", protectRoute, searchRoutes);

// ✅ SERVE FRONTEND IN PRODUCTION
// If the app is running in production mode
if (ENV_VARS.NODE_ENV === "production") {
    // Serve static files from the frontend's build folder (usually from Vite or React build)
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    // All other routes (not starting with /api) should return the main index.html file
    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// ✅ START THE SERVER
// Start the server on the specified PORT and connect to the database
app.listen(PORT, () => {
    console.log("✅ Server started at http://localhost:" + PORT);

    // Call the function to connect to MongoDB or other DB
    connectDB();
});
