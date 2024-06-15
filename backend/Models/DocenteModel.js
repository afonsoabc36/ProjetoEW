const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocenteSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
  },
  categoria: {
    type: String,
  },
  filiacao: {
    type: String,
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
