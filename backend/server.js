//                                                         //  My code

// // const express =require('express'); //this is for commonjs
// // import express from 'express';       //for import purpose we use es-modules 
// // We can use any one of the from above

// import express from "express"; // here we are importing express
// import cookieParser from "cookie-parser";
// import path from "path"
// // import { fileURLToPath } from "url";

// import authRoutes from "./routes/auth.route.js";
// import movieRoutes from "./routes/movie.route.js";
// import tvRoutes from "./routes/tv.route.js";
// import searchRoutes from "./routes/search.route.js";

// import { ENV_VARS } from "./config/envVars.js";
// import { connectDB } from "./config/db.js";
// import { protectRoute } from "./middleware/protectRoute.js";

// const app = express();

// const PORT = ENV_VARS.PORT;
// // const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.resolve();

// app.use(express.json()); // this function allow us to parse req.body
// app.use(cookieParser())

// // This is for access route Pages and api is for api and v1 is version-1
// app.use("/api/v1/auth", authRoutes)
// app.use("/api/v1/movie", protectRoute, movieRoutes)
// app.use("/api/v1/tv", protectRoute, tvRoutes)
// app.use("/api/v1/search", protectRoute, searchRoutes)


// if (ENV_VARS.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }


// // This is for host purpose 5000 is PORT
// app.listen(PORT,()=>{
//     console.log("Server Started at http://localhost:"+PORT);
//     connectDB();
// })












// // "scripts": {
// //     "dev": "NODE_ENV=development nodemon backend/server.js",
// //     "start": "NODE_ENV=production node backend/server.js",
// //     "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend"
// //   },



                                    //  GPT code

// import express from "express";
// import cookieParser from "cookie-parser";
// import path from "path";
// import { fileURLToPath } from "url";

// import authRoutes from "./routes/auth.route.js";
// import movieRoutes from "./routes/movie.route.js";
// import tvRoutes from "./routes/tv.route.js";
// import searchRoutes from "./routes/search.route.js";

// import { ENV_VARS } from "./config/envVars.js";
// import { connectDB } from "./config/db.js";
// import { protectRoute } from "./middleware/protectRoute.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = ENV_VARS.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/movie", protectRoute, movieRoutes);
// app.use("/api/v1/tv", protectRoute, tvRoutes);
// app.use("/api/v1/search", protectRoute, searchRoutes);

// // Serve frontend in production
// if (ENV_VARS.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));
// 	app.get("*", (req, res) =>
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
// 	);
// }

// // Start server
// app.listen(PORT, () => {
// 	console.log(`✅ Server started on http://localhost:${PORT}`);
// 	connectDB();
// });







import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

const app = express();

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

if (ENV_VARS.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get(/^\/(?!api).*/, (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT);
	connectDB();
});