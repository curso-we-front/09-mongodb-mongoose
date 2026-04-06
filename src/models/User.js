const mongoose = require('mongoose');

/**
 * Tarea 4: Define el schema de User.
 *
 * Campos:
 *   name   String, required
 *   email  String, required, unique
 * Opciones: timestamps: true
 */
const userSchema = new mongoose.Schema(
  {
    // TODO: definir los campos
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
