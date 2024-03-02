const mongoose = require("mongoose")

const pageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artist_name: { type: String, required: true },
  type: { type: String, required: true, enum: ["SINGLE", "ALBUM"] },
  image_url: { type: String },
  links: [{ href: { type: String, required: true }, platform: { type: String, required: true } }],
  from_user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Number, required: true, default: Date.now },
  view_count: { type: Number, required: true, default: 0 },
})

module.exports = mongoose.model("Page", pageSchema)
