const mongoose = require("mongoose");
const DocenteModel = require("./DocenteModel");
const Schema = mongoose.Schema;

const DocSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const PastaSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  docs: [DocSchema],
});

const UCSchema = new Schema({
  sigla: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    uppercase: true,
  },
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  docentes: [DocenteModel.schema],
  horario: {
    praticas: {
      type: [String],
    },
    teoricas: {
      type: [String],
    },
  },
  avaliacao: [
    {
      type: [String],
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
        enum: ["T", "P", "TP"],
      },
      data: {
        type: String,
      },
      sumario: {
        type: [String],
      },
    },
  ],
  conteudo: [PastaSchema],
});

module.exports = mongoose.model("UC", UCSchema);
