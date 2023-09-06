const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collaboratorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    profilePicture: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Collaborator = mongoose.model("collaborators", collaboratorSchema);
module.exports = Collaborator;
