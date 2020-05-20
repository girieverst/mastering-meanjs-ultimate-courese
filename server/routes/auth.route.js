const express = require("express");

const asyncHandler = require("express-async-handler");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const passport = require("../middleware/passport");
const router = express.Router();

// localhost:4050/api/auth/register
router.post("/register", asyncHandler(insert), login);
// localhost:4050/api/auth/login
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

router.get("/findme", passport.authenticate("jwt", { session: false }), login);

async function insert(req, res, next) {
  const user = req.body;
  console.log(`registering user`, user);
  req.user = await userController.insert(user);
  next();
}

function login(req, res) {
  const {user } = req;
  const token = authController.generateToken(user);
  res.json({
    user,
    token,
  });
}

module.exports = router;
