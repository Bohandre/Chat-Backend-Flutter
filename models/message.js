const { Schema, model } = require("mongoose");

const MessageSchema = Schema(
  {
    de: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    para: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

MessageSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("Message", MessageSchema);
