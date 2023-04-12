const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const specialistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
  },
  { collection: "specialist" }
);

const Specialist = mongoose.model("Specialist", specialistSchema);
module.exports = Specialist;
