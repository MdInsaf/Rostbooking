const router = require("express").Router();
const { checkToken, blacklistToken } = require("../auth/token_validation");
const {
  createUser,
  login,
  logout, // Add this line
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser
} = require("../controllers/user.controller");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUserByUserId);
router.post("/login", login);
router.post("/logout", logout); // Add logout route
router.patch("/", checkToken, updateUsers); // Ensure authentication for updateUsers
router.delete("/", checkToken, deleteUser); // Ensure authentication for deleteUser

module.exports = router;
