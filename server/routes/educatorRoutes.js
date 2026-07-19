import express from "express"
import { updateRoleToEducator } from "../controller/educatorController.js";

const educatorRouter = express.Router();
// // Add educator role
// // educatorRouter.get('/update-role', updateRoleToEducator);
export default educatorRouter