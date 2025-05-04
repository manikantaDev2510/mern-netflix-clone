// import express from "express";
// import { login, logout, signup, authCheck} from "../controllers/auth.controller.js";
// import { protectRoute } from "../middleware/protectRoute.js";

// const router = express.Router();

// //  This is for route pages we can use CRUD operaters
// //  This is for Signup route
// router.post("/signup", signup) // here we wiil access controllers
// //  This is for Login route 
// router.post("/login", login) // here we wiil access controllers
// // This is for Logout route 
// router.post("/logout", logout) // here we wiil access controllers
// router.get("/authCheck", protectRoute ,authCheck)

// export default router;



import express from "express";
import { authCheck, login, logout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/authCheck", protectRoute, authCheck);

export default router;