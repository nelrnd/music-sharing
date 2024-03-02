const User = require("../models/user")
const Page = require("../models/page")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.user_register = async (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password)

  const user = new User({
    full_name: req.body.full_name,
    artist_name: req.body.artist_name,
    email: req.body.email,
    password: hashedPassword,
  })

  await user.save()

  next()
}

exports.user_login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).exec()
  if (!user) {
    return res.status(404).json({ error: "No user with this email exists" })
  }
  const match = bcrypt.compareSync(req.body.password, user.password)
  if (!match) {
    return res.status(400).json({ error: "Invalid password" })
  }
  const SECRET = process.env.SECRET
  const payload = {
    id: user._id,
    full_name: user.full_name,
    artist_name: user.artist_name,
  }
  const token = jwt.sign(payload, SECRET)
  res.json({ message: "Login successful", user: { ...payload, token } })
}

exports.user_update = async (req, res) => {
  const { id } = req.params

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      full_name: req.body.full_name,
      artist_name: req.body.artist_name,
    },
    { new: true }
  ).exec()

  if (!updatedUser) {
    return res.status(404).json({ error: "User not found" })
  }

  res.json(updatedUser)
}

exports.user_delete = async (req, res) => {
  const { id } = req.params

  const [deletedUser] = await Promise.all([
    User.findByIdAndDelete(id).exec(),
    Page.deleteMany({ from_user: id }).exec(),
  ])

  if (!deletedUser) {
    return res.status(404).json({ error: "User not found" })
  }

  res.json(deletedUser)
}

exports.user_is_auth = async (req, res, next) => {
  const token = req.headers["x-access-token"]
  if (!token) {
    return res.status(401).json({ error: "Not token provided" })
  }
  const SECRET = process.env.SECRET
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Unauthorized" })
    }
    req.user = decoded
    next()
  })
}
