const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocenteSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  filiacao: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  webpage: {
    type: String,
  },
});

module.exports = mongoose.model("Docente", DocenteSchema);
