import express from "express";
const router = express.Router();
import { addUser, updateUser, deleteUser, getUser, getAllUsers, getFilteredUsers } from "../controller/user-controller";

router.get("/", (req, res) => {
  res.send("Welcome to heleverse assignment project");
});

router.post("/adduser",addUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/user/:id",getUser);
router.get("/users", getAllUsers)
router.get("/filteredusers", getFilteredUsers)

export default router;
