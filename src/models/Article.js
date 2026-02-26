const mongoose = require('mongoose');

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
    // TODO: definir los campos
  },
  { timestamps: true }
);

/**
 * Tarea 1 — Hook pre('save'):
 * Genera el slug a partir del title antes de guardar.
 * Ejemplo: "Hola Mundo" → "hola-mundo"
 * Solo regenera el slug si el title ha cambiado (isModified).
 */
articleSchema.pre('save', function (next) {
  // TODO
  next();
});

/**
 * Tarea 2 — Query estática: devuelve artículos publicados
 */
articleSchema.statics.findPublished = function () {
  // TODO
};

/**
 * Tarea 2 — Query estática: filtra por tag
 * @param {string} tag
 */
articleSchema.statics.findByTag = function (tag) {
  // TODO
};

/**
 * Tarea 3 — Virtual: primeros 150 caracteres del content
 */
articleSchema.virtual('summary').get(function () {
  // TODO
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
