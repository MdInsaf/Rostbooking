const {createUser,getUserByUserId,getUsers,updateUsers,deleteUser,login } = require("../controllers/user.controller");
const router = require("express").Router();
const { checktoken } = require("../auth/token_validation");


router.post("/",checktoken, createUser);
router.get("/",checktoken,getUsers);
router.get("/:id",checktoken, getUserByUserId);
router.patch("/",checktoken, updateUsers);
router.delete("/",checktoken,deleteUser);
router.post("/login",login);
module.exports = router;


