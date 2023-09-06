const router = require("express").Router();
const passport = require("passport");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

/**
 * @route           POST /user/signin
 * @description     Login with email and password
 */
router.post("/signin", (req, res, next) => {
  User.findOne(
    {
      email: req.body.email,
    },
    function (err, doc) {
      if (err) {
        res.status(500).json({ message: err.message });
      }
      if (!doc) {
        return res.status(500).json({ message: "User Not Registered" });
      } else if (!User.checkPassword(req.body.password, doc.password)) {
        return res.status(500).json({ message: "Incorrect Password" });
      } else if (!doc.isActive) {
        return res.status(500).json({ message: "Inactive User Can't Login" });
      } else {
        const token = jwt.sign(doc.toObject(), process.env.JWT_SECRET_KEY);
        return res.status(200).json({ data: doc, token });
      }
    }
  );
});

/**
 * @route         POST /user/create
 * @description   Insert a user record
 */
router.post("/create", async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(500).json({ message: "User already registered" });
  }
  new User(req.body)
    .save()
    .then((doc) => {
      if (!doc) return Promise.reject(new Error("Couldn't create User"));
      res.status(200).json({ data: doc, message: "User added successfully" });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});
module.exports = router;
