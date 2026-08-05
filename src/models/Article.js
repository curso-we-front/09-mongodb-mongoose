const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
      minlength: 10,
    },
    author: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    authorRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
)

articleSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, "-")
  }
  next()
})

articleSchema.statics.findPublished = function () {
  return this.find({ published: true })
}

articleSchema.statics.findByTag = function (tag) {
  return this.find({ tags: tag })
}

articleSchema.virtual("summary").get(function () {
  return this.content.slice(0, 150)
})

const Article = mongoose.model("Article", articleSchema)

module.exports = Article
