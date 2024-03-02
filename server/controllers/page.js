const Page = require("../models/page")

exports.page_detail = async (req, res) => {
  const { id } = req.params

  const page = await Page.findById(id).exec()

  if (!page) {
    return res.status(404).json({ error: "Page not found" })
  }

  res.json(page)
}

exports.page_create = async (req, res) => {
  const page = new Page({
    name: req.body.name,
    artist_name: req.body.artist_name,
    type: req.body.type,
    image_url: req.body.image_url,
    links: req.body.links,
    from_user: req.body.from_user,
  })

  await page.save()

  res.json(page)
}

exports.page_update = async (req, res) => {
  const { id } = req.params

  const updatedPage = await Page.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      artist_name: req.body.artist_name,
      type: req.body.type,
      image_url: req.body.image_url,
      links: req.body.links,
      from_user: req.body.from_user,
    },
    { new: true }
  ).exec()

  if (!updatedPage) {
    return res.status(404).json({ error: "Page not found" })
  }

  res.json(updatedPage)
}

exports.page_delete = async (req, res) => {
  const { id } = req.params

  const deletedPage = await Page.findByIdAndDelete(id).exec()

  if (!deletedPage) {
    return res.status(404).json({ error: "Page not found" })
  }

  res.json(deletedPage)
}
