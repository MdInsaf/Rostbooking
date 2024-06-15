const bcrypt = require("bcryptjs");
const {
  create,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser
} = require("../services/user.service");
const userService = require('../services/user.service');
const { hashSync, genSaltSync, compareSync } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { blacklistToken } = require("../auth/token_validation");
module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    
    // Hash the password only if it's provided in the request
    if (body.password) {
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
    }
    
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  
  login: (req, res) => {
      const { email, password } = req.body;
      getUserByUserEmail(email, (err, user) => {
          if (err) {
              console.error("Error retrieving user:", err);
              return res.status(500).json({
                  success: 0,
                  data: "Server error"
              });
          }
          if (!user) {
              console.log("No user found with email:", email);
              return res.json({
                  success: 0,
                  data: "Invalid email or password"
              });
          }
          bcrypt.compare(password, user.password, (bcryptErr, isPasswordValid) => {
              if (bcryptErr) {
                  console.error("Error comparing passwords:", bcryptErr);
                  return res.status(500).json({
                      success: 0,
                      data: "Server error"
                  });
              }
              if (isPasswordValid) {
                  // Passwords match, generate token
                  const token = jwt.sign({ email: user.email, id: user.id }, "your_secret_key", { expiresIn: "20m" });
                  console.log("Login successful for user:", email);
                  return res.json({
                      success: 1,
                      message: "Login successful",
                      userData: user,
                      token: token
                  });
              } else {
                  // Passwords do not match
                  console.log("Incorrect password for user:", email);
                  return res.json({
                      success: 0,
                      data: "Invalid email or password"
                  });
              }
          });
      });
  },


logout: (req, res) => {
  const token = req.body.token;
  blacklistToken(token);
  return res.json({
    success: 1,
    message: "Logout successful"
  });
},

  
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  updateUsers: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully"
      });
    });
  }
};








