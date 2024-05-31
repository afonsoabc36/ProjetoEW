const mongoose = require("mongoose");
const DocenteModel = require("./DocenteModel");
const Schema = mongoose.Schema;

const UCSchema = new Schema({
  sigla: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    uppercase: true,
    minlength: 2,
    maxlength: 10,
  },
  titulo: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  docentes: [DocenteModel.schema],
  horario: [
    {
      praticas: {
        type: [String],
      },
      teoricas: {
        type: [String],
      },
    },
  ],
  avaliacao: [
    {
      type: [String],
      minlength: 2,
    },
  ],
  datas: [
    {
      teste: {
        type: String,
      },
      exame: {
        type: String,
      },
      projeto: {
        type: String,
      },
    },
  ],
  aulas: [
    {
      tipo: {
        type: String,
        enum: ["T", "P"],
      },
      data: {
        type: String,
      },
      sumario: {
        type: [String],
      },
    },
  ],
});

module.exports = mongoose.model("UC", UCSchema);
