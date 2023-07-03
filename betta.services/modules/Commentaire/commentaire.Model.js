const mongoose = require("mongoose");
const commentaireSchema = new mongoose.Schema(
  {
    commentaireText: {
      type: String,
      required: false,
    },
    isPrivate: {
      type: Boolean,
      default: false,
      required: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
      required: true,
    },
    creationDate: {
      type: Date,
      required: true,
      default: new Date(),
    },
    createdBy: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { collection: "Commentaire" },
  { timestamps: true }
);

const commentaire = mongoose.model("Commentaire", commentaireSchema);
module.exports = commentaire;
