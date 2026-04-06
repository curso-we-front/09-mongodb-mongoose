const mongoose = require("mongoose");

/**
 * Tarea 1: Define el schema de Article.
 *
 * Campos:
 *   title      String, required, minlength 3, maxlength 100
 *   content    String, required, minlength 10
 *   author     String, required
 *   slug       String, unique (generado automáticamente)
 *   published  Boolean, default false
 *   tags       [String]
 *   authorRef  ObjectId, ref: 'User' (Tarea 4)
 * Opciones: timestamps: true
 */
const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 3, maxlength: 100 },
    content: { type: String, required: true, minlength: 10 },
    author: { type: String, required: true },
    slug: { type: String, unique: true },
    published: { type: Boolean, default: false },
    tags: [String],
    authorRef: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

/**
 * Tarea 1 — Hook pre('save'):
 * Genera el slug a partir del title antes de guardar.
 * Ejemplo: "Hola Mundo" → "hola-mundo"
 * Solo regenera el slug si el title ha cambiado (isModified).
 */
articleSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    let slugTitle = this.title;

    slugTitle = slugTitle.trim();
    slugTitle = slugTitle.toLowerCase();
    slugTitle = slugTitle.replace(/[^a-z0-9 -]/g, "");
    slugTitle = slugTitle.replace(/\s+/g, "-");

    this.slug = slugTitle;
  }

  next();
});

/**
 * Tarea 2 — Query estática: devuelve artículos publicados
 */
articleSchema.statics.findPublished = function () {
 
  return this.find({ published: true})
};

/**
 * Tarea 2 — Query estática: filtra por tag
 * @param {string} tag
 */
articleSchema.statics.findByTag = function (tag) {
  return this.find({tags: tag})
};

/**
 * Tarea 3 — Virtual: primeros 150 caracteres del content
 */
articleSchema.virtual("summary").get(function () {
  // TODO
  return this.content.substring(0,150)
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
