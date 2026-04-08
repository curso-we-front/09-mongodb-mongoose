const mongoose = require("mongoose");

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
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
