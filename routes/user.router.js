const router = require("express").Router();
const { checkToken, blacklistToken } = require("../auth/token_validation");
const {
  createUser,
  login,
  logout, 
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser
} = require("../controllers/user.controller");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUserByUserId);
router.post("/login", login);
router.post("/logout", logout); 
router.patch("/", checkToken, updateUsers); 
router.delete("/", checkToken, deleteUser); 

module.exports = router;
