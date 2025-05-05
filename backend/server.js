// const express =require('express'); //this is for commonjs
// import express from 'express';       //for import purpose we use es-modules 
// We can use any one of the from above

// import express from "express";
// import cookieParser from "cookie-parser";
// import path from "path";

// import authRoutes from "./routes/auth.route.js";
// import movieRoutes from "./routes/movie.route.js";
// import tvRoutes from "./routes/tv.route.js";
// import searchRoutes from "./routes/search.route.js";

// import { ENV_VARS } from "./config/envVars.js";
// import { connectDB } from "./config/db.js";
// import { protectRoute } from "./middleware/protectRoute.js";

// const app = express();

// const PORT = ENV_VARS.PORT;
// const __dirname = path.resolve();

// // Middleware

// app.use(express.json()); // will allow us to parse req.body  // this function allow us to parse req.body
// app.use(cookieParser());

// // Routes
// // This is for access route Pages and api is for api and v1 is version-1
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/movie", protectRoute, movieRoutes);
// app.use("/api/v1/tv", protectRoute, tvRoutes);
// app.use("/api/v1/search", protectRoute, searchRoutes);

// // Serve frontend in production
// if (ENV_VARS.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));
// 	app.get(/^\/(?!api).*/, (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }


// // Start server
// // This is for host purpose 5000 is PORT
// app.listen(PORT, () => {
// 	console.log("✅ Server started at http://localhost:" + PORT);
// 	connectDB();
// });



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
